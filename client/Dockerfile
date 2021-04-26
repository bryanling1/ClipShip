FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN npm install --only-prod

COPY ./src .

COPY ./public .

COPY .eslintrc.js .

COPY .gitignore .

COPY tsconfig.json .

EXPOSE 3000

CMD ["npm", "start"]