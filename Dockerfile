FROM ubuntu:latest 
RUN apt-get update -y 
RUN apt-get install -y nginx 

FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]
EXPOSE 8080
