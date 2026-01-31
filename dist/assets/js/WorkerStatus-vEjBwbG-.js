import{j as e}from"./ui-vendor-CtbJYEGA.js";import{M as n}from"./MarkdownContent-C36B4BtH.js";import"./react-vendor-ZjkKMkft.js";import"./markdown-vendor-_zLkdjX1.js";const t=`# WebUI — Worker Status

View Celery worker and task status in the WebUI.

## Location

In the WebUI sidebar, under **System**, select **Worker Status**. The WebUI path is \`/settings/worker-status\`.

## Features

- **Worker status** — See whether Celery workers are running and when they were last seen.
- **Task status** — View recent and active tasks (e.g. aggregation, notifications, port scanner, history cleanup).
- **Long-running tasks** — Identify tasks that have been running longer than the configured threshold (e.g. 300 seconds).

The WebUI backend uses Celery with Redis as the broker. Background tasks run in separate \`router-webui-celery-worker\` and \`router-webui-celery-beat\` processes; they do not run inside the FastAPI process. This page helps you confirm that workers are healthy and that scheduled and one-off tasks are executing as expected.

## When to use

- After deploying or restarting the router: confirm workers are up.
- When notifications or history are not updating: check that the notification and aggregation tasks are running.
- To see if any task is stuck (long-running).

## See also

- [WebUI overview](/webui) — WebUI architecture and features
- [WebUI Logs](/webui/logs) — System and application logs
`;function i(){return e.jsx("div",{className:"p-6 max-w-4xl mx-auto",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",children:e.jsx(n,{content:t})})})}export{i as WorkerStatus};
