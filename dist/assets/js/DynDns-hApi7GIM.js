import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const r=`# WebUI — Dynamic DNS\r
\r
Configure Dynamic DNS (DynDns) providers and updates from the WebUI.\r
\r
## Location\r
\r
In the WebUI sidebar, open **Settings** and select **Dynamic DNS**. The WebUI path is \`/settings/dyndns\`.\r
\r
## Features\r
\r
- **View DynDns configuration** — See configured providers, hostnames, and update intervals.\r
- **Edit DynDns settings** — Add or change DynDns providers (e.g. Linode) and the records to update when the router’s public IP changes.\r
\r
The router runs a DynDns update job (e.g. via systemd timer or Celery) that checks the public IP and updates the DNS records via the provider’s API. The WebUI edits the configuration that this job uses.\r
\r
## Relation to NixOS configuration\r
\r
Dynamic DNS is configured in NixOS in [Dynamic DNS configuration](/configuration/dyndns). When you change settings in the WebUI, the backend updates the NixOS config (e.g. \`config/dyndns.nix\`). Secrets (e.g. API tokens) are typically managed via sops-nix and referenced in the config.\r
\r
## See also\r
\r
- [Dynamic DNS configuration](/configuration/dyndns) — NixOS DynDns options\r
- [WebUI overview](/webui) — WebUI features and access\r
`;function a(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(e,{content:r})})})}export{a as DynDns};
