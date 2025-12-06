import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as r}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const n=`# WebUI Docker Compose Installation\r
\r
This guide covers installing the WebUI using Docker Compose for easier deployment and management on non-NixOS systems.\r
\r
## Prerequisites\r
\r
- **Docker** 20.10+ or **Podman** 4.0+ with \`podman-compose\`\r
- **Docker Compose** 2.0+ (or \`podman-compose\`)\r
- At least 2GB RAM and 10GB disk space\r
\r
## Quick Start\r
\r
1. Create a directory for your Docker Compose setup:\r
\r
\`\`\`bash\r
mkdir nixrtr-webui\r
cd nixrtr-webui\r
\`\`\`\r
\r
2. Download the required files:\r
\r
\`\`\`bash\r
# Download docker-compose.yml\r
curl -o docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml\r
\r
# Download docker-compose.override.yml.example (optional, for custom configuration)\r
curl -o docker-compose.override.yml.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.override.yml.example\r
\r
# Download .env.example (if available)\r
curl -o .env.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/.env.example\r
\`\`\`\r
\r
Or using \`wget\`:\r
\r
\`\`\`bash\r
wget -O docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml\r
wget -O docker-compose.override.yml.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.override.yml.example\r
wget -O .env.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/.env.example\r
\`\`\`\r
\r
3. Set up configuration files:\r
\r
\`\`\`bash\r
# Copy the example environment file (create .env if .env.example doesn't exist)\r
if [ -f .env.example ]; then\r
  cp .env.example .env\r
else\r
  touch .env\r
fi\r
\r
# (Optional) Copy the override example for custom configuration\r
cp docker-compose.override.yml.example docker-compose.override.yml\r
\`\`\`\r
\r
4. Edit \`.env\` and configure your settings (database passwords, JWT secret, etc.)\r
\r
5. (Optional) Edit \`docker-compose.override.yml\` for custom service configuration\r
\r
6. Start the stack (images will be pulled automatically):\r
\r
\`\`\`bash\r
docker-compose up -d\r
\`\`\`\r
\r
Or with Podman:\r
\r
\`\`\`bash\r
podman-compose up -d\r
\`\`\`\r
\r
7. Access the WebUI at \`http://localhost:8080\`\r
\r
**Note**: Pre-built Docker images are used by default. You don't need to build the frontend, docs, or Docker images yourself.\r
\r
## Configuration\r
\r
### Environment Variables\r
\r
Edit the \`.env\` file to configure:\r
\r
- **Database**: PostgreSQL connection settings\r
- **Redis**: Redis connection settings\r
- **JWT Secret**: Authentication secret key\r
- **System Paths**: Paths to system files (DHCP leases, router config, etc.)\r
\r
### Volume Mounts\r
\r
The Docker Compose setup mounts the following host paths (if available):\r
\r
- \`/var/lib/kea\` - DHCP lease files\r
- \`/etc/nixos\` - Router configuration files\r
- \`/run/unbound\` - DNS control socket\r
- \`/etc/pam.d\` - PAM configuration (read-only)\r
- \`/etc/shadow\` - System password file (read-only, for PAM authentication)\r
\r
**Security Note**: Mounting \`/etc/shadow\` requires careful consideration. Ensure proper file permissions and consider using a dedicated authentication method for Docker deployments.\r
\r
### Custom Configuration\r
\r
Copy and edit \`docker-compose.override.yml.example\` to \`docker-compose.override.yml\` for custom configuration:\r
\r
\`\`\`bash\r
cp docker-compose.override.yml.example docker-compose.override.yml\r
\`\`\`\r
\r
Then edit \`docker-compose.override.yml\` to customize services. For example:\r
\r
\`\`\`yaml\r
services:\r
  backend:\r
    environment:\r
      - DEBUG=true\r
    volumes:\r
      - ./custom-config:/app/config:ro\r
\`\`\`\r
\r
## Services\r
\r
The Docker Compose setup includes:\r
\r
- **webui**: Nginx serving frontend (\`/\`), docs (\`/docs\`), and proxying API (\`/api\`)\r
- **backend**: FastAPI application\r
- **worker**: Celery worker with Beat scheduler\r
- **postgres**: PostgreSQL database\r
- **redis**: Redis for Celery broker and caching\r
\r
## Using Pre-built Images\r
\r
Pre-built Docker images are automatically pulled from GitHub Container Registry:\r
- \`ghcr.io/nixrtr/backend:latest\`\r
- \`ghcr.io/nixrtr/webui:latest\`\r
\r
The \`docker-compose.yml\` file is configured to use these images by default. No manual building is required.\r
\r
### Building Images Locally (Advanced)\r
\r
If you need to build images locally (e.g., for development or custom modifications), you'll need to clone the repository:\r
\r
\`\`\`bash\r
git clone https://github.com/NixRTR/webui.git\r
cd webui/docker\r
docker-compose build\r
\`\`\`\r
\r
Or build individual services:\r
\r
\`\`\`bash\r
cd webui/docker\r
docker-compose build backend\r
docker-compose build webui\r
\`\`\`\r
\r
**Note**: Building locally requires Node.js and npm to build the frontend and documentation.\r
\r
## Troubleshooting\r
\r
### View Logs\r
\r
\`\`\`bash\r
# All services\r
docker-compose logs -f\r
\r
# Specific service\r
docker-compose logs -f backend\r
docker-compose logs -f worker\r
\`\`\`\r
\r
### Check Service Status\r
\r
\`\`\`bash\r
docker-compose ps\r
\`\`\`\r
\r
### Restart Services\r
\r
\`\`\`bash\r
docker-compose restart\r
\`\`\`\r
\r
### Database Connection Issues\r
\r
- Verify PostgreSQL is running: \`docker-compose ps postgres\`\r
- Check database credentials in \`.env\`\r
- Ensure database is initialized (backend runs migrations on startup)\r
\r
### Frontend Not Loading\r
\r
- Verify webui service is running: \`docker-compose ps webui\`\r
- Check Nginx logs: \`docker-compose logs webui\`\r
- Ensure the webui image was pulled successfully: \`docker images | grep nixrtr/webui\`\r
\r
### Authentication Issues\r
\r
- Verify PAM mounts are correct (if using PAM authentication)\r
- Check backend logs for authentication errors\r
- Ensure system user exists on host (if using PAM)\r
\r
### Celery Worker Not Processing Tasks\r
\r
- Check worker logs: \`docker-compose logs worker\`\r
- Verify Redis connection\r
- Ensure worker service is running: \`docker-compose ps worker\`\r
\r
## Updating\r
\r
To update to the latest version:\r
\r
\`\`\`bash\r
# Pull latest images\r
docker-compose pull\r
\r
# Restart services\r
docker-compose up -d\r
\`\`\`\r
\r
To update the docker-compose.yml file itself, re-download it:\r
\r
\`\`\`bash\r
curl -o docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml\r
\`\`\`\r
\r
Or if you cloned the repository for local building:\r
\r
\`\`\`bash\r
# Pull latest code\r
git pull\r
\r
# Rebuild and restart\r
cd docker\r
docker-compose up -d --build\r
\`\`\`\r
\r
## Production Considerations\r
\r
- Use strong passwords and secrets in \`.env\`\r
- Set up proper firewall rules\r
- Use HTTPS (configure reverse proxy or use Caddy)\r
- Regularly update images\r
- Monitor logs and resource usage\r
- Set up backups for PostgreSQL data\r
- Consider using Docker secrets for sensitive data\r
\r
`;function c(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(r,{content:n})})})}export{c as InstallationWebUIDocker};
