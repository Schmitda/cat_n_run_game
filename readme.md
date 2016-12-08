#! Important note
Every cli command expects you to be in the root project folder

# Prerequisits
Install the following software on your system: 
* NodeJS
* NPM (verify that it is in your PATH variable)
* MongoDB


## Global Node Libraries
Following global node libraries are required:
* Typings
* TSD
* Nodemon 
* GULP 
* Bower

Install them via NPM or your prefered package manager
`npm install typings tsd nodemon gulp bower -g`


 `-g` Installs them globaly (for every project)
 
# Get Started
1. Clone this project with gitclone. 
2. Install the required typings
`tsd install` and `typings install`
3. Install the required node packages (this might take serveral minutes) `npm install`
4. Install the asset dependencies with `bower install`
5. Start mongodb with following command `mongod --dbpath C:\mongod\data ` or your custom database path
6. Start the server `nodemon` 
7. Start the sass compiler `gulp`
8. Open a browser session with following URL "localhost:55"


If any additional library is required you can install them via `npm install <library> --save` and adjust this document. 


## What is tsd / typings
Both are tools to provide to pure javascript libraries an TypeScript interface so we can use all advantages of typescript. 
