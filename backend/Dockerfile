FROM node:16
WORKDIR /server
COPY package.json /server
RUN npm install
COPY . /server
CMD node server.js
EXPOSE 5000