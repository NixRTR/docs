# WebUI — Worker Status

View Celery worker and task status in the WebUI.

## Location

In the WebUI sidebar, under **System**, select **Worker Status**. The WebUI path is `/settings/worker-status`.

## Features

- **Worker status** — See whether Celery workers are running and when they were last seen.
- **Task status** — View recent and active tasks (e.g. aggregation, notifications, port scanner, history cleanup).
- **Long-running tasks** — Identify tasks that have been running longer than the configured threshold (e.g. 300 seconds).

The WebUI backend uses Celery with Redis as the broker. Background tasks run in separate `router-webui-celery-worker` and `router-webui-celery-beat` processes; they do not run inside the FastAPI process. This page helps you confirm that workers are healthy and that scheduled and one-off tasks are executing as expected.

## When to use

- After deploying or restarting the router: confirm workers are up.
- When notifications or history are not updating: check that the notification and aggregation tasks are running.
- To see if any task is stuck (long-running).

## See also

- [WebUI overview](/webui) — WebUI architecture and features
- [WebUI Logs](/webui/logs) — System and application logs
