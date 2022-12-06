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

### Google Feed API: 
Reads RSS feed from WHO, then parses title, description, and publishing date to provide a feed page that can tell staff about ongoing problems. 
Error handling is used, and a loading title is provided to show the user that the system is working to show the rss feed.

### Google Visualization API: 
Used to visualize remaining space in the inventory for each warehouse with error handling. A bar chart is used to emphasize the amounts of each item, a pie chart to show how the inventory space is being used, and a guage chart to give a visual read of total space being used. 
