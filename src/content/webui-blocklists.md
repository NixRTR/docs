# WebUI — Blocklists and Whitelist

Manage DNS blocklists and whitelist per network (homelab and LAN) from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **Blocklists**. The WebUI path is `/settings/blocklists-whitelist`.

## Features

- **Blocklists** — Configure which blocklist URLs are used for ad-blocking and malware protection per network (homelab, lan).
- **Whitelist** — Manage domain whitelist entries so that specific domains are not blocked even if they appear in a blocklist.

Blocklists and whitelist are applied by dnsmasq. The WebUI reads and writes the same configuration that the NixOS router uses (e.g. `config/dnsmasq/blocklists-*.nix` and `whitelist-*.nix`), or syncs from the WebUI database to config depending on deployment.

## Relation to NixOS configuration

Global DNS and blocklist behavior are described in [Global DNS configuration](/configuration/global-dns). The WebUI provides a convenient interface to edit blocklists and whitelist without editing Nix files by hand.

## See also

- [Global DNS configuration](/configuration/global-dns) — Blocklists and DNS options
- [WebUI DNS](/webui/dns) — DNS zones and records
- [WebUI overview](/webui) — WebUI features and access
