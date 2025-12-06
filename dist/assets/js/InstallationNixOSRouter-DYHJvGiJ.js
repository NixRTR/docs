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
