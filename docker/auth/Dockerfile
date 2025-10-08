# ---- Builder Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy files needed for dependency install & build
COPY nx.json tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs

# Build the selected app
RUN npx nx build auth

# ---- Runtime Stage ----
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /app/dist/apps/auth ./dist

EXPOSE 3001

# Run the application
CMD ["node", "dist/main.js"]
