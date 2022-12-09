FROM node:16
# RUN apk update && apk add git

USER node

WORKDIR /app

COPY package.json ./

# RUN mkdir -p /app/node_modules/.cache
RUN npm install --silent
# RUN chown -R node:node /app/node_modules

COPY . .


CMD [ "npm", "start" ]