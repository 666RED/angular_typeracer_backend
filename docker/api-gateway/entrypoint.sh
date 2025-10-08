#!/bin/sh
set -e

echo "⏳ Waiting for Postgres to be ready..."
until pg_isready -h postgres -p 5432 > /dev/null 2> /dev/null; do
  sleep 1
done
echo "✅ Postgres is ready."

echo "🚀 Running TypeORM migrations..."
npm run migration:run || { echo "❌ Migration failed"; exit 1; }

echo "🏁 Starting the API Gateway..."
node dist/main.js
