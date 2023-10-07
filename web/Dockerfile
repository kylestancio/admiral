FROM node:18.9-alpine

WORKDIR /web

COPY /package.json /web/
RUN npm i

COPY . /web/

CMD ["npm", "run", "dev"]