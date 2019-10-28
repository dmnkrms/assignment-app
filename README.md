
# Company assignment application

  

Company application built with Rails and React
Application deployed in heroku: [https://applicationch.herokuapp.com/](https://applicationch.herokuapp.com/)

## Table of Contents

- [Getting Started](#getting-started)
- [API calls](#api-calls)
- [Considerations](#considerations)

  

## Getting Started

  

These instructions will get you a copy of the project up and running on your local machine using docker for development and testing purposes. If you want to run it locally then you have to install all dependencies and switch 'http://rails:3001' to 'http://localhost:3001' in ./client/src/setupProxy.js

  

### Docker container


To run this application in docker container follow these steps:

  

```

docker-compose build

```

After build is done

  

```

docker-compose up

```

Then you need to initialize database

  

```

docker-compose backend rake db:migrate

```

  

And add some mock-up data

  

```

docker-compose backend rake db:seed

```

  

## API calls

  Some of the routes are protected with basic http authentication. Use these credentials:
```

user name: user
password: 1234

```

Rails server will be listening on port 3001. To querry data use following commands:

GET all companies
```

http://localhost:3001/api/companies

```
GET single company
```

http://localhost:3001/api/companies/:id

```
GET beneficial owners of particular company
```

http://localhost:3001/api/companies/:id/owners

```
POST create a company
```

http://localhost:3001/api/companies

```
POST add a beneficial owner to particual company
```

http://localhost:3001/api/companies/:id/owners

```
PUT update company details
```

http://localhost:3001/api/companies/:id

```
DELETE particular company
```

http://localhost:3001/api/companies/:id

```
DELETE benefecial owner
```

http://localhost:3001/api/companies/:id/owners/:id

```
## Considerations
- **Propose a protocol / method for authentication and justify your choice**
  - Right now this solution is using basic http authentication wich is fine for this kind of solution. A better solution to authenticate API calls would be to use API keys. It's easy solution for public APIs by sending key with every request. Best practice would be to put API key in the authorization header when sending a request and do not put any sensitive information or keys in query string paramaters.   
- **How can you make the service redundant? What considerations should you do?**
  - Make it as loosely coupled as possible. This would allow to easil modify the service without affecting either the service consumer or the service implementation. The more dependencies you have between services, the more likely it is that changes will have wider, unpredictable consequences.
- **How can you implement versioning of all the data?**
  - In regards to API itself, versioning could be implemented in URI paht by adding /api/v1/companies, /api/v2/companies and so on. This would allow to do same calls just by changing one of the parameters in a API URI. In regards to project, Git is perfect tool for it, utilizing branching and tagging helps to keep track of the project and roll-back in case something goes wrong
    