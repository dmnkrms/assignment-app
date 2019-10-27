FROM node:10

RUN mkdir /client
WORKDIR /client
COPY ./client/package*.json ./
COPY . /client

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm start