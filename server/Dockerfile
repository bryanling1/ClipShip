FROM node:15

ADD setup-ffmpeg.sh /root
RUN /root/setup-ffmpeg.sh

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src .
 
COPY tsconfig.json . 

COPY .gitignore . 

EXPOSE 5000

CMD ["npm", "start"]