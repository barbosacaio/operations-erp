ARG NODE_VERSION=22.18.0

# Build
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

COPY package*.json ./

# Development
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Test
FROM base AS test
ENV NODE_ENV=test
RUN npm ci
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "test"]

# Build
FROM base AS build
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "run", "start"]