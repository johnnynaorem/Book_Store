FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a non-root user and switch to that user
# RUN useradd -m appuser
# USER appuser

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]