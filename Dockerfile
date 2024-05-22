FROM node:20.11.0

WORKDIR /home/app/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
