# Stage 1: Build the Next.js application
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json .

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV MONGO_URI=mongodb://mongo:Deliverable%402024@ci.deliverable.services:27017/
ENV JWT_SECRET=bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4

# Build the Next.js application
RUN yarn build

# Stage 2: Create the production-ready image
FROM node:18-alpine AS production-stage

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json .

# Install production dependencies
RUN yarn install --production

# Copy the Next.js build from the build-stage
COPY --from=build-stage --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/next.config.js ./

# Expose the required port
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]