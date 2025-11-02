# Dockerfile for local development
FROM node:22.19.0-alpine

# Set working directory
WORKDIR /code

# Command to start in development mode
CMD ["sh", "-c", "yarn && yarn dev"]
