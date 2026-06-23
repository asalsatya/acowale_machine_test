# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

# Create a directory for the sqlite DB and ensure the node user owns it
RUN mkdir -p /app/data && chown -R node:node /app/data

# Run as non-root user
USER node

EXPOSE 4000
CMD ["npm", "start"]
