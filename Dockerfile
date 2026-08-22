# Multi-stage Dockerfile for KalaSetu Full-Stack Application

# Stage 1: Build the React frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine
WORKDIR /app

# Copy server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server source code
COPY server/ ./server/

# Copy built frontend assets to client/dist
COPY --from=client-builder /app/client/dist ./client/dist

# Expose production port
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

# Start server
CMD ["node", "server/server.js"]
