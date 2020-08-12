# API AlgaStock

Looking for the OpenAPI file?
  - [openapi.yaml](./openapi.yaml)

This repo contains a simple free & open source node-based API that will allow you to run a products CRUD with authentication without need of any previous configuration (database or docker installation).

To get started, you must:

``` bash
# Clone the repo into your machine
git clone https://github.com/algaworks/api-alga-stock.git

# Access the repo directory
cd api-alga-stock

# Install all the NPM dependencies (this may take some minutes)
npm install
```

## Seting up

1. Create a simple file called `.env` into the project's root directory
2. Copy and paste this content (feel free to update the constant values)
``` .env
ADMIN_USER=daniel
ADMIN_PASS=123
ADMIN_EMAIL=daniel@algaworks.com
ADMIN_TOKEN=v3ryt0ps3cr3tt0k3n#432

CUSTOMER_USER=joselito
CUSTOMER_PASS=321
CUSTOMER_EMAIL=jose@li.to
CUSTOMER_TOKEN=tops3cr3tt0k3n321
```
3. run `npm run setup` in your terminal

Congrats! You're done.

## Security

By default, the AlgaStock API came with some protected routes that needs authentication. If you're not interested in authentication by now, you can disable it by adding the following line in the end of the `.env` file:

```.env
DISABLE_SECURITY=true
```

## Start

``` bash
# run api
npm start
```