# WebUI — Dynamic DNS

Configure Dynamic DNS (DynDns) providers and updates from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **Dynamic DNS**. The WebUI path is `/settings/dyndns`.

## Features

- **View DynDns configuration** — See configured providers, hostnames, and update intervals.
- **Edit DynDns settings** — Add or change DynDns providers (e.g. Linode) and the records to update when the router’s public IP changes.

The router runs a DynDns update job (e.g. via systemd timer or Celery) that checks the public IP and updates the DNS records via the provider’s API. The WebUI edits the configuration that this job uses.

## Relation to NixOS configuration

Dynamic DNS is configured in NixOS in [Dynamic DNS configuration](/configuration/dyndns). When you change settings in the WebUI, the backend updates the NixOS config (e.g. `config/dyndns.nix`). Secrets (e.g. API tokens) are typically managed via sops-nix and referenced in the config.

## See also

- [Dynamic DNS configuration](/configuration/dyndns) — NixOS DynDns options
- [WebUI overview](/webui) — WebUI features and access
