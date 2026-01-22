import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const i=`# Non-NixOS Router Setup

The WebUI integrates with several router services to provide full functionality. On a non-NixOS system, you'll need to install and configure these services separately.

## Required Services

### 1. dnsmasq DNS and DHCP Server

**Purpose**: Provides DNS resolution, DHCP lease information for device tracking, client management, and bandwidth monitoring. dnsmasq combines DNS and DHCP functionality in a single service.

**Installation**:
- **Debian/Ubuntu**: \`apt-get install dnsmasq\`
- **RHEL/CentOS**: \`yum install dnsmasq\`
- **Arch Linux**: \`pacman -S dnsmasq\`

**Configuration**:
1. Configure dnsmasq to write leases to separate files per network:
   - \`/var/lib/dnsmasq/homelab/dhcp.leases\` (for homelab network)
   - \`/var/lib/dnsmasq/lan/dhcp.leases\` (for lan network)
2. Update the \`DNSMASQ_LEASE_FILES\` environment variable in \`.env\`:
   \`\`\`bash
   DNSMASQ_LEASE_FILES=/var/lib/dnsmasq/homelab/dhcp.leases /var/lib/dnsmasq/lan/dhcp.leases
   \`\`\`
3. Mount the lease directory in \`docker-compose.yml\` (already configured):
   \`\`\`yaml
   volumes:
     - \${DNSMASQ_LEASE_DIR:-/var/lib/dnsmasq}:/var/lib/dnsmasq:ro
   \`\`\`

**dnsmasq Configuration Example** (\`/etc/dnsmasq.conf\`):
\`\`\`conf
# Interface binding
interface=br0
bind-interfaces

# Upstream DNS servers
server=1.1.1.1
server=9.9.9.9

# DHCP Configuration
dhcp-range=br0,192.168.1.100,192.168.1.200,1h
dhcp-option=br0,3,192.168.1.1  # Router
dhcp-option=br0,6,192.168.1.1  # DNS servers
dhcp-authoritative
dhcp-leasefile=/var/lib/dnsmasq/homelab/dhcp.leases

# Local domain
domain=local
local=/local/

# Performance
cache-size=10000
\`\`\`

**Note**: For multiple networks, you may need separate dnsmasq instances or use interface-specific configuration. The WebUI expects separate lease files per network.

#### Starting dnsmasq

\`\`\`bash
# Debian/Ubuntu
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq

# RHEL/CentOS
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
\`\`\`

**Note**: DNS statistics collection is not available with dnsmasq (it doesn't provide a control socket like Unbound). The WebUI will function without DNS statistics, but that feature will be unavailable.

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
# DHCP Lease Files (space-separated paths for multiple networks)
DNSMASQ_LEASE_FILES=/var/lib/dnsmasq/homelab/dhcp.leases /var/lib/dnsmasq/lan/dhcp.leases
DNSMASQ_LEASE_DIR=/var/lib/dnsmasq

# Router Configuration (optional, for initial migration)
ROUTER_CONFIG_FILE=/opt/nixrtr/router-config.nix
ROUTER_CONFIG_DIR=/opt/nixrtr

# PAM Authentication (optional)
PAM_CONFIG_DIR=/etc/pam.d
SHADOW_FILE=/etc/shadow
\`\`\`

## Service Verification

After installation, verify services are accessible:

\`\`\`bash
# Check dnsmasq lease files
ls -l /var/lib/dnsmasq/homelab/dhcp.leases
ls -l /var/lib/dnsmasq/lan/dhcp.leases

# Check dnsmasq is running
sudo systemctl status dnsmasq

# Check router config file (if using)
cat /opt/nixrtr/router-config.nix

# Check PAM (if using)
ls -l /etc/pam.d/
\`\`\`

## Minimal Setup

For a minimal setup without all features:

- **Required**: dnsmasq DNS and DHCP Server (for device tracking and DNS resolution)
- **Optional**: Router config file (can configure via WebUI instead)
- **Optional**: PAM authentication (can use JWT-only)

The WebUI will function with just dnsmasq, though some features (DNS statistics, bandwidth shaping, notifications) may be unavailable. Note that DNS statistics are not available with dnsmasq as it doesn't provide a control socket like Unbound.

## Troubleshooting

### dnsmasq Issues

- **Lease file not found**: Verify dnsmasq is running and writing to the configured paths
- **No devices showing**: Check that dnsmasq is serving DHCP leases and the lease files are readable
- **Permission denied**: Ensure the Docker container has read access to \`/var/lib/dnsmasq\`
- **DNS not resolving**: Verify dnsmasq is listening on port 53 and upstream DNS servers are configured
- **DHCP not working**: Check that dnsmasq has DHCP enabled and is listening on port 67
- **No DNS statistics**: DNS statistics are not available with dnsmasq (it doesn't provide a control socket). This is expected behavior.

### Router Config Issues

- **Config file not found**: Either create the file or configure via WebUI
- **Parse errors**: Ensure the Nix syntax is correct (use a Nix syntax checker if needed)
- **Migration not working**: Check backend logs for parsing errors

### PAM Authentication Issues

- **Authentication failing**: Verify PAM is configured correctly and the shadow file is readable
- **Permission denied**: Ensure the Docker container has appropriate permissions to read \`/etc/shadow\`
- **User not found**: Verify the user exists on the host system




`;function r(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(e,{content:i})})})}export{r as InstallationWebUINonNixOSRouter};
