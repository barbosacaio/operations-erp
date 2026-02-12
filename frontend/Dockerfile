ARG NODE_VERSION=22.18.0

# Base
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
COPY package*.json ./


# Development
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]


# Build
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build


# Production
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["npm", "run", "start"]