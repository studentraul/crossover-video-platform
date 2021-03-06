# Crossover Video Platform
> Access in: [http://crossover-video-platform.surge.sh/login](http://crossover-video-platform.surge.sh/) User:Password => jon:password

## About
This project was created to attend Crossover hiring process to *Front-end Developer*. Following the proposal, it was required to create a Video Platform using some Javascript framework, tests and good usability. All the requisits could be checked in [this document](https://github.com/studentraul/crossover-video-platform/blob/master/Assigment.md).

## Tools
To Build this tool I used:
- **Javascript framework**: React (create-react-app)
- **Bundler**: Webpack (default used by create-react-app) 
- **Test**: 
  - Jest
  - Sinon
  - Enzyme
- **Framework CSS**: none

## Running locally
To run the project following the steps bellow:

1- Clone the project and move to it folder
```
git clone https://github.com/studentraul/crossover-video-platform.git
cd crossover-video-platform
```

2- Install all the dependencies
```
npm install
```

3- After that, start the server
```
npm start
```

## Tests

### Checking Errors
To run the tests, in the root folder open another terminal and type `npm test`. After that, press `a` to choose the option `run  all tests`.

### Coverage
To check the coverage, run the commnad `npm run cover` and it will print on terminal a general report about tests and it will generate a folder named `coverage` with full report.

At this folder, you can navigate to `coverage/Icov-report/` and open the file `index.html`
