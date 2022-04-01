#!/usr/bin/env bash
node index.mjs &
npx react-scripts test --env=./custom-environment.js --watchAll false
pkill -SIGKILL node
