# WebUI Configuration

Configure the web dashboard for monitoring and managing your router.

## Basic Settings

```nix
webui = {
  enable = true;
  port = 8080;
  collectionInterval = 2;  # seconds
  retentionDays = 30;
};
```

## Configuration Options

- `enable` - Enable/disable the WebUI
- `port` - Port to serve the WebUI on (default: 8080)
- `collectionInterval` - How often to collect metrics (in seconds)
- `retentionDays` - How many days of historical data to keep

## Access

Access the WebUI at:

```
http://router-ip:8080
```

## Features

The WebUI provides:

- **Real-time System Metrics**: CPU, memory, load averages
- **Network Interface Statistics**: Bandwidth, errors, packet counts
- **Device Usage and Bandwidth Tracking**: Per-device bandwidth monitoring
- **Service Status Monitoring**: Systemd service status and control
- **Historical Data Visualization**: Charts and graphs for trend analysis
- **Notification System**: Automated alerts via Apprise integration
- **DNS Management**: Configure DNS zones and records per network
- **DHCP Management**: Configure DHCP networks and static reservations
- **Mobile-Friendly Interface**: Responsive design with card-based layouts

## Authentication

The WebUI uses system user authentication via PAM (Pluggable Authentication Modules). Log in with your router admin credentials (system users).

### Authentication Architecture

The authentication system uses a secure socket-activated helper service:

- **Backend Service**: Runs as unprivileged `router-webui` user
- **Helper Service**: Socket-activated service running as root for PAM authentication
- **Security**: No passwords are logged or exposed in debug output
- **JWT Tokens**: Session management using JSON Web Tokens

### Login Process

1. Enter your system username and password
2. Credentials are sent to the authentication helper service
3. Helper service authenticates via PAM (running as root)
4. On success, a JWT token is issued for the session
5. Token is stored in browser localStorage

## Pages and Features

Paths in parentheses (e.g. `/settings/dns`) are the **WebUI app** paths. Links in this doc (e.g. [DNS](/webui/dns)) are **documentation site** paths.

### Dashboard

- System overview with real-time metrics
- Network interface statistics
- Service status overview
- Recent activity

### Network

- Interface statistics and charts
- Bandwidth monitoring
- Connection details
- Historical data visualization

### Devices

- Connected device list
- Per-device bandwidth usage
- Device details and history
- Card-based interface for mobile/tablet

### Notifications

- **Notification Rules**: Create automated alert rules based on system metrics
- **Apprise Services**: Manage notification services (email, Discord, Telegram, etc.)
- **Send Notifications**: Manually send notifications to configured services
- **Service Management**: Add, edit, and delete Apprise services via WebUI
- **URL Generator**: Interactive tool to generate Apprise URLs

### DNS

- **Zone Management**: Create and manage DNS zones per network (homelab/lan)
- **Record Management**: Add A and CNAME records to zones
- **Service Control**: Start, stop, restart, and reload DNS services
- **Service Status**: Real-time status of dnsmasq DNS services
- **Authoritative Zones**: Configure zones to be served locally
- **Forwarding/Delegation**: Forward zones to specific DNS servers

### DHCP

- **Network Management**: Configure DHCP networks per network (homelab/lan)
- **Static Reservations**: Assign fixed IP addresses to devices by MAC address
- **Service Control**: Start, stop, restart, and reload DHCP server
- **Service Status**: Real-time status of dnsmasq DHCP services
- **Network Configuration**: IP ranges, lease times, DNS servers

### System

- System information and status
- Service management
- System logs
- Performance metrics

### Speedtest

- Run speed tests
- View historical results
- Compare performance over time

### CAKE

- View and configure CAKE traffic shaping from the WebUI (path: **Settings** → **CAKE**, `/settings/cake`).
- See [WebUI CAKE](/webui/cake) and [CAKE configuration](/configuration/cake) for details.

### Blocklists and Whitelist

- Manage DNS blocklists and whitelist per network (homelab, lan) from **Settings** → **Blocklists** (`/settings/blocklists-whitelist`).
- See [WebUI Blocklists](/webui/blocklists) and [Global DNS](/configuration/global-dns).

### Port Forwarding

- Manage port forwarding rules from **Settings** → **Port Forwarding** (`/settings/port-forwarding`).
- See [WebUI Port Forwarding](/webui/port-forwarding) and [Port Forwarding configuration](/configuration/port-forwarding).

### Dynamic DNS

- Configure DynDns providers and updates from **Settings** → **Dynamic DNS** (`/settings/dyndns`).
- See [WebUI Dynamic DNS](/webui/dyndns) and [Dynamic DNS configuration](/configuration/dyndns).

### Worker Status

- View Celery worker and task status under **System** → **Worker Status** (`/settings/worker-status`).
- See [WebUI Worker Status](/webui/worker-status).

### Logs

- View system and application logs under **System** → **Logs** (`/system/logs`).
- See [WebUI Logs](/webui/logs).

### Traffic Shaping

- View traffic shaping overview and CAKE-related stats at **Traffic Shaping** (`/traffic-shaping`).
- See [WebUI Traffic Shaping](/webui/traffic-shaping).

### Documentation (in-app)

- The WebUI sidebar includes a **Documentation** link that opens this documentation site in a new tab.
- See [WebUI Documentation](/webui/documentation).

**Note:** Paths like `/webui/dns` in this documentation site refer to **docs pages**. Inside the WebUI app, the same features use different paths (e.g. `/settings/dns`, `/settings/cake`). Use the WebUI sidebar to navigate the app.

## Service Control

The WebUI provides service control for DNS and DHCP services:

### DNS Services

- **dnsmasq-homelab**: DNS and DHCP service for homelab network
- **dnsmasq-lan**: DNS and DHCP service for LAN network

Control actions:
- **Start**: Start the service
- **Stop**: Stop the service
- **Restart**: Restart the service
- **Reload**: Reload configuration without restart

### DHCP Service

- **dnsmasq-homelab**: DNS and DHCP service for homelab network
- **dnsmasq-lan**: DNS and DHCP service for LAN network

Control actions:
- **Start**: Start the DHCP server
- **Stop**: Stop the DHCP server
- **Restart**: Restart the DHCP server
- **Reload**: Reload configuration without restart

**Note**: Service control requires proper authentication and uses a secure socket-activated helper service running as root.

## Mobile and Tablet Support

The WebUI features responsive design with:

- **Card-Based Interface**: Tables automatically switch to card view at 1000px breakpoint
- **Mobile-Friendly Modals**: All modals are optimized for mobile browsers
- **Responsive Tables**: Tables scroll horizontally on smaller screens
- **Touch-Friendly Controls**: Buttons and inputs sized for touch interaction

## Database Management

The WebUI uses PostgreSQL for storing:

- **Apprise Services**: Notification service configurations
- **DNS Zones and Records**: DNS configuration per network
- **DHCP Networks and Reservations**: DHCP configuration per network
- **Notification Rules**: Automated alert rules
- **Historical Data**: Metrics, bandwidth, and usage data

### Automatic Migration

On first startup, the WebUI automatically migrates:

- **Apprise Services**: From `secrets/secrets.yaml` to database
- **DNS Configuration**: From `router-config.nix` to database
- **DHCP Configuration**: From `router-config.nix` to database

After migration, these configurations are managed via the WebUI. Changes to source files will not affect the database configuration.

## API Access

The WebUI provides a REST API for programmatic access:

- **Base URL**: `http://router-ip:8080/api`
- **Authentication**: JWT Bearer tokens
- **Documentation**: API endpoints are documented in individual feature pages

## Troubleshooting

### Cannot Log In

1. **Verify User Exists**: Ensure the user exists as a system user
2. **Check Password**: Verify the password is correct
3. **Check Logs**: Review authentication logs:
   ```bash
   journalctl -u router-webui-backend -f
   journalctl -u router-webui-auth@ -f
   ```

### Service Control Not Working

1. **Check Permissions**: Verify the socket-activated helper service is running
2. **Check Service Status**: Verify the service exists and is accessible
3. **Review Logs**: Check system logs for errors:
   ```bash
   journalctl -u router-webui-service-control@ -f
   ```

### Database Issues

1. **Check Database Status**: Verify PostgreSQL is running
2. **Check Migrations**: Ensure database migrations completed successfully
3. **Review Logs**: Check for database connection errors:
   ```bash
   journalctl -u router-webui-backend -f | grep -i database
   ```

## Security Considerations

- **Authentication**: Uses PAM for system user authentication
- **JWT Tokens**: Secure session management with expiration
- **No Password Logging**: Passwords are never logged or exposed
- **Service Control**: Uses secure socket-activated helper services
- **Database**: Sensitive data stored in PostgreSQL (encrypt at rest if needed)

## Additional Resources

Links below are **documentation site** paths (e.g. `/webui/dns`). Inside the WebUI app, the same features use different paths (e.g. `/settings/dns`). Use the WebUI sidebar to navigate the app.

- [Notifications](/webui/notifications) - Notification rules
- [Apprise](/webui/apprise) - Apprise notification services
- [DNS](/webui/dns) - DNS management
- [DHCP](/webui/dhcp) - DHCP management
- [CAKE](/webui/cake) - CAKE traffic shaping
- [Blocklists](/webui/blocklists) - Blocklists and whitelist
- [Port Forwarding](/webui/port-forwarding) - Port forwarding rules
- [Dynamic DNS](/webui/dyndns) - Dynamic DNS configuration
- [Worker Status](/webui/worker-status) - Celery worker and task status
- [Logs](/webui/logs) - System and application logs
- [Traffic Shaping](/webui/traffic-shaping) - Traffic shaping overview
- [Documentation link](/webui/documentation) - In-app documentation link
- [Navigation](/webui/navigation) - WebUI navbar and sidebar
