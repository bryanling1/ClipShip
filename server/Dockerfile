FROM node:15

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./src .
 
COPY tsconfig.json . 

COPY .gitignore . 

EXPOSE 5000

CMD ["npm", "start"]