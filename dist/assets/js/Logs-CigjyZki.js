import{j as r}from"./ui-vendor-CtbJYEGA.js";import{M as e}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const n=`# WebUI — Logs\r
\r
View system and application logs in the WebUI.\r
\r
## Location\r
\r
In the WebUI sidebar, under **System**, select **Logs**. The WebUI path is \`/system/logs\`.\r
\r
## Features\r
\r
- **Log stream** — View recent log lines from the router (e.g. systemd journal or application logs).\r
- **Filtering** — Filter by service, severity, or time range when the WebUI supports it.\r
\r
Logs are useful for troubleshooting authentication issues, service control failures, and backend or worker errors. For full access to the journal, you can also use \`journalctl\` over SSH.\r
\r
## Related commands\r
\r
On the router you can inspect logs directly:\r
\r
\`\`\`bash\r
# Backend\r
sudo journalctl -u router-webui-backend -f\r
\r
# Celery worker\r
sudo journalctl -u router-webui-celery-worker -f\r
\r
# Authentication\r
sudo journalctl -u router-webui-auth@ -f\r
\`\`\`\r
\r
## See also\r
\r
- [WebUI overview](/webui) — WebUI features and access\r
- [WebUI Worker Status](/webui/worker-status) — Celery worker and task status\r
- [Troubleshooting in WebUI config](/webui#troubleshooting) — Common issues\r
`;function i(){return r.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:r.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:r.jsx(e,{content:n})})})}export{i as Logs};
