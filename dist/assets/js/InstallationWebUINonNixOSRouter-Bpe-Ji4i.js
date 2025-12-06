import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as r}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const e=`# Non-NixOS Router Setup\r
\r
The WebUI integrates with several router services to provide full functionality. On a non-NixOS system, you'll need to install and configure these services separately.\r
\r
## Required Services\r
\r
### 1. Kea DHCP Server\r
\r
**Purpose**: Provides DHCP lease information for device tracking, client management, and bandwidth monitoring.\r
\r
**Installation**:\r
- **Debian/Ubuntu**: \`apt-get install isc-kea-dhcp4-server\`\r
- **RHEL/CentOS**: \`yum install kea\`\r
- **Arch Linux**: \`pacman -S kea\`\r
\r
**Configuration**:\r
1. Configure Kea to write leases to \`/var/lib/kea/dhcp4.leases\` (or your preferred path)\r
2. Update the \`KEA_LEASE_FILE\` environment variable in \`.env\`:\r
   \`\`\`bash\r
   KEA_LEASE_FILE=/var/lib/kea/dhcp4.leases\r
   \`\`\`\r
3. Mount the lease directory in \`docker-compose.yml\` (already configured):\r
   \`\`\`yaml\r
   volumes:\r
     - \${KEA_LEASE_DIR:-/var/lib/kea}:/var/lib/kea:ro\r
   \`\`\`\r
\r
**Kea Configuration Example** (\`/etc/kea/kea-dhcp4.conf\`):\r
\`\`\`json\r
{\r
  "Dhcp4": {\r
    "lease-database": {\r
      "type": "memfile",\r
      "persist": true,\r
      "name": "/var/lib/kea/dhcp4.leases"\r
    },\r
    "subnet4": [\r
      {\r
        "subnet": "192.168.1.0/24",\r
        "pools": [{"pool": "192.168.1.100 - 192.168.1.200"}]\r
      }\r
    ]\r
  }\r
}\r
\`\`\`\r
\r
#### Starting Kea\r
\r
\`\`\`bash\r
# Debian/Ubuntu\r
sudo systemctl enable kea-dhcp4-server\r
sudo systemctl start kea-dhcp4-server\r
\r
# RHEL/CentOS\r
sudo systemctl enable kea-dhcp4-server\r
sudo systemctl start kea-dhcp4-server\r
\`\`\`\r
\r
### 2. Unbound DNS Server\r
\r
**Purpose**: Provides DNS statistics and metrics for DNS monitoring.\r
\r
**Installation**:\r
- **Debian/Ubuntu**: \`apt-get install unbound\`\r
- **RHEL/CentOS**: \`yum install unbound\`\r
- **Arch Linux**: \`pacman -S unbound\`\r
\r
**Configuration**:\r
1. Enable the control socket in Unbound configuration (\`/etc/unbound/unbound.conf\`):\r
   \`\`\`yaml\r
   remote-control:\r
       control-enable: yes\r
       control-interface: /run/unbound/control\r
   \`\`\`\r
2. For multiple instances (homelab/lan), configure separate sockets:\r
   - \`/run/unbound-homelab/control\`\r
   - \`/run/unbound-lan/control\`\r
3. Update environment variables in \`.env\`:\r
   \`\`\`bash\r
   UNBOUND_RUN_DIR=/run/unbound\r
   \`\`\`\r
4. Mount the control socket directory (already configured):\r
   \`\`\`yaml\r
   volumes:\r
     - \${UNBOUND_RUN_DIR:-/run/unbound}:/run/unbound:ro\r
   \`\`\`\r
\r
**Note**: The WebUI looks for \`unbound-control\` in common paths. Ensure it's in your PATH or install it:\r
- **Debian/Ubuntu**: Included with \`unbound\` package\r
- **RHEL/CentOS**: Included with \`unbound\` package\r
\r
#### Starting Unbound\r
\r
\`\`\`bash\r
# Debian/Ubuntu\r
sudo systemctl enable unbound\r
sudo systemctl start unbound\r
\r
# RHEL/CentOS\r
sudo systemctl enable unbound\r
sudo systemctl start unbound\r
\`\`\`\r
\r
### 3. Router Configuration File (Alternative)\r
\r
**Purpose**: The WebUI reads router configuration for DHCP settings, DNS configuration, Cake bandwidth shaping, and Apprise notifications.\r
\r
**NixOS**: Uses \`/etc/nixos/router-config.nix\` (default)\r
\r
**Non-NixOS Alternative**: Create a minimal configuration file in Nix syntax or configure via WebUI:\r
\r
1. Create a configuration file (e.g., \`/opt/nixrtr/router-config.nix\`):\r
   \`\`\`nix\r
   {\r
     homelab = {\r
       dhcp = {\r
         enable = true;\r
         start = "192.168.1.100";\r
         end = "192.168.1.200";\r
         leaseTime = "1h";\r
         dnsServers = [ "192.168.1.1" ];\r
         reservations = [\r
           { hostname = "server"; hwAddress = "aa:bb:cc:dd:ee:ff"; ipAddress = "192.168.1.10"; }\r
         ];\r
       };\r
     };\r
     lan = {\r
       dhcp = {\r
         enable = true;\r
         start = "192.168.2.100";\r
         end = "192.168.2.200";\r
         leaseTime = "1h";\r
         dnsServers = [ "192.168.2.1" ];\r
       };\r
     };\r
   }\r
   \`\`\`\r
\r
2. Update environment variable in \`.env\`:\r
   \`\`\`bash\r
   ROUTER_CONFIG_FILE=/opt/nixrtr/router-config.nix\r
   ROUTER_CONFIG_DIR=/opt/nixrtr\r
   \`\`\`\r
\r
3. Mount the configuration directory (already configured):\r
   \`\`\`yaml\r
   volumes:\r
     - \${ROUTER_CONFIG_DIR:-/etc/nixos}:/etc/nixos:ro\r
   \`\`\`\r
\r
**Note**: If you don't use a router-config.nix file, you can configure DHCP networks and reservations directly through the WebUI interface. The config file is only needed for initial migration.\r
\r
### 4. PAM Authentication (Optional)\r
\r
**Purpose**: Allows authentication using system users and passwords.\r
\r
**Installation**: PAM is typically pre-installed on Linux systems.\r
\r
**Configuration**:\r
1. Mount PAM configuration and shadow file (already configured):\r
   \`\`\`yaml\r
   volumes:\r
     - \${PAM_CONFIG_DIR:-/etc/pam.d}:/etc/pam.d:ro\r
     - \${SHADOW_FILE:-/etc/shadow}:/etc/shadow:ro\r
   \`\`\`\r
\r
**Security Note**: Mounting \`/etc/shadow\` requires the Docker container to run with appropriate permissions. Consider using JWT-only authentication for production deployments.\r
\r
## Optional Services\r
\r
### Cake Bandwidth Shaping\r
\r
**Purpose**: Provides traffic shaping and bandwidth management.\r
\r
**Installation**:\r
- Requires \`tc\` (traffic control) and Cake qdisc support in kernel\r
- **Debian/Ubuntu**: Kernel modules typically included\r
- **RHEL/CentOS**: May need kernel-modules-extra\r
\r
**Configuration**:\r
- The WebUI detects Cake by checking for \`cake-setup.service\` or \`tc qdisc\` commands\r
- WAN interface is determined from router-config.nix or can be manually configured\r
- No additional Docker volume mounts required (uses host network capabilities)\r
\r
### Apprise Notifications\r
\r
**Purpose**: Sends notifications to various services (Discord, Slack, email, etc.).\r
\r
**Installation**:\r
- Apprise is a Python library, typically installed via pip or system package\r
- **Debian/Ubuntu**: \`apt-get install python3-apprise\` (or via pip)\r
- **RHEL/CentOS**: \`yum install python3-apprise\` (or via pip)\r
\r
**Configuration**:\r
1. Create Apprise configuration file (default: \`/var/lib/apprise/config/apprise\`):\r
   \`\`\`\r
   discord://webhook_id/webhook_token\r
   mailto://user:pass@example.com\r
   \`\`\`\r
\r
2. Mount the configuration directory (add to docker-compose.yml if needed):\r
   \`\`\`yaml\r
   volumes:\r
     - /var/lib/apprise:/var/lib/apprise:ro\r
   \`\`\`\r
\r
3. Set environment variable in \`.env\`:\r
   \`\`\`bash\r
   APPRISE_CONFIG_FILE=/var/lib/apprise/config/apprise\r
   \`\`\`\r
\r
## Environment Variables Summary\r
\r
Update your \`.env\` file with the following paths for non-NixOS systems:\r
\r
\`\`\`bash\r
# DHCP Lease File\r
KEA_LEASE_FILE=/var/lib/kea/dhcp4.leases\r
KEA_LEASE_DIR=/var/lib/kea\r
\r
# Router Configuration (optional, for initial migration)\r
ROUTER_CONFIG_FILE=/opt/nixrtr/router-config.nix\r
ROUTER_CONFIG_DIR=/opt/nixrtr\r
\r
# Unbound DNS Control Socket\r
UNBOUND_RUN_DIR=/run/unbound\r
\r
# PAM Authentication (optional)\r
PAM_CONFIG_DIR=/etc/pam.d\r
SHADOW_FILE=/etc/shadow\r
\`\`\`\r
\r
## Service Verification\r
\r
After installation, verify services are accessible:\r
\r
\`\`\`bash\r
# Check Kea lease file\r
ls -l /var/lib/kea/dhcp4.leases\r
\r
# Check Unbound control socket\r
ls -l /run/unbound/control\r
unbound-control -s /run/unbound/control stats\r
\r
# Check router config file (if using)\r
cat /opt/nixrtr/router-config.nix\r
\r
# Check PAM (if using)\r
ls -l /etc/pam.d/\r
\`\`\`\r
\r
## Minimal Setup\r
\r
For a minimal setup without all features:\r
\r
- **Required**: Kea DHCP Server (for device tracking)\r
- **Optional**: Unbound DNS (for DNS statistics)\r
- **Optional**: Router config file (can configure via WebUI instead)\r
- **Optional**: PAM authentication (can use JWT-only)\r
\r
The WebUI will function with just Kea DHCP, though some features (DNS stats, bandwidth shaping, notifications) will be unavailable.\r
\r
## Troubleshooting\r
\r
### Kea DHCP Issues\r
\r
- **Lease file not found**: Verify Kea is running and writing to the configured path\r
- **No devices showing**: Check that Kea is serving DHCP leases and the lease file is readable\r
- **Permission denied**: Ensure the Docker container has read access to \`/var/lib/kea\`\r
\r
### Unbound DNS Issues\r
\r
- **Control socket not found**: Verify Unbound is running and the control socket is enabled\r
- **No DNS statistics**: Check that \`unbound-control\` is available and the socket path is correct\r
- **Permission denied**: Ensure the Docker container has read access to \`/run/unbound\`\r
\r
### Router Config Issues\r
\r
- **Config file not found**: Either create the file or configure via WebUI\r
- **Parse errors**: Ensure the Nix syntax is correct (use a Nix syntax checker if needed)\r
- **Migration not working**: Check backend logs for parsing errors\r
\r
### PAM Authentication Issues\r
\r
- **Authentication failing**: Verify PAM is configured correctly and the shadow file is readable\r
- **Permission denied**: Ensure the Docker container has appropriate permissions to read \`/etc/shadow\`\r
- **User not found**: Verify the user exists on the host system\r
\r
`;function s(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(r,{content:e})})})}export{s as InstallationWebUINonNixOSRouter};
