FROM node:16-alpine

COPY ./ /app

WORKDIR /app

RUN npm install \
    && npm run build

EXPOSE 3000

CMD node server.js
