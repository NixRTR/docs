# WebUI Docker Compose Installation

This guide covers installing the WebUI using Docker Compose for easier deployment and management on non-NixOS systems.

## Prerequisites

- **Docker** 20.10+ or **Podman** 4.0+ with `podman-compose`
- **Docker Compose** 2.0+ (or `podman-compose`)
- At least 2GB RAM and 10GB disk space

## Quick Start

1. Create a directory for your Docker Compose setup:

```bash
mkdir nixrtr-webui
cd nixrtr-webui
```

2. Download the required files:

```bash
# Download docker-compose.yml
curl -o docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml

# Download docker-compose.override.yml.example (optional, for custom configuration)
curl -o docker-compose.override.yml.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.override.yml.example

# Download .env.example (if available)
curl -o .env.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/.env.example
```

Or using `wget`:

```bash
wget -O docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml
wget -O docker-compose.override.yml.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.override.yml.example
wget -O .env.example https://raw.githubusercontent.com/NixRTR/webui/main/docker/.env.example
```

3. Set up configuration files:

```bash
# Copy the example environment file (create .env if .env.example doesn't exist)
if [ -f .env.example ]; then
  cp .env.example .env
else
  touch .env
fi

# (Optional) Copy the override example for custom configuration
cp docker-compose.override.yml.example docker-compose.override.yml
```

4. Edit `.env` and configure your settings (database passwords, JWT secret, etc.)

5. (Optional) Edit `docker-compose.override.yml` for custom service configuration

6. Start the stack (images will be pulled automatically):

```bash
docker-compose up -d
```

Or with Podman:

```bash
podman-compose up -d
```

7. Access the WebUI at `http://localhost:8080`

**Note**: Pre-built Docker images are used by default. You don't need to build the frontend, docs, or Docker images yourself.

## Configuration

### Environment Variables

Edit the `.env` file to configure:

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

Copy and edit `docker-compose.override.yml.example` to `docker-compose.override.yml` for custom configuration:

```bash
cp docker-compose.override.yml.example docker-compose.override.yml
```

Then edit `docker-compose.override.yml` to customize services. For example:

```yaml
services:
  backend:
    environment:
      - DEBUG=true
    volumes:
      - ./custom-config:/app/config:ro
```

## Services

The Docker Compose setup includes:

- **webui**: Nginx serving frontend (`/`), docs (`/docs`), and proxying API (`/api`)
- **backend**: FastAPI application
- **worker**: Celery worker with Beat scheduler
- **postgres**: PostgreSQL database
- **redis**: Redis for Celery broker and caching

## Using Pre-built Images

Pre-built Docker images are automatically pulled from GitHub Container Registry:
- `ghcr.io/nixrtr/backend:latest`
- `ghcr.io/nixrtr/webui:latest`

The `docker-compose.yml` file is configured to use these images by default. No manual building is required.

### Building Images Locally (Advanced)

If you need to build images locally (e.g., for development or custom modifications), you'll need to clone the repository:

```bash
git clone https://github.com/NixRTR/webui.git
cd webui/docker
docker-compose build
```

Or build individual services:

```bash
cd webui/docker
docker-compose build backend
docker-compose build webui
```

**Note**: Building locally requires Node.js and npm to build the frontend and documentation.

## Troubleshooting

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f worker
```

### Check Service Status

```bash
docker-compose ps
```

### Restart Services

```bash
docker-compose restart
```

### Database Connection Issues

- Verify PostgreSQL is running: `docker-compose ps postgres`
- Check database credentials in `.env`
- Ensure database is initialized (backend runs migrations on startup)

### Frontend Not Loading

- Verify webui service is running: `docker-compose ps webui`
- Check Nginx logs: `docker-compose logs webui`
- Ensure the webui image was pulled successfully: `docker images | grep nixrtr/webui`

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

```bash
# Pull latest images
docker-compose pull

# Restart services
docker-compose up -d
```

To update the docker-compose.yml file itself, re-download it:

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/NixRTR/webui/main/docker/docker-compose.yml
```

Or if you cloned the repository for local building:

```bash
# Pull latest code
git pull

# Rebuild and restart
cd docker
docker-compose up -d --build
```

## Production Considerations

- Use strong passwords and secrets in `.env`
- Set up proper firewall rules
- Use HTTPS (configure reverse proxy or use Caddy)
- Regularly update images
- Monitor logs and resource usage
- Set up backups for PostgreSQL data
- Consider using Docker secrets for sensitive data

