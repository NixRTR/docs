import{j as r}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const e=`# WebUI — Port Forwarding\r
\r
Manage port forwarding rules from the WebUI.\r
\r
## Location\r
\r
In the WebUI sidebar, open **Settings** and select **Port Forwarding**. The WebUI path is \`/settings/port-forwarding\`.\r
\r
## Features\r
\r
- **View port forwarding rules** — See all configured port forwards (external port, internal host, internal port, protocol).\r
- **Add, edit, and remove rules** — Create new port forwards or change existing ones. The backend updates the router configuration (e.g. \`config/port-forwarding.nix\`) and applies the rules via the firewall (e.g. nftables).\r
\r
Port forwarding exposes internal services to the internet. Use with care and only for services you intend to make reachable.\r
\r
## Relation to NixOS configuration\r
\r
Port forwarding is defined in NixOS in [Port Forwarding configuration](/configuration/port-forwarding). When you change rules in the WebUI, the backend updates the NixOS config and the router applies the new rules. On a NixOS router, WebUI changes are persisted in the config.\r
\r
## See also\r
\r
- [Port Forwarding configuration](/configuration/port-forwarding) — NixOS port forward options\r
- [Verification](/verification) — Verify firewall and port forwarding\r
- [WebUI overview](/webui) — WebUI features and access\r
`;function s(){return r.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:r.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:r.jsx(n,{content:e})})})}export{s as PortForwarding};
