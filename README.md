# challenge-fpf-tech-henriqueannicchino


Solution to the practical challenge of the FPF Tech selection process

The application consists of:
 - Turn-based game, where the user must first enter his player name
 - Player ranking with scores in descending order (the player is added to the ranking after winning a match)

Additional Resources:
    - Enemy can be stunned the turn following a special attack
    - Change the color of the life bar according to the remaining life points
    - Log of player and enemy actions each turn
	- The game has character attack, damage and death animations
	

# Technologies used

## Database
- MongoDB

## Backend
- JavaScript
- NodeJS
- Express
- Mongoose

## Frontend
- TypeScript
- Angular
- HTML
- Scss

# How to execute the project 

## Using Docker Compose

Prerequisites: [Docker Engine]

```bash
# clone repository
git clone https://github.com/henriqueannicchino/FPF_tech_challenge.git

# Run in the project root folder in root mode
docker-compose up
```

After activating the containers, the subprojects can be accessed locally:

- Frontend: http://localhost:4200
- Backend: http://localhost:5000

# Running manually

# Prerequisites: have mongo atlas or connect with mongo local
### To use mongo atlas
- create a .env file in the backend folder
- inside the file insert CONNECTION_URL = "Your Mongo Atlas URL"
- to define the port you want to run the backend enter PORT = "port number" example PORT = 5000
- uncomment the atlas connection line and comment out the local connection line in server.js

# To use local mongo
### Crie um container mongo
- docker-compose up mongodb


## Backend

# enter the backend project folder
cd backend

# install dependencies
npm install

# execute the project
npm start

## Frontend

# enter the frontend project folder
cd frontend

# install dependencies
npm install

# execute the project
ng serve

# Author

[Luis Henrique Matos Sales](https://www.linkedin.com/in/luis-henrique-211aaa1b6/)


