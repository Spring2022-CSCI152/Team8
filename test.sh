#!/usr/bin/env bash
node index.mjs &  # run the server
npx react-scripts test --env=./custom-environment.js --watchAll false
pkill -SIGKILL node
