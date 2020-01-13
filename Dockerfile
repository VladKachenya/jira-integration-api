FROM node:12.14.0

WORKDIR /usr/src
COPY . /usr/src/
RUN npm config set registry http://registry.npmjs.org/ && npm install
RUN npm run build

EXPOSE 3000

CMD npm start
