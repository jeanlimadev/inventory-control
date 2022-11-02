FROM node:lts

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force

COPY . .

RUN npx prisma migrate dev

EXPOSE 3333

CMD ["npm", "run", "dev"]