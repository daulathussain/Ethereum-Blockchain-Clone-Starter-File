# Multi-stage build for Ethereum Blockchain Node
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules (secp256k1, keccak, level)
RUN apk add --no-cache python3 make g++ linux-headers

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies for native modules
RUN apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup -g 1001 -S blockchain && \
    adduser -S blockchain -u 1001 -G blockchain

# Copy built node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY --chown=blockchain:blockchain src ./src
COPY --chown=blockchain:blockchain package.json ./

# Create data directories with proper permissions
RUN mkdir -p data && chown -R blockchain:blockchain data

# Switch to non-root user
USER blockchain

# Expose ports
# HTTP RPC
EXPOSE 8545
# WebSocket
EXPOSE 8546
# P2P Network
EXPOSE 30303

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8545/health || exit 1

# Set production environment
ENV NODE_ENV=production

# Start the blockchain node
CMD ["node", "src/index.js"]
