FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]
EXPOSE 8090
