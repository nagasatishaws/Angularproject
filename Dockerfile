#stage 1
# FROM node:12.4.0
# RUN mkdir pharma4.0
# RUN cd pharma4.0

# RUN git clone git@gitlab.com:raghu_m/datax-ui.git

# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# FROM node:12.4-alpine
# ENV NODE_ENV production
# RUN npm build --prod
# EXPOSE 4200

# # stage 2
# FROM nginx:alpine
# COPY /dist/Datax /usr/share/nginx/html


# stage 2
# FROM nginx:alpine
# COPY /dist/Datax /usr/share/nginx/html

#RUN COPY ./* ./ng-app
# FROM node:8-alpine as builder
# RUN mkdir /ng-app && cp . ng-app

FROM node

RUN apt-get update && apt-get upgrade -y \
    && apt-get clean

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm build
FROM nginx:alpine
COPY --from=caseintakeui /usr/src/app/dist/Caseintake /usr/share/nginx/html

COPY src /app/src

EXPOSE 3000

CMD [ "npm", "start" ]







