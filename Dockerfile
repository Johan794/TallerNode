FROM node:12.18.3-alpine3.12
WORKDIR  /app
COPY  package.json /app
COPY dist /app
RUN npm install
ENV PORT=8080  NODE_ENV=production  MONGO_CONNECTION_STRING=mongodb://127.0.0.1:27017/AppDB JWT_SECRET=secretJWT_EXPIRATION_TIME=25h
EXPOSE 8080
CMD [ "npm", "start"]

