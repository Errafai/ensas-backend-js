# TP3 — Task List (Vue 3)

Small Vue 3 app that loads tasks from a JSON file and lets you filter tasks (à faire / terminées) and mark tasks as completed.

## Requirements

- Any modern browser
- Python 3 (recommended) or any static file server

## Run

Because the app loads `taskList.json` via `fetch()`, you must serve the folder over HTTP (opening the HTML directly with `file://` may block the request).

### Option A — Python (recommended)

From this folder:

```bash
cd /home/fatal/Development/ensas-backend-js/3-TP3
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/3-TP3.html

### Option B — Any static server

Serve this folder with any local HTTP server and open `3-TP3.html` from that server.

## Files

- `3-TP3.html` — the Vue app (single-file HTML)
- `taskList.json` — initial task data

## Notes

- Marking a task as completed updates the in-memory state (it does not write back to `taskList.json`).
