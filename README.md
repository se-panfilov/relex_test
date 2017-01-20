# Getting started

Install dependencies with

```
npm install
```

Then run

```
npm start
```

This will start a small Node.js server on port 5000 which will build and serve the bundle.js file.
The reason this server is needed is to make hot code reloading work (a websocket is opened to this server to send over updated js code), it is not needed in production.

Open http://localhost:5000 to see the application.  
Instructions for the exercise can be found there.

# Hot code reloading

Hot code reloading is set up, any changes you make to the code should show up pretty much instantly in the browser (there are a few exceptions where a full page reload is required).

# Testing

## ESLint

[ESLint](http://eslint.org) is used to lint the javascript code.
It's recommended to configure your IDE/editor to lint with ESLint on-the-fly.
To check all javascript files from the command line:
```
npm run lint
```

## Unit tests

[Mocha](http://mochajs.org) is used for unit testing.
You can find detailed documentation on testing React/Redux apps [here](http://redux.js.org/docs/recipes/WritingTests.html).

From the command line you can run all tests with
```
npm test
```

To automatically rerun the tests every time a file has changed:
```
npm run test:watch
```
