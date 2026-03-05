# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app (creates dist folder)
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Start the app
CMD ["serve", "-s", "dist", "-l", "5173"]