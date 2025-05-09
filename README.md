# desafio-fpf-tech-henriqueannicchino


Solução do desafio prático do processo seletivo da FPF Tech

A aplicação consiste em:
 - Jogo em turnos, onde o usuário primeiro deve inserir seu nome de jogador
 - Ranking dos jogadores com as pontuações em ordem decrescente
    (o jogador é adiciando ao ranking após vencer uma partida)

Recursos adicionais:
    - Inimigo pode ficar atortoado no turno sequinte a um ataque especial
    - Mudança da cor na barra de vida de acordo com os pontos de vida restantes
    - Log de ações do jogador e do Inimigo em cada turno
	- O Jogo possui animações de ataque, dano e morte do personagem
	

# Tecnologias utilizadas

## Banco de dados
- MongoDB

## Back end
- JavaScript
- NodeJS
- Express
- Mongoose

## Front end
- TypeScript
- Angular
- HTML
- Scss

# Como executar o projeto 

## Utilizando Docker Compose

Pré-requisitos: [Docker Engine]

```bash
# clonar repositório
git clone https://gitlab.com/henriqueannicchino/desafio-fpf-tech-henriqueannicchino.git

# Executar na pasta raiz do projeto no modo root
docker-compose up
```

Após a ativação dos containers, os subprojetos podem ser acessados localmente:

- Front End: http://localhost:4200
- Back End: http://localhost:5000

# Executando manualmente

# Pré-requisitos possuir mongo atlas ou conectar com mongo local
### Para usar mongo atlas 
- crie um arquivo .env na pasta backend
- dentro do arquivo insira CONNECTION_URL = "Sua URL Mongo Atlas"
- para definir a porta que deseja executar o backend insira PORT = "numero da porta" exemplo PORT = 5000
- descomentar linha de conexão com atlas e comentar a de conexão local em server.js

# Para usar mongo local
### Crie um container mongo
- docker-compose up mongodb


## Backend

# entrar na pasta do projeto backend
cd backend

# instalar dependências
npm install

# executar o projeto
npm start

## Frontend

# entrar na pasta do projeto frontend
cd frontend

# instalar dependências
npm install

# executar o projeto
ng serve

# Autor

[Luis Henrique Matos Sales](https://www.linkedin.com/in/luis-henrique-211aaa1b6/)


