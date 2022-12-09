FROM node:16

WORKDIR /src

COPY package.json ./

RUN npm install --silent

COPY . .

CMD [ "npm", "run", "dev" ]