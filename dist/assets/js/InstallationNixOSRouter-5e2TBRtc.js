<<<<<<<< HEAD:dist/assets/js/InstallationNixOSRouter-DYHJvGiJ.js
import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as r}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const t=`# Installing the NixOS Router\r
\r
The NixOS Router is designed and optimized for NixOS. For the best experience with full integration, automatic updates, and seamless configuration management, we strongly recommend using NixOS.\r
\r
## Using the Install Script (Recommended)\r
\r
Run from a vanilla NixOS installer shell:\r
\r
**Important:** Please take time to inspect this installer script. It is **never** recommended to blindly run scripts from the internet.\r
\r
\`\`\`bash\r
curl -fsSL https://beard.click/nixos-router > install.sh\r
chmod +x install.sh\r
sudo ./install.sh\r
\`\`\`\r
\r
### What does it do?\r
\r
- Downloads, makes executable and runs [\`/scripts/install-router.sh\`](https://github.com/NixRTR/nixos-router/blob/main/scripts/install-router.sh)\r
  - Clones this repository\r
  - Asks for user input with sane defaults to generate your \`router-config.nix\`\r
  - Builds the system\r
\r
## Using the Custom ISO\r
\r
**Note:** This script fetches everything via Nix; expect a large download on the first run.\r
\r
1. Build the ISO:\r
\r
   \`\`\`bash\r
   cd iso\r
   ./build-iso.sh\r
   \`\`\`\r
\r
2. Write \`result/iso/*.iso\` to a USB drive.\r
\r
3. (Optional) Place your \`router-config.nix\` inside the USB \`config/\` folder for unattended installs.\r
\r
4. Boot the router from USB and follow the menu. Pick install or upgrade.\r
\r
5. After completion, reboot and remove the USB stick.\r
\r
`;function a(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(r,{content:t})})})}export{a as InstallationNixOSRouter};
========
import{j as n}from"./ui-vendor-CtbJYEGA.js";import{M as t}from"./MarkdownContent-D-Zi6kKK.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-D8KYDTzx.js";const e=`# Installing the NixOS Router

The NixOS Router is designed and optimized for NixOS. For the best experience with full integration, automatic updates, and seamless configuration management, we strongly recommend using NixOS.

## Using the Install Script (Recommended)

Run from a vanilla NixOS installer shell:

**Important:** Please take time to inspect this installer script. It is **never** recommended to blindly run scripts from the internet.

\`\`\`bash
curl -fsSL https://beard.click/nixos-router > install.sh
chmod +x install.sh
sudo ./install.sh
\`\`\`

### What does it do?

- Downloads, makes executable and runs [\`/scripts/install-router.sh\`](https://github.com/NixRTR/nixos-router/blob/main/scripts/install-router.sh)
  - Clones this repository
  - Asks for user input with sane defaults to generate your \`router-config.nix\`
  - Builds the system

## Using the Custom ISO

**Note:** This script fetches everything via Nix; expect a large download on the first run.

1. Build the ISO:

   \`\`\`bash
   cd iso
   ./build-iso.sh
   \`\`\`

2. Write \`result/iso/*.iso\` to a USB drive.

3. (Optional) Place your \`router-config.nix\` inside the USB \`config/\` folder for unattended installs.

4. Boot the router from USB and follow the menu. Pick install or upgrade.

5. After completion, reboot and remove the USB stick.

`;function a(){return n.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:n.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:n.jsx(t,{content:e})})})}export{a as InstallationNixOSRouter};
>>>>>>>> 6a34e1814b5c598987561852f62943cca23a38ad:dist/assets/js/InstallationNixOSRouter-5e2TBRtc.js
