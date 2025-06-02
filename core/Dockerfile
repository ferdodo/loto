FROM node
WORKDIR /loto/core
COPY package.json .
RUN npm install
COPY . .
RUN npm run build