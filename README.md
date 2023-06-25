<p align="center">
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" width="50" alt="Typescript Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-dsc/events/nextjs-boilerplate-logo.png" width="50" alt="Next Logo" /></a>
  <a href="https://pptr.dev/" target="blank"><img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" width="50" alt="Puppeteer Logo" /></a>
</p>

<p align="center">
  A boiler-plate combined with <b>Typescript</b>, <b>Nest JS</b>, <b>Next JS</b>, and <b>Puppeteer</b> for building microservices responsible for rendering html and pdf views using React and Next.JS.
</p>

<p align="center">
  <a href="https://github.com/dimitrij94/backend-rendering-service/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/dimitrij94/backend-rendering-service" />
  </a>
  <a href="https://github.com/dimitrij94/backend-rendering-service/backend-rendering-service">
    <img src="https://img.shields.io/github/repo-size/dimitrij94/backend-rendering-service" />
  </a>
  <a href="https://github.com/dimitrij94/backend-rendering-service/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/dimitrij94/backend-rendering-service?color=0088ff" />
  </a>
  <a href="https://github.com/dimitrij94/backend-rendering-service/pulls">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/dimitrij94/backend-rendering-service?color=0088ff" />
  </a>
</p>

## Installation

```bash
$ yarn
```

## Environment variables

Copy the `.env.example` file and create a `.env` file. Configure your server port and other env variables.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Views

To add a new view - create a new template under src/client/pages. 
This will make this new page accessible over url: `/view/NewTemplateName` 
In order to pass additional properties you mush implement `getInitalPropsFunction` function inside the class page 
component or add it as a property of the functional component, you can see example in /src/client/pages/HelloWorld.tsx.

`HelloWorld.getInitialProps = getInitialPropsFromRequestBody`

If you implement it the same way - you will be able to pass inital properties to the request body.

## Pdf and Html rendering 

You can change the response type by passing additional query to the request parameter named `format` with acceptable
values of `pdf` and `html`.

## Demo

To try out the functionality try running the server on the port 3003 and then executing this script to generate the pdf representation of the page:

**Generating HTML page**

``` bash
curl --location 'http://localhost:3003/view/HelloWorld?format=html' \
--header 'Content-Type: application/json' \
--data '{
    "name": "World"
}' -o test.html
```

**Generating PDF page**

``` bash
curl --location 'http://localhost:3003/view/HelloWorld?format=pdf' \
--header 'Content-Type: application/json' \
--data '{
    "name": "World"
}' -o test.html
```
