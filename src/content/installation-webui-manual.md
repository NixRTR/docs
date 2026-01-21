# WebUI Manual Installation

This guide covers installing the WebUI manually on other Linux distributions such as Ubuntu, Debian, Fedora, Arch Linux, etc.

**Note:** While the WebUI is designed for NixOS and provides the best experience when integrated with the full NixOS router configuration, the WebUI components (backend and frontend) can be run on other modern Linux distributions.

**Limitations on non-NixOS systems:**
- No automatic NixOS configuration management
- Manual dependency management required
- No integration with NixOS router modules (DNS, DHCP, etc.)
- Manual service setup and configuration
- Some features may require additional configuration or may not be available

## Prerequisites

- **Python 3.11+** with pip
- **Node.js 18+** and npm
- **PostgreSQL 14+**
- **Redis** (optional, for caching)
- **Nginx** or another reverse proxy
- **Systemd** (for service management)

## Installation Steps

### 1. Install System Dependencies

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y python3.11 python3-pip python3-venv postgresql postgresql-contrib redis-server nginx nodejs npm build-essential
```

**Fedora:**
```bash
sudo dnf install -y python3.11 python3-pip postgresql postgresql-server redis nginx nodejs npm gcc gcc-c++ make
sudo postgresql-setup --initdb
sudo systemctl enable --now postgresql redis
```

**Arch Linux:**
```bash
sudo pacman -S python python-pip postgresql redis nginx nodejs npm base-devel
sudo systemctl enable --now postgresql redis
```

### 2. Set Up PostgreSQL Database

```bash
# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE router_webui;
CREATE USER router_webui WITH PASSWORD 'your-secure-password';
ALTER DATABASE router_webui OWNER TO router_webui;
GRANT ALL PRIVILEGES ON DATABASE router_webui TO router_webui;
\EOF
```

### 3. Clone and Set Up Backend

```bash
# Clone the webui repository
git clone https://github.com/NixRTR/webui.git
cd webui/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Initialize database schema
psql -h localhost -U router_webui -d router_webui -f schema.sql
```

### 4. Build Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Build for production
npm run build
```

### 5. Configure Backend

Create a configuration file or set environment variables:

```bash
# Create systemd service directory
sudo mkdir -p /etc/router-webui
sudo mkdir -p /var/lib/router-webui

# Create environment file
sudo tee /etc/router-webui/environment << EOF
DATABASE_URL=postgresql+asyncpg://router_webui:your-secure-password@localhost/router_webui
JWT_SECRET_FILE=/var/lib/router-webui/jwt-secret
PORT=8081
COLLECTION_INTERVAL=2
DEBUG=false
PYTHONPATH=/path/to/webui
EOF

# Generate JWT secret
sudo openssl rand -hex 32 | sudo tee /var/lib/router-webui/jwt-secret
sudo chmod 600 /var/lib/router-webui/jwt-secret
```

### 6. Create Systemd Service

Create `/etc/systemd/system/router-webui-backend.service`:

```ini
[Unit]
Description=Router WebUI Backend
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=router-webui
Group=router-webui
WorkingDirectory=/path/to/webui
EnvironmentFile=/etc/router-webui/environment
ExecStart=/path/to/webui/backend/venv/bin/python -m uvicorn backend.main:app --host 127.0.0.1 --port 8081
Restart=always
RestartSec=10s

[Install]
WantedBy=multi-user.target
```

### 7. Configure Nginx

Create `/etc/nginx/sites-available/router-webui`:

```nginx
server {
    listen 8080;
    server_name _;

    root /path/to/webui/frontend/dist;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # WebSocket
    location /ws {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/router-webui /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Create System User

```bash
sudo useradd -r -s /bin/false router-webui
sudo chown -R router-webui:router-webui /var/lib/router-webui
sudo chown -R router-webui:router-webui /path/to/webui
```

### 9. Start Services

```bash
sudo systemctl daemon-reload
sudo systemctl enable router-webui-backend
sudo systemctl start router-webui-backend
sudo systemctl status router-webui-backend
```

### 10. Access WebUI

Open `http://your-router-ip:8080` in your browser.

**Note:** Authentication uses PAM, so you'll need to log in with a system user account. You may need to configure PAM authentication separately depending on your distribution.

## Troubleshooting

- **Database connection errors**: Verify PostgreSQL is running and credentials are correct
- **Permission errors**: Ensure the `router-webui` user has proper permissions
- **Service won't start**: Check logs with `journalctl -u router-webui-backend -f`
- **Frontend not loading**: Verify Nginx configuration and file permissions
- **Authentication issues**: Ensure PAM is properly configured for your distribution




