import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as s}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const o=`# Login

![Login Page](/docs/screenshots/001-dashboard.webp)

## Overview

The WebUI login page is your entry point to the router's web interface. Access it by navigating to your router's IP address (default: \`http://192.168.2.1:8080\`).

## Logging In

### Using System Password

**Purpose**: Authenticate using your router's system password.

**How to Use**:
1. Enter your router's system password in the password field
2. Click "Login" or press Enter
3. You'll be redirected to the Dashboard upon successful authentication

**Security**: 
- Passwords are securely hashed and verified
- Sessions are managed with JWT tokens
- Failed login attempts are logged

`;function a(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(s,{content:o})})})}export{a as Login};
