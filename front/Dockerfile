FROM bingo-core
WORKDIR /bingo/front
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run start