FROM node:jessie
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY ./dist /app
COPY .env /app
CMD ["/bin/bash"]
EXPOSE 3001