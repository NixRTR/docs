# WebUI Docker Compose Installation

This guide covers installing the WebUI using Docker Compose for easier deployment and management on non-NixOS systems.

## Prerequisites

- **Docker** 20.10+ or **Podman** 4.0+ with `podman-compose`
- **Docker Compose** 2.0+ (or `podman-compose`)
- At least 2GB RAM and 10GB disk space

## Quick Start

1. Clone the repository:

\`\`\`bash
git clone https://github.com/NixRTR/webui.git
cd webui
\`\`\`

2. Copy the example environment file:

\`\`\`bash
cd docker
cp .env.example .env
\`\`\`

3. Edit `docker/.env` and configure your settings (database passwords, JWT secret, etc.)

4. Build the frontend and docs (if not using pre-built images):

\`\`\`bash
cd ../frontend
npm install
npm run build
cd ../docs
npm install
npm run build
cd ..
\`\`\`

5. Start the stack:

\`\`\`bash
cd docker
docker-compose up -d
\`\`\`

Or with Podman:

\`\`\`bash
cd docker
podman-compose up -d
\`\`\`

6. Access the WebUI at `http://localhost:8080`

## Configuration

### Environment Variables

Edit the `docker/.env` file to configure:

- **Database**: PostgreSQL connection settings
- **Redis**: Redis connection settings
- **JWT Secret**: Authentication secret key
- **System Paths**: Paths to system files (DHCP leases, router config, etc.)

### Volume Mounts

The Docker Compose setup mounts the following host paths (if available):

- `/var/lib/kea` - DHCP lease files
- `/etc/nixos` - Router configuration files
- `/run/unbound` - DNS control socket
- `/etc/pam.d` - PAM configuration (read-only)
- `/etc/shadow` - System password file (read-only, for PAM authentication)

**Security Note**: Mounting `/etc/shadow` requires careful consideration. Ensure proper file permissions and consider using a dedicated authentication method for Docker deployments.

### Custom Configuration

Create a `docker/docker-compose.override.yml` file to customize the setup:

\`\`\`yaml
version: '3.8'

services:
  backend:
    environment:
      - DEBUG=true
    volumes:
      - ./custom-config:/app/config:ro
\`\`\`

## Services

The Docker Compose setup includes:

- **webui**: Nginx serving frontend (`/`), docs (`/docs`), and proxying API (`/api`)
- **backend**: FastAPI application
- **worker**: Celery worker with Beat scheduler
- **postgres**: PostgreSQL database
- **redis**: Redis for Celery broker and caching

## Building Images Locally

To build images locally instead of using pre-built ones:

\`\`\`bash
cd docker
docker-compose build
\`\`\`

Or build individual services:

\`\`\`bash
cd docker
docker-compose build backend
docker-compose build webui
\`\`\`

## Using Pre-built Images

Pre-built images are available at:
- `ghcr.io/nixrtr/backend:latest`
- `ghcr.io/nixrtr/webui:latest`

To use pre-built images, ensure your `docker-compose.yml` references them or pull them manually:

\`\`\`bash
docker pull ghcr.io/nixrtr/backend:latest
docker pull ghcr.io/nixrtr/webui:latest
\`\`\`

## Troubleshooting

### View Logs

\`\`\`bash
# All services
cd docker
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f worker
\`\`\`

### Check Service Status

\`\`\`bash
cd docker
docker-compose ps
\`\`\`

### Restart Services

\`\`\`bash
cd docker
docker-compose restart
\`\`\`

### Database Connection Issues

- Verify PostgreSQL is running: `docker-compose ps postgres`
- Check database credentials in `.env`
- Ensure database is initialized (backend runs migrations on startup)

### Frontend Not Loading

- Verify webui service is running: `cd docker && docker-compose ps webui`
- Check Nginx logs: `cd docker && docker-compose logs webui`
- Ensure frontend build artifacts exist in `frontend/dist`

### Authentication Issues

- Verify PAM mounts are correct (if using PAM authentication)
- Check backend logs for authentication errors
- Ensure system user exists on host (if using PAM)

### Celery Worker Not Processing Tasks

- Check worker logs: `docker-compose logs worker`
- Verify Redis connection
- Ensure worker service is running: `docker-compose ps worker`

## Updating

To update to the latest version:

\`\`\`bash
# Pull latest images
cd docker
docker-compose pull

# Restart services
docker-compose up -d
\`\`\`

Or rebuild from source:

\`\`\`bash
# Pull latest code
git pull

# Rebuild and restart
cd docker
docker-compose up -d --build
\`\`\`

## Production Considerations

- Use strong passwords and secrets in `docker/.env`
- Set up proper firewall rules
- Use HTTPS (configure reverse proxy or use Caddy)
- Regularly update images
- Monitor logs and resource usage
- Set up backups for PostgreSQL data
- Consider using Docker secrets for sensitive data

