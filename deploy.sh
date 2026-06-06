#!/bin/bash
set -e

echo "Pulling latest code..."
git fetch origin main
git reset --hard origin/main

echo "Building containers..."
docker compose build

echo "Stopping old containers..."
docker stop as-frontend as-backend as-db 2>/dev/null || true
docker rm as-frontend as-backend as-db 2>/dev/null || true

echo "Starting containers..."
docker compose up -d

echo "Waiting for database..."
sleep 15

echo "Running migrations..."
docker compose exec -T as-backend python manage.py migrate --noinput

echo "Collecting static files..."
docker compose exec -T as-backend python manage.py collectstatic --noinput

echo "Seeding data..."
docker compose exec -T as-backend python manage.py seed_data

echo "Done!"
