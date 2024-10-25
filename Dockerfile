FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm run install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

# RUN npx prisma migrate dev
# RUN something

CMD ["npm", "run", "start"]

