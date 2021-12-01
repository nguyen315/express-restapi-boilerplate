## Set up

#### Install `win-node-env` to run script with environment

```
npm install -g win-node-env
```

#### Setup local database info in file .env

example: \
DB_USERNAME=admin \
DB_PASSWORD=admin \
DB_NAME=classroom \
DB_HOST=127.0.0.1 \

#### Run below command to migrate database

```
yarn sequelize db:migrate
```

## Run repo

#### Start repo in development

```
yarn install
yarn dev
```

## Script use in development

#### Generate skeleton migration file

```
yarn sequelize migration:generate --name {file name}
```

#### Generate seeder file

```
yarn sequelize seed:generate --name {file name}
```

#### Database script

```
yarn sequelize db:migrate:undo  # undo latest migration
yarn sequelize db:migrate:undo:all  # undo all migrations
```
