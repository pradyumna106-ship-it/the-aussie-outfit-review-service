FROM node:20-alpine

WORKDIR /the-aussie-outfit-review-service

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5008

CMD ["npm", "start"]