FROM node:lts-jessie
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./dist ./dist
COPY .env .
CMD ["npm", "run", "start"]
EXPOSE 3001