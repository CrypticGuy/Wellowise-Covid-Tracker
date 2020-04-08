FROM node:10


COPY . /app
WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

EXPOSE 8090
CMD ["node", "index.js"]
