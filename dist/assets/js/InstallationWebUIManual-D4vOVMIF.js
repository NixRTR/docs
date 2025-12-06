import{j as r}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const e=`# WebUI Manual Installation\r
\r
This guide covers installing the WebUI manually on other Linux distributions such as Ubuntu, Debian, Fedora, Arch Linux, etc.\r
\r
**Note:** While the WebUI is designed for NixOS and provides the best experience when integrated with the full NixOS router configuration, the WebUI components (backend and frontend) can be run on other modern Linux distributions.\r
\r
**Limitations on non-NixOS systems:**\r
- No automatic NixOS configuration management\r
- Manual dependency management required\r
- No integration with NixOS router modules (DNS, DHCP, etc.)\r
- Manual service setup and configuration\r
- Some features may require additional configuration or may not be available\r
\r
## Prerequisites\r
\r
- **Python 3.11+** with pip\r
- **Node.js 18+** and npm\r
- **PostgreSQL 14+**\r
- **Redis** (optional, for caching)\r
- **Nginx** or another reverse proxy\r
- **Systemd** (for service management)\r
\r
## Installation Steps\r
\r
### 1. Install System Dependencies\r
\r
**Ubuntu/Debian:**\r
\`\`\`bash\r
sudo apt update\r
sudo apt install -y python3.11 python3-pip python3-venv postgresql postgresql-contrib redis-server nginx nodejs npm build-essential\r
\`\`\`\r
\r
**Fedora:**\r
\`\`\`bash\r
sudo dnf install -y python3.11 python3-pip postgresql postgresql-server redis nginx nodejs npm gcc gcc-c++ make\r
sudo postgresql-setup --initdb\r
sudo systemctl enable --now postgresql redis\r
\`\`\`\r
\r
**Arch Linux:**\r
\`\`\`bash\r
sudo pacman -S python python-pip postgresql redis nginx nodejs npm base-devel\r
sudo systemctl enable --now postgresql redis\r
\`\`\`\r
\r
### 2. Set Up PostgreSQL Database\r
\r
\`\`\`bash\r
# Create database and user\r
sudo -u postgres psql << EOF\r
CREATE DATABASE router_webui;\r
CREATE USER router_webui WITH PASSWORD 'your-secure-password';\r
ALTER DATABASE router_webui OWNER TO router_webui;\r
GRANT ALL PRIVILEGES ON DATABASE router_webui TO router_webui;\r
\\EOF\r
\`\`\`\r
\r
### 3. Clone and Set Up Backend\r
\r
\`\`\`bash\r
# Clone the webui repository\r
git clone https://github.com/NixRTR/webui.git\r
cd webui/backend\r
\r
# Create virtual environment\r
python3 -m venv venv\r
source venv/bin/activate\r
\r
# Install Python dependencies\r
pip install -r requirements.txt\r
\r
# Initialize database schema\r
psql -h localhost -U router_webui -d router_webui -f schema.sql\r
\`\`\`\r
\r
### 4. Build Frontend\r
\r
\`\`\`bash\r
cd ../frontend\r
\r
# Install dependencies\r
npm install\r
\r
# Build for production\r
npm run build\r
\`\`\`\r
\r
### 5. Configure Backend\r
\r
Create a configuration file or set environment variables:\r
\r
\`\`\`bash\r
# Create systemd service directory\r
sudo mkdir -p /etc/router-webui\r
sudo mkdir -p /var/lib/router-webui\r
\r
# Create environment file\r
sudo tee /etc/router-webui/environment << EOF\r
DATABASE_URL=postgresql+asyncpg://router_webui:your-secure-password@localhost/router_webui\r
JWT_SECRET_FILE=/var/lib/router-webui/jwt-secret\r
PORT=8081\r
COLLECTION_INTERVAL=2\r
DEBUG=false\r
PYTHONPATH=/path/to/webui\r
EOF\r
\r
# Generate JWT secret\r
sudo openssl rand -hex 32 | sudo tee /var/lib/router-webui/jwt-secret\r
sudo chmod 600 /var/lib/router-webui/jwt-secret\r
\`\`\`\r
\r
### 6. Create Systemd Service\r
\r
Create \`/etc/systemd/system/router-webui-backend.service\`:\r
\r
\`\`\`ini\r
[Unit]\r
Description=Router WebUI Backend\r
After=network.target postgresql.service\r
Requires=postgresql.service\r
\r
[Service]\r
Type=simple\r
User=router-webui\r
Group=router-webui\r
WorkingDirectory=/path/to/webui\r
EnvironmentFile=/etc/router-webui/environment\r
ExecStart=/path/to/webui/backend/venv/bin/python -m uvicorn backend.main:app --host 127.0.0.1 --port 8081\r
Restart=always\r
RestartSec=10s\r
\r
[Install]\r
WantedBy=multi-user.target\r
\`\`\`\r
\r
### 7. Configure Nginx\r
\r
Create \`/etc/nginx/sites-available/router-webui\`:\r
\r
\`\`\`nginx\r
server {\r
    listen 8080;\r
    server_name _;\r
\r
    root /path/to/webui/frontend/dist;\r
    index index.html;\r
\r
    # Frontend\r
    location / {\r
        try_files $uri $uri/ /index.html;\r
    }\r
\r
    # API\r
    location /api {\r
        proxy_pass http://127.0.0.1:8081;\r
        proxy_set_header Host $host;\r
        proxy_set_header X-Real-IP $remote_addr;\r
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\r
        proxy_set_header X-Forwarded-Proto $scheme;\r
        proxy_http_version 1.1;\r
        proxy_set_header Upgrade $http_upgrade;\r
        proxy_set_header Connection "upgrade";\r
    }\r
\r
    # WebSocket\r
    location /ws {\r
        proxy_pass http://127.0.0.1:8081;\r
        proxy_http_version 1.1;\r
        proxy_set_header Upgrade $http_upgrade;\r
        proxy_set_header Connection "upgrade";\r
        proxy_set_header Host $host;\r
        proxy_set_header X-Real-IP $remote_addr;\r
    }\r
}\r
\`\`\`\r
\r
Enable the site:\r
\`\`\`bash\r
sudo ln -s /etc/nginx/sites-available/router-webui /etc/nginx/sites-enabled/\r
sudo nginx -t\r
sudo systemctl reload nginx\r
\`\`\`\r
\r
### 8. Create System User\r
\r
\`\`\`bash\r
sudo useradd -r -s /bin/false router-webui\r
sudo chown -R router-webui:router-webui /var/lib/router-webui\r
sudo chown -R router-webui:router-webui /path/to/webui\r
\`\`\`\r
\r
### 9. Start Services\r
\r
\`\`\`bash\r
sudo systemctl daemon-reload\r
sudo systemctl enable router-webui-backend\r
sudo systemctl start router-webui-backend\r
sudo systemctl status router-webui-backend\r
\`\`\`\r
\r
### 10. Access WebUI\r
\r
Open \`http://your-router-ip:8080\` in your browser.\r
\r
**Note:** Authentication uses PAM, so you'll need to log in with a system user account. You may need to configure PAM authentication separately depending on your distribution.\r
\r
## Troubleshooting\r
\r
- **Database connection errors**: Verify PostgreSQL is running and credentials are correct\r
- **Permission errors**: Ensure the \`router-webui\` user has proper permissions\r
- **Service won't start**: Check logs with \`journalctl -u router-webui-backend -f\`\r
- **Frontend not loading**: Verify Nginx configuration and file permissions\r
- **Authentication issues**: Ensure PAM is properly configured for your distribution\r
\r
`;function a(){return r.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:r.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:r.jsx(n,{content:e})})})}export{a as InstallationWebUIManual};
