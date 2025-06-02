FROM loto-core
WORKDIR /loto/front
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run start