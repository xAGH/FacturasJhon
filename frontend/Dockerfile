FROM node:16.15.0-alpine
WORKDIR /front
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

