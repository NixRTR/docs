import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as r}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const e=`# WebUI — Port Forwarding

Manage port forwarding rules from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **Port Forwarding**. The WebUI path is \`/settings/port-forwarding\`.

## Features

- **View port forwarding rules** — See all configured port forwards (external port, internal host, internal port, protocol).
- **Add, edit, and remove rules** — Create new port forwards or change existing ones. The backend updates the router configuration (e.g. \`config/port-forwarding.nix\`) and applies the rules via the firewall (e.g. nftables).

Port forwarding exposes internal services to the internet. Use with care and only for services you intend to make reachable.

## Relation to NixOS configuration

Port forwarding is defined in NixOS in [Port Forwarding configuration](/configuration/port-forwarding). When you change rules in the WebUI, the backend updates the NixOS config and the router applies the new rules. On a NixOS router, WebUI changes are persisted in the config.

## See also

- [Port Forwarding configuration](/configuration/port-forwarding) — NixOS port forward options
- [Verification](/verification) — Verify firewall and port forwarding
- [WebUI overview](/webui) — WebUI features and access
`;function s(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(r,{content:e})})})}export{s as PortForwarding};
