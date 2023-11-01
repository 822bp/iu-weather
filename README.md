# iu-weather
Weather-webapp with openweathermap.org

This app is designed primarily for mobile use. You can toggle the mobile view in your dev console, when viewed on a computer.

### Prerequesites:
yarn version: 1.22.11, node.js version: 16.20.2

### Starting the project:
This Project uses "yarn" as its package manager. Install yarn and use the command `yarn install` in the root of this project to install all dependencies.<br>
Use `yarn start` to start the weather app.

### Setting the API Key:
Create a file called `.env.local` on the root of this project and add this line:
```
REACT_APP_OW_API_KEY = "[REPLACE THIS WITH THE API KEY]"
```
**Don't forget to replace "[REPLACE THIS WITH THE API KEY]" with the Api key.**
