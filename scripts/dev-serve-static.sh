#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/dev-serve-static.sh
# Starts a tiny Node static server to serve files in $STORAGE_DIR (default ./tmp/audio)

STORAGE_DIR=${STORAGE_DIR:-./tmp/audio}
PORT=${PORT:-8080}

echo "Serving $STORAGE_DIR on http://localhost:$PORT"
STORAGE_DIR=$STORAGE_DIR PORT=$PORT node ./scripts/dev-serve-static.js

# Tip: to expose the server to the internet for Spotify ingestion during testing, use ngrok:
# ngrok http $PORT
