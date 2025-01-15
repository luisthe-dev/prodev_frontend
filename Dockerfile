FROM node:18-alpine

WORKDIR /var/www
COPY . /var/www

RUN yarn install

CMD ["yarn", "start"]
