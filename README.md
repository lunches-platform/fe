# Lunches Website Front-End
Website for managing lunches delivery specific activities

## Prerequisites for development  
* Installed [node.js](https://nodejs.org/en/)
* Installed BE part for this project - [Lunches API](https://github.com/lunches-platform/api)

## API Schema
 1. Open [Swagger UI Online](http://petstore.swagger.io/)
 2. Paste [Lunches API Scheme URL](https://raw.githubusercontent.com/lunches-platform/fe/master/misc/lunches.swagger.yaml) to the top input.
 3. Click *Explore* button
 4. Enjoy!

## Class Diagram
![Class Diagram](https://raw.githubusercontent.com/lunches-platform/fe/master/misc/class-diagram.png)

## Installation

### NPM dependencies:
```
npm install // (shorthanded to: `npm i`)
typings install  
```

### Available npm tasks
```
npm install

// build minified production version
npm run build 

// continuous build and watching for changes, output into ./.tmp folder
npm run serve 

// continuous build and watching for changes, output into ./dist folder
npm run serve:dist

// single run test for CI (shorthanded to: `npm test`)
npm run test

// continuous tests
npm run test:auto

```

## Tests

### Coverage
Generated when you run `npm run test` or `npm run test:auto` tasks:
- html output to `/coverage/`

