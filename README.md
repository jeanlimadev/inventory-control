
# Inventory Control

This is a stock control API, where is possible to register, edit and delete users, customers and suppliers. in addition to being able to carry out inputs and outputs of registered products.




## Documentation

To view the documentation, [click here](https://inventory-control-api.jeanlima.dev/api-docs).


## Installation

#### * NOTE: To run this project on your computer, you need to install docker. To learn more about, [click here](https://www.docker.com/). 

 
To run this project on your computer, use this commands

```bash
  git clone https://github.com/jeanlimadev/inventory-control.git

  cd inventory-control
```

After, run the command to install the dependencies

```bash
  yarn
  
  or

  npm install
```

##### Create an .env file on root of project containing the environment variables like the example below
![.env file](https://i.imgur.com/GZlIXgu.png)


And finally, you need to run the docker compose command.

```bash
  docker compose up
```
    
## Running tests

Before run the tests, you need to run this command

```bash
  yarn seed:admin
  
  or
  
  npm run seed:admin
```

To run the tests, use the command

```bash
  npm run test
  
  or

  yarn test
```


## Stacks used

- NodeJs
- Express
- Typescript
- Prisma ORM
- PostgreSQL
- Vitest
- Docker
- Swagger UI


## Contact the developer
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jeanlimadev)
