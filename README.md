# Bitcoin Transaction Manager Nodejs Environment

This repository contains the nodejs front-end/backend for the COP4520, Spring 2021 class project.

## Software Pre-requisites

The nodejs environment was developed using the following software versions:

- nodejs = v15.x
- npm <= 6.x

If you are using the same software but with an earlier version, The project is not guaranteed to run correctly.

## How to Compile

To compile the nodejs envirnoment, you will need two bash terminals with nodejs and npm installed.

### If You Don't have a .env file

If you don't have a .env file, you will still be able to compile and run the nodejs environment. However, the environment will not be completely functional since it is missing important credentials to the MySQL database and other components.

The .env file can not be uploaded to GitHub due to security reasons. To get a copy of the .env file, please reach out to one of the developers on the project. A list of developers is located at the bottom of this README.

### First Terminal

The first terminal will be used to start the backend nodejs server. To compile and run the server, do the following steps:

1. Navigate to the source directory of the nodejs project
2. Run the command `sudo npm install`
3. Run the command `npm start`

After these steps are complete, the backend server will start on port 5000 unless otherwise specified in your .env file.

### Second Terminal

The second terminal will be used to start the frontend nodejs server. To compile and run the server, do the following steps:

1. Navigate to `<src_dir_of_nodejs_project>/front-end`
2. Run the command `sudo npm install`
3. Run the command `npm start`

After these steps are complete, the frontend server will start on port 3000 unless otherwise specified in your .env file. A new tab should automatically open in your default browser when the server is finished starting.

### It's Not Over Yet

The nodejs environment of the app is now running. However, assuming you have not already done so, the maven environment of the application also needs to be compiled and ran so the app is able to perform the bitcoin transactions and calculations. Information on the maven envirnoment can be found in the *Microservice Server* section.

## Microservice Server

This application uses an external microservice using a maven server to calculate the bitcoin transactions and exchange rates.

The microservice repository is located [here](https://github.com/cop4520-btc/java-server).

## Developers

- [JonElliot Antognoni](https://github.com/Deadcoast)
- [Lizette Leuterio](https://github.com/Kimcheemo)
