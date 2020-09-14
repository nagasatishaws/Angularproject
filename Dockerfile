FROM node

RUN apt-get update && apt-get upgrade -y \
    && apt-get clean

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install


FROM nginx:alpine
COPY src /app/src /usr/share/nginx/html

EXPOSE 3000

CMD [ "npm", "start" ]
