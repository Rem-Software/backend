FROM node:19.5.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run install --force

RUN npm run install -g nodemon

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]