# SeatMaster

_Disclaimer: Anything in this repository copied, used or similar is done at your own risk._

This is a project done during the course IT2901 for the IDI Study Administration.

The backend is written in Python with Flask.  
The frontend is written in TypeScript with React & Redux.

# Installation Guide

This project is mainly developed on Mac OS and Ubuntu. We can't guarantee that you don't have to do extra steps for other platforms.

The first step is to clone the project

`git clone https://github.com/FluidSense/SeatMaster`

## Development build

### Backend

To set up the backend you first have to install docker and docker-compose.

Installation guide for docker and docker-compose can be found [here](https://docs.docker.com/compose/install/).

After you have sucessfully installed docker and docker-compose run this command to set up the backend. Navigate to the projects root-directory and run this command.

`docker-compose up --build`

You might need to run it as sudo if you have not configured a user for docker.

`sudo docker-compose up --build`

Assuming everything went well the API should be running at http://localhost:5000.

### Frontend

Navigate to the frontend directory.

`cd frontend`

Install the dependencies.

`npm install`

Put your client id from dataporten in this file or put ours `77ee33cd-cc7f-4b7a-bce9-241c96458f14`.

`vim src/config.js`

Start the application

`npm start`

The application should now be running at http://localhost:3000

### Tests

#### Backend

To run the tests for the backend you have to install PostrgeSQL.

Installation guide can be found [here](https://www.postgresql.org/docs/current/tutorial-install.html)

After it's installed navigate to the backend directory

run `python3 -m pytest`

#### Frontend

Navigate to the frontend directory and run `npm run test`

## Production Build

This guide shows you how to deploy the application. This guide assumes some prior knowledge to deployment with nginx and uwsgi.

##### .env file

edit the .env file with more fitting values.

`vim backend/.env`

##### Insert Client Id

Put your client id from dataporten in this file or put ours `77ee33cd-cc7f-4b7a-bce9-241c96458f14`.

`vim frontend/src/config.js`

##### Edit the Base url

Edit the the base-url to reflect the location of your API

`vim frontend/src/API/constants.ts`

##### Edit entrypoint to use uwsgi

`vim backend/entrypoint.sh`

Replace `python3 main.py` with `uwsgi --socket 0.0.0.0:5000 -w wsgi:app`

##### Run Docker-compose

run `docker-compose up -d production.yml --build`

This docker-compose file sets up three containers.

1. The flask application that will be exposed at localhost:5000
2. The database which is only exposed in the internal docker network-
3. A nginx image which serves a production build of the react application on localhost:8080

This command might take some time to run since Frontend.dockerfile builds the react project. To boost the speed i would build locally on your own machine and then transferring it to the server.

##### Nginx

This is the configuration you have to add to _nginx.conf_

```
location /api {
     rewrite /api/(.+) /$1 break;
     include uwsgi_params;
     uwsgi_pass uwsgi://127.0.0.1:5000;
    }

   location / {
     proxy_pass http://127.0.0.1:8080;
    }
```
