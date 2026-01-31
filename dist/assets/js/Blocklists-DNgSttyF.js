import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const i=`# WebUI — Blocklists and Whitelist

Manage DNS blocklists and whitelist per network (homelab and LAN) from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **Blocklists**. The WebUI path is \`/settings/blocklists-whitelist\`.

## Features

- **Blocklists** — Configure which blocklist URLs are used for ad-blocking and malware protection per network (homelab, lan).
- **Whitelist** — Manage domain whitelist entries so that specific domains are not blocked even if they appear in a blocklist.

Blocklists and whitelist are applied by dnsmasq. The WebUI reads and writes the same configuration that the NixOS router uses (e.g. \`config/dnsmasq/blocklists-*.nix\` and \`whitelist-*.nix\`), or syncs from the WebUI database to config depending on deployment.

## Relation to NixOS configuration

Global DNS and blocklist behavior are described in [Global DNS configuration](/configuration/global-dns). The WebUI provides a convenient interface to edit blocklists and whitelist without editing Nix files by hand.

## See also

- [Global DNS configuration](/configuration/global-dns) — Blocklists and DNS options
- [WebUI DNS](/webui/dns) — DNS zones and records
- [WebUI overview](/webui) — WebUI features and access
`;function l(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(e,{content:i})})})}export{l as Blocklists};
