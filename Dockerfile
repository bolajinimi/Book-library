FROM node:18-alpine

WORKDIR /app

COPY . . 

RUN npm install 

RUN apk add --no-cache mongodb-tools

EXPOSE 5000

CMD ["node", "app.js"]