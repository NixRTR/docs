import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const t=`# WebUI — CAKE

Configure and view CAKE (Common Applications Kept Enhanced) traffic shaping from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **CAKE**. The WebUI path is \`/settings/cake\`.

## Features

- **View current CAKE configuration** — See bandwidth limits, flow isolation, and other CAKE parameters.
- **Edit CAKE settings** — Adjust bandwidth, RTT, and other options; changes are written to the router configuration and applied via the CAKE setup service.

## Relation to NixOS configuration

CAKE is configured in NixOS via [CAKE configuration](/configuration/cake). When you change settings in the WebUI, the backend updates the NixOS config (e.g. \`config/cake.nix\`) and triggers application of the new rules. On a NixOS router, the WebUI and the NixOS module work together so that WebUI changes are persisted in the config.

## Requirements

- CAKE support in the kernel and \`cake-setup.service\` (or equivalent) on the router.
- Router config and files writable by the WebUI backend (or sync from WebUI DB to config, depending on deployment).

## See also

- [CAKE configuration](/configuration/cake) — NixOS CAKE options
- [WebUI overview](/webui) — WebUI features and access
`;function s(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(n,{content:t})})})}export{s as Cake};
