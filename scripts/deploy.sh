#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/Users/bini/apps/04_39notes}"
BLOG_CONTENT_DIR="${BLOG_CONTENT_DIR:-/Users/bini/apps/00_Blog}"
PM2_APP_NAME="${PM2_APP_NAME:-39-notes}"
PORT="${PORT:-3404}"
BRANCH="${BRANCH:-main}"

log() {
  printf '\n[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "APP_DIR does not look like a git clone: $APP_DIR" >&2
  exit 1
fi

if [[ ! -d "$BLOG_CONTENT_DIR" ]]; then
  echo "BLOG_CONTENT_DIR not found: $BLOG_CONTENT_DIR" >&2
  echo "Clone or symlink the content repo before deploying." >&2
  exit 1
fi

log "Syncing git branch $BRANCH in $APP_DIR"
git -C "$APP_DIR" fetch --all --prune
git -C "$APP_DIR" checkout "$BRANCH"
git -C "$APP_DIR" reset --hard "origin/$BRANCH"
git -C "$APP_DIR" clean -fd

log "Installing dependencies"
cd "$APP_DIR"
corepack enable >/dev/null 2>&1 || true
pnpm install --frozen-lockfile

log "Building app"
BLOG_CONTENT_DIR="$BLOG_CONTENT_DIR" pnpm build

log "Reloading pm2 process $PM2_APP_NAME on port $PORT"
APP_DIR="$APP_DIR" BLOG_CONTENT_DIR="$BLOG_CONTENT_DIR" PORT="$PORT" pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
pm2 status "$PM2_APP_NAME"

log "Deploy finished"
