FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

RUN yarn install

RUN npx prisma generate

RUN yarn build

EXPOSE 4000

# RUN npx prisma migrate dev
# RUN something

CMD ["yarn", "start"]

