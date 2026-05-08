# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the built React app from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the same port used before
EXPOSE 5173

# Nginx runs automatically in the background
CMD ["nginx", "-g", "daemon off;"]