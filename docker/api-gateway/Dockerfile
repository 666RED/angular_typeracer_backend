# ---- Builder Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies
COPY ../../package*.json ./
RUN npm install --include=dev

# Copy files needed for dependency install & build
COPY ../../nx.json ../../tsconfig.base.json ./
COPY ../../apps ./apps
COPY ../../libs ./libs

# Build the selected app
RUN npx nx build api-gateway

# ---- Runtime Stage ----
FROM node:20-alpine
WORKDIR /app

# Install Postgres client (for pg_isready)
RUN apk add --no-cache postgresql-client

# Install only production dependencies
COPY ../../package*.json ./
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /app/dist/apps/api-gateway ./dist

COPY ./docker/api-gateway/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
