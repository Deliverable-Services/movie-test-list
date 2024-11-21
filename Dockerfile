# Stage 1: Build the Next.js application
FROM node:18-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Create the production-ready image
FROM node:18-alpine AS production-stage

# Set working directory
WORKDIR /app

# Add a non-root user for security
RUN addgroup -g 1001 nextjs && adduser -S -u 1001 -G nextjs nextjs

# Copy production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy build artifacts and necessary files from build-stage
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/next.config.mjs ./
COPY --from=build-stage /app/package.json ./

# Change ownership of the public folder
# RUN chown -R nextjs:nextjs ./public

# Set environment variables (recommend passing these at runtime)
ENV NODE_ENV=production
# Note: Pass MONGO_URI and JWT_SECRET via Docker `--env` flags or in a .env file

# Expose the required port
EXPOSE 3000

# Run as non-root user
USER nextjs

# Start the Next.js application
CMD ["yarn", "next", "start"]
