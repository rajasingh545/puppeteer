FROM node:18.20.4-alpine3.20

WORKDIR /app

# Install necessary packages for Puppeteer and Chromium
RUN apk add --no-cache \
    chromium


# Set the Puppeteer environment variable to point to the installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy your package files and install dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
