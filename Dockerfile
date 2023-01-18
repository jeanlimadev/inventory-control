FROM node:lts

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force

RUN npm install npm -g --force

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]