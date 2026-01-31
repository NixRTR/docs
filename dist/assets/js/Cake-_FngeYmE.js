import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const t=`# WebUI — CAKE\r
\r
Configure and view CAKE (Common Applications Kept Enhanced) traffic shaping from the WebUI.\r
\r
## Location\r
\r
In the WebUI sidebar, open **Settings** and select **CAKE**. The WebUI path is \`/settings/cake\`.\r
\r
## Features\r
\r
- **View current CAKE configuration** — See bandwidth limits, flow isolation, and other CAKE parameters.\r
- **Edit CAKE settings** — Adjust bandwidth, RTT, and other options; changes are written to the router configuration and applied via the CAKE setup service.\r
\r
## Relation to NixOS configuration\r
\r
CAKE is configured in NixOS via [CAKE configuration](/configuration/cake). When you change settings in the WebUI, the backend updates the NixOS config (e.g. \`config/cake.nix\`) and triggers application of the new rules. On a NixOS router, the WebUI and the NixOS module work together so that WebUI changes are persisted in the config.\r
\r
## Requirements\r
\r
- CAKE support in the kernel and \`cake-setup.service\` (or equivalent) on the router.\r
- Router config and files writable by the WebUI backend (or sync from WebUI DB to config, depending on deployment).\r
\r
## See also\r
\r
- [CAKE configuration](/configuration/cake) — NixOS CAKE options\r
- [WebUI overview](/webui) — WebUI features and access\r
`;function s(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(n,{content:t})})})}export{s as Cake};
