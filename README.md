# Hospital IMS Project

## Individual Project By 

Antonio Vazquez-Mackay

## Previously Members

Connor Doman, Eric Launer, Leo Henon

## Description

The purpose of this project is to create an inventory management system for a hospital capable of tracking stored items, ordering new items, storing user information such as permission level, forecasting shortages, and automatically ordering new items when stocks are low.

### Installation

First, clone the repository:

```bash
$ git clone https://github.com/cosc310team24/project.git
```

You will need to install `node` and `yarn` to run this project. You can install `node` by following the instructions [here](https://nodejs.org/en/download/). You can install `yarn` by following the instructions [here](https://yarnpkg.com/en/docs/install).

Before you can run the app you need to install the project's dependencies. Open a terminal in the folder you cloned and run `$ yarn install`.

### Running the application

From a terminal in the folder you cloned, run `$ yarn dev`. This will start the server which automatically compiles and reloads the project in the browser. You can access the project at `http://localhost:3000` or whatever IP it says.

## Testing

Testing is done using the Cypress testing framework. It can perform tests on the components themselves as well as by mimicking user stories and verifying the functionality of the application as a whole.

Component tests are in `cypress/component`.

## Public API's Used 

Google Feed API: To read RSS feed and display news from WHO -- this can later be used to display company wide RSS feeds
Google Visualization API: Used to visualize remaining space in the inventory 
