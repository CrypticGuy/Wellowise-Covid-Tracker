FROM node:10

COPY package*.json ./

COPY . .

WORKDIR /

EXPOSE 8090

RUN npm ci --only=production

CMD ["node", "index.js"]
