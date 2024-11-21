 # Use an official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the app (if necessary)
RUN npm run build

# Expose the port your app will run on (e.g., 4173)
EXPOSE 4173

# Start the application
CMD ["npm", "start"]
