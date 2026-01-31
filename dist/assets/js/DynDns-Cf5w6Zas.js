import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const i=`# WebUI — Dynamic DNS

Configure Dynamic DNS (DynDns) providers and updates from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **Dynamic DNS**. The WebUI path is \`/settings/dyndns\`.

## Features

- **View DynDns configuration** — See configured providers, hostnames, and update intervals.
- **Edit DynDns settings** — Add or change DynDns providers (e.g. Linode) and the records to update when the router’s public IP changes.

The router runs a DynDns update job (e.g. via systemd timer or Celery) that checks the public IP and updates the DNS records via the provider’s API. The WebUI edits the configuration that this job uses.

## Relation to NixOS configuration

Dynamic DNS is configured in NixOS in [Dynamic DNS configuration](/configuration/dyndns). When you change settings in the WebUI, the backend updates the NixOS config (e.g. \`config/dyndns.nix\`). Secrets (e.g. API tokens) are typically managed via sops-nix and referenced in the config.

## See also

- [Dynamic DNS configuration](/configuration/dyndns) — NixOS DynDns options
- [WebUI overview](/webui) — WebUI features and access
`;function r(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(e,{content:i})})})}export{r as DynDns};
