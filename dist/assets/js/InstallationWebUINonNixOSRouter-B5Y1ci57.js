import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const t=`# Non-NixOS Router Setup

The WebUI integrates with several router services to provide full functionality. On a non-NixOS system, you'll need to install and configure these services separately.

## Required Services

### 1. Kea DHCP Server

**Purpose**: Provides DHCP lease information for device tracking, client management, and bandwidth monitoring.

**Installation**:
- **Debian/Ubuntu**: \`apt-get install isc-kea-dhcp4-server\`
- **RHEL/CentOS**: \`yum install kea\`
- **Arch Linux**: \`pacman -S kea\`

**Configuration**:
1. Configure Kea to write leases to \`/var/lib/kea/dhcp4.leases\` (or your preferred path)
2. Update the \`KEA_LEASE_FILE\` environment variable in \`.env\`:
   \`\`\`bash
   KEA_LEASE_FILE=/var/lib/kea/dhcp4.leases
   \`\`\`
3. Mount the lease directory in \`docker-compose.yml\` (already configured):
   \`\`\`yaml
   volumes:
     - \${KEA_LEASE_DIR:-/var/lib/kea}:/var/lib/kea:ro
   \`\`\`

**Kea Configuration Example** (\`/etc/kea/kea-dhcp4.conf\`):
\`\`\`json
{
  "Dhcp4": {
    "lease-database": {
      "type": "memfile",
      "persist": true,
      "name": "/var/lib/kea/dhcp4.leases"
    },
    "subnet4": [
      {
        "subnet": "192.168.1.0/24",
        "pools": [{"pool": "192.168.1.100 - 192.168.1.200"}]
      }
    ]
  }
}
\`\`\`

#### Starting Kea

\`\`\`bash
# Debian/Ubuntu
sudo systemctl enable kea-dhcp4-server
sudo systemctl start kea-dhcp4-server

# RHEL/CentOS
sudo systemctl enable kea-dhcp4-server
sudo systemctl start kea-dhcp4-server
\`\`\`

### 2. Unbound DNS Server

**Purpose**: Provides DNS statistics and metrics for DNS monitoring.

**Installation**:
- **Debian/Ubuntu**: \`apt-get install unbound\`
- **RHEL/CentOS**: \`yum install unbound\`
- **Arch Linux**: \`pacman -S unbound\`

**Configuration**:
1. Enable the control socket in Unbound configuration (\`/etc/unbound/unbound.conf\`):
   \`\`\`yaml
   remote-control:
       control-enable: yes
       control-interface: /run/unbound/control
   \`\`\`
2. For multiple instances (homelab/lan), configure separate sockets:
   - \`/run/unbound-homelab/control\`
   - \`/run/unbound-lan/control\`
3. Update environment variables in \`.env\`:
   \`\`\`bash
   UNBOUND_RUN_DIR=/run/unbound
   \`\`\`
4. Mount the control socket directory (already configured):
   \`\`\`yaml
   volumes:
     - \${UNBOUND_RUN_DIR:-/run/unbound}:/run/unbound:ro
   \`\`\`

**Note**: The WebUI looks for \`unbound-control\` in common paths. Ensure it's in your PATH or install it:
- **Debian/Ubuntu**: Included with \`unbound\` package
- **RHEL/CentOS**: Included with \`unbound\` package

#### Starting Unbound

\`\`\`bash
# Debian/Ubuntu
sudo systemctl enable unbound
sudo systemctl start unbound

# RHEL/CentOS
sudo systemctl enable unbound
sudo systemctl start unbound
\`\`\`

### 3. Router Configuration File (Alternative)

**Purpose**: The WebUI reads router configuration for DHCP settings, DNS configuration, Cake bandwidth shaping, and Apprise notifications.

**NixOS**: Uses \`/etc/nixos/router-config.nix\` (default)

**Non-NixOS Alternative**: Create a minimal configuration file in Nix syntax or configure via WebUI:

1. Create a configuration file (e.g., \`/opt/nixrtr/router-config.nix\`):
   \`\`\`nix
   {
     homelab = {
       dhcp = {
         enable = true;
         start = "192.168.1.100";
         end = "192.168.1.200";
         leaseTime = "1h";
         dnsServers = [ "192.168.1.1" ];
         reservations = [
           { hostname = "server"; hwAddress = "aa:bb:cc:dd:ee:ff"; ipAddress = "192.168.1.10"; }
         ];
       };
     };
     lan = {
       dhcp = {
         enable = true;
         start = "192.168.2.100";
         end = "192.168.2.200";
         leaseTime = "1h";
         dnsServers = [ "192.168.2.1" ];
       };
     };
   }
   \`\`\`

2. Update environment variable in \`.env\`:
   \`\`\`bash
   ROUTER_CONFIG_FILE=/opt/nixrtr/router-config.nix
   ROUTER_CONFIG_DIR=/opt/nixrtr
   \`\`\`

3. Mount the configuration directory (already configured):
   \`\`\`yaml
   volumes:
     - \${ROUTER_CONFIG_DIR:-/etc/nixos}:/etc/nixos:ro
   \`\`\`

**Note**: If you don't use a router-config.nix file, you can configure DHCP networks and reservations directly through the WebUI interface. The config file is only needed for initial migration.

### 4. PAM Authentication (Optional)

**Purpose**: Allows authentication using system users and passwords.

**Installation**: PAM is typically pre-installed on Linux systems.

**Configuration**:
1. Mount PAM configuration and shadow file (already configured):
   \`\`\`yaml
   volumes:
     - \${PAM_CONFIG_DIR:-/etc/pam.d}:/etc/pam.d:ro
     - \${SHADOW_FILE:-/etc/shadow}:/etc/shadow:ro
   \`\`\`

**Security Note**: Mounting \`/etc/shadow\` requires the Docker container to run with appropriate permissions. Consider using JWT-only authentication for production deployments.

## Optional Services

### Cake Bandwidth Shaping

**Purpose**: Provides traffic shaping and bandwidth management.

**Installation**:
- Requires \`tc\` (traffic control) and Cake qdisc support in kernel
- **Debian/Ubuntu**: Kernel modules typically included
- **RHEL/CentOS**: May need kernel-modules-extra

**Configuration**:
- The WebUI detects Cake by checking for \`cake-setup.service\` or \`tc qdisc\` commands
- WAN interface is determined from router-config.nix or can be manually configured
- No additional Docker volume mounts required (uses host network capabilities)

### Apprise Notifications

**Purpose**: Sends notifications to various services (Discord, Slack, email, etc.).

**Installation**:
- Apprise is a Python library, typically installed via pip or system package
- **Debian/Ubuntu**: \`apt-get install python3-apprise\` (or via pip)
- **RHEL/CentOS**: \`yum install python3-apprise\` (or via pip)

**Configuration**:
1. Create Apprise configuration file (default: \`/var/lib/apprise/config/apprise\`):
   \`\`\`
   discord://webhook_id/webhook_token
   mailto://user:pass@example.com
   \`\`\`

2. Mount the configuration directory (add to docker-compose.yml if needed):
   \`\`\`yaml
   volumes:
     - /var/lib/apprise:/var/lib/apprise:ro
   \`\`\`

3. Set environment variable in \`.env\`:
   \`\`\`bash
   APPRISE_CONFIG_FILE=/var/lib/apprise/config/apprise
   \`\`\`

## Environment Variables Summary

Update your \`.env\` file with the following paths for non-NixOS systems:

\`\`\`bash
# DHCP Lease File
KEA_LEASE_FILE=/var/lib/kea/dhcp4.leases
KEA_LEASE_DIR=/var/lib/kea

# Router Configuration (optional, for initial migration)
ROUTER_CONFIG_FILE=/opt/nixrtr/router-config.nix
ROUTER_CONFIG_DIR=/opt/nixrtr

# Unbound DNS Control Socket
UNBOUND_RUN_DIR=/run/unbound

# PAM Authentication (optional)
PAM_CONFIG_DIR=/etc/pam.d
SHADOW_FILE=/etc/shadow
\`\`\`

## Service Verification

After installation, verify services are accessible:

\`\`\`bash
# Check Kea lease file
ls -l /var/lib/kea/dhcp4.leases

# Check Unbound control socket
ls -l /run/unbound/control
unbound-control -s /run/unbound/control stats

# Check router config file (if using)
cat /opt/nixrtr/router-config.nix

# Check PAM (if using)
ls -l /etc/pam.d/
\`\`\`

## Minimal Setup

For a minimal setup without all features:

- **Required**: Kea DHCP Server (for device tracking)
- **Optional**: Unbound DNS (for DNS statistics)
- **Optional**: Router config file (can configure via WebUI instead)
- **Optional**: PAM authentication (can use JWT-only)

The WebUI will function with just Kea DHCP, though some features (DNS stats, bandwidth shaping, notifications) will be unavailable.

## Troubleshooting

### Kea DHCP Issues

- **Lease file not found**: Verify Kea is running and writing to the configured path
- **No devices showing**: Check that Kea is serving DHCP leases and the lease file is readable
- **Permission denied**: Ensure the Docker container has read access to \`/var/lib/kea\`

### Unbound DNS Issues

- **Control socket not found**: Verify Unbound is running and the control socket is enabled
- **No DNS statistics**: Check that \`unbound-control\` is available and the socket path is correct
- **Permission denied**: Ensure the Docker container has read access to \`/run/unbound\`

### Router Config Issues

- **Config file not found**: Either create the file or configure via WebUI
- **Parse errors**: Ensure the Nix syntax is correct (use a Nix syntax checker if needed)
- **Migration not working**: Check backend logs for parsing errors

### PAM Authentication Issues

- **Authentication failing**: Verify PAM is configured correctly and the shadow file is readable
- **Permission denied**: Ensure the Docker container has appropriate permissions to read \`/etc/shadow\`
- **User not found**: Verify the user exists on the host system

`;function s(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(e,{content:t})})})}export{s as InstallationWebUINonNixOSRouter};
