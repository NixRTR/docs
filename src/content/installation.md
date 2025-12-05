# Installation

This guide covers different installation options for the NixOS Router and WebUI.

## Installation Options

### NixOS Router Installation

The complete NixOS Router system is designed and optimized for NixOS. For the best experience with full integration, automatic updates, and seamless configuration management, we strongly recommend using NixOS.

[Install NixOS Router →](/installation/nixos-router)

### WebUI on Other Distributions

While the WebUI is designed for NixOS and provides the best experience when integrated with the full NixOS router configuration, the WebUI components (backend and frontend) can be run on other modern Linux distributions.

**Limitations on non-NixOS systems:**

- No automatic NixOS configuration management
- Manual dependency management required
- No integration with NixOS router modules (DNS, DHCP, etc.)
- Manual service setup and configuration
- Some features may require additional configuration or may not be available

#### Manual Installation

Install the WebUI manually on Ubuntu, Debian, Fedora, Arch Linux, or other distributions.

[Manual Installation Guide →](/installation/webui/manual)

#### Docker Compose Installation

Run the WebUI using Docker Compose for easier deployment and management.

[Docker Compose Guide →](/installation/webui/docker)
