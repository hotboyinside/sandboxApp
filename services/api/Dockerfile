FROM node:23-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
