import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as r}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const n=`# WebUI — Worker Status\r
\r
View Celery worker and task status in the WebUI.\r
\r
## Location\r
\r
In the WebUI sidebar, under **System**, select **Worker Status**. The WebUI path is \`/settings/worker-status\`.\r
\r
## Features\r
\r
- **Worker status** — See whether Celery workers are running and when they were last seen.\r
- **Task status** — View recent and active tasks (e.g. aggregation, notifications, port scanner, history cleanup).\r
- **Long-running tasks** — Identify tasks that have been running longer than the configured threshold (e.g. 300 seconds).\r
\r
The WebUI backend uses Celery with Redis as the broker. Background tasks run in separate \`router-webui-celery-worker\` and \`router-webui-celery-beat\` processes; they do not run inside the FastAPI process. This page helps you confirm that workers are healthy and that scheduled and one-off tasks are executing as expected.\r
\r
## When to use\r
\r
- After deploying or restarting the router: confirm workers are up.\r
- When notifications or history are not updating: check that the notification and aggregation tasks are running.\r
- To see if any task is stuck (long-running).\r
\r
## See also\r
\r
- [WebUI overview](/webui) — WebUI architecture and features\r
- [WebUI Logs](/webui/logs) — System and application logs\r
`;function i(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(r,{content:n})})})}export{i as WorkerStatus};
