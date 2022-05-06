#!/usr/bin/env bash
set -e  # Quit on error.
pkill -SIGKILL node || true  # Force-kill all running instances of node so we can restart it. If node is not running, it will return a non-zero exit code, so I return true to let the script continue.
npm run build
node index.mjs &  # Run the server and continue to the next line.
firefox 'http://localhost:25144' >/dev/null 2>&1 & disown  # Display the project in a browser. The process is run in the background.
