# WebUI — Logs

View system and application logs in the WebUI.

## Location

In the WebUI sidebar, under **System**, select **Logs**. The WebUI path is `/system/logs`.

## Features

- **Log stream** — View recent log lines from the router (e.g. systemd journal or application logs).
- **Filtering** — Filter by service, severity, or time range when the WebUI supports it.

Logs are useful for troubleshooting authentication issues, service control failures, and backend or worker errors. For full access to the journal, you can also use `journalctl` over SSH.

## Related commands

On the router you can inspect logs directly:

```bash
# Backend
sudo journalctl -u router-webui-backend -f

# Celery worker
sudo journalctl -u router-webui-celery-worker -f

# Authentication
sudo journalctl -u router-webui-auth@ -f
```

## See also

- [WebUI overview](/webui) — WebUI features and access
- [WebUI Worker Status](/webui/worker-status) — Celery worker and task status
- [Troubleshooting in WebUI config](/webui#troubleshooting) — Common issues
