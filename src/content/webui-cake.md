# WebUI — CAKE

Configure and view CAKE (Common Applications Kept Enhanced) traffic shaping from the WebUI.

## Location

In the WebUI sidebar, open **Settings** and select **CAKE**. The WebUI path is `/settings/cake`.

## Features

- **View current CAKE configuration** — See bandwidth limits, flow isolation, and other CAKE parameters.
- **Edit CAKE settings** — Adjust bandwidth, RTT, and other options; changes are written to the router configuration and applied via the CAKE setup service.

## Relation to NixOS configuration

CAKE is configured in NixOS via [CAKE configuration](/configuration/cake). When you change settings in the WebUI, the backend updates the NixOS config (e.g. `config/cake.nix`) and triggers application of the new rules. On a NixOS router, the WebUI and the NixOS module work together so that WebUI changes are persisted in the config.

## Requirements

- CAKE support in the kernel and `cake-setup.service` (or equivalent) on the router.
- Router config and files writable by the WebUI backend (or sync from WebUI DB to config, depending on deployment).

## See also

- [CAKE configuration](/configuration/cake) — NixOS CAKE options
- [WebUI overview](/webui) — WebUI features and access
