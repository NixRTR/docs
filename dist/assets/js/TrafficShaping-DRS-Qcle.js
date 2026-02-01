import{j as i}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const e=`# WebUI — Traffic Shaping

View and manage traffic shaping from the WebUI.

## Location

In the WebUI, the **Traffic Shaping** page is available from the sidebar or main navigation. The WebUI path is \`/traffic-shaping\`.

## Features

- **Traffic shaping overview** — See current traffic shaping configuration and status (e.g. CAKE or other qdiscs).
- **Charts and statistics** — Where supported, view per-interface or per-class traffic and shaping effects.

Traffic shaping limits or prioritizes bandwidth to avoid congestion and improve fairness. CAKE is the primary mechanism documented in this project; see [WebUI CAKE](/webui/cake) and [CAKE configuration](/configuration/cake) for CAKE-specific settings.

## See also

- [WebUI CAKE](/webui/cake) — CAKE configuration in the WebUI
- [CAKE configuration](/configuration/cake) — NixOS CAKE options
- [WebUI overview](/webui) — WebUI features and access
`;function s(){return i.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:i.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:i.jsx(n,{content:e})})})}export{s as TrafficShaping};
