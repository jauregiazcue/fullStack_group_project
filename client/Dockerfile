# client/Dockerfile

# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev", "--host"]