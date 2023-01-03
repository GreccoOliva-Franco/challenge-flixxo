# Challenge

## Requirements

- *Docker* and *docker compose* must be installed in your computer.

- Copy ".env.example" into ".env" file and populate the ".env" file. (IMPORTANT: this env variable "DEPLOY_CONFIG" must be set to *docker* execution enviroment)

## Initzialization

### First time

- Run the command `docker compose down -v --remove-orphans --rmi all` to delete any previous interferring the docker images/stages.
- Run the command `docker-compose up` to start the docker enviroment. Since it's your first time creating the images, it will take a while and the backend may not be usable due to the db service creating the tables. If this happends, wait 2 minutes and re-run the command.

### Every other time

- Run the command `docker-compose up` to start the docker enviroment.

## After the initialization

- Import the Postman collection from "docs/postman/Flixxo.postman_collection.json" into Postman to test the API.

- The endpoints under the "Dashboard" folder are only for testing purposes. Those endpoints should be in its own app parallel to the "BFF" app (out of scope for this challenge).
