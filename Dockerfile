# ---- Builder Stage ----
FROM node:20-alpine AS builder

ARG APP_NAME
ARG APP_NAME
ARG APP_PORT

WORKDIR /app

# Install all dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy files needed for dependency install & build
COPY nx.json tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs

# Build the selected app
RUN npx nx build $APP_NAME

# ---- Runtime Stage ----
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from builder stage
COPY --from=builder /app/dist/apps/${APP_NAME} ./dist

ENV NODE_ENV=production
ENV PORT=$APP_PORT
EXPOSE $APP_PORT

# Run the application
CMD ["node", "dist/main.js"]
