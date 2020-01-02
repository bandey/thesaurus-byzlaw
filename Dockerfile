FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build app
RUN npm run build:prod
RUN npm run compile

CMD [ "node", "./bin/thesaurus-byzlaw" ]
