FROM node:alpine

WORKDIR '/projects/app'

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]