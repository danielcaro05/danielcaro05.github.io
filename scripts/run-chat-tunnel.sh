#!/bin/bash
# Option A — Expose local llama-server via Cloudflare Tunnel for the Chat tab
# Usage:
#   1. Build/run llama-server with CORS:
#      llama-server --host 127.0.0.1 --port 8080 --cors -m /path/to/model.gguf
#   2. In another terminal, run this script to expose it:
#      ./scripts/run-chat-tunnel.sh
#      # or with a custom local URL:
#      ./scripts/run-chat-tunnel.sh http://localhost:8080
#
# For a quick demo (ephemeral URL):
#   cloudflared tunnel --url http://localhost:8080
#
# For a persistent URL (requires Cloudflare account + `cloudflared tunnel login`):
#   cloudflared tunnel create chat
#   cloudflared tunnel route dns chat chat.yourdomain.com
#   cloudflared tunnel run chat --url http://localhost:8080

set -e
URL="${1:-http://localhost:8080}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared not found. Install with: brew install cloudflared"
  exit 1
fi

echo "Exposing $URL via Cloudflare Tunnel..."
echo "Copy the https://xxx.trycloudflare.com URL and paste it into the Chat tab's Server URL field."
echo "Make sure llama-server was started with --cors."
echo ""
exec cloudflared tunnel --url "$URL"
