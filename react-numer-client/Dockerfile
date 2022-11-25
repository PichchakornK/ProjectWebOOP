FROM node:14-slim

# Setting Working Directory
WORKDIR /numer/frontend/src/app

# Copying only package.json
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]