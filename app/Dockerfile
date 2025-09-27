# Stage 1: build frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve frontend with nginx
FROM nginx:alpine AS final
COPY --from=builder /app/out/ /usr/share/nginx/html/
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
