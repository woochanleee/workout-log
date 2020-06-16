FROM node:14.3.0

MAINTAINER woochanleee <030219woo@naver.com>

RUN mkdir -p /app
WORKDIR /app
ADD . /app

RUN npm install

ENTRYPOINT ["npm", "start"]

EXPOSE 5000