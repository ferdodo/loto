FROM node
WORKDIR /bingo/core
COPY package.json .
RUN npm install
COPY . .
RUN npm run build