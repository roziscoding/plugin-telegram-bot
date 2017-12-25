FROM node:9.3.0-alpine

RUN mkdir /etc/app
WORKDIR /etc/app
COPY . .

RUN npm install --only=production

CMD ["npm", "start"]