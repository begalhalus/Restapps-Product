# Restapps Typescript

Restapps Typescript with Typeorm

## Feature

- TypeOrm
- Typescript
- ExpressJs
- Migration With Data Schema
- Postgresql
- Auto Sync database

## Start Apps / Project

```
npm install

edit config .env

npm run start or nodemon
```

## Auto Migrate Data To Postgresql

```
typeorm migration:create -n CreateAdminUser
npm run migration:run
npm start or nodemon

it's a magic :)
```

## Build Apps / Project

```
npm run prod

```

## Guideline-API

```
1. sort => sort=prod_id (sample)
2. dir => dir=ASC => sort prod_id ASC (sample)
3. dir => dir=DESC => sort prod_id DESC (sample)
4. limit => default 10 => limit=10 (sample)
5. page => default 1 => page=1 (sample)
6. search => search=rahmadz (sample)

Note:
Data dengan value "migrate" adalah data yang terbuat dari hasil migration
List Product menampilkan semua data (Softdelete dan Aktif)
Detail Product tidak bisa menampilkan data yang telah terSoftdelete


```

## Documentation RestApi

```
https://documenter.getpostman.com/view/13071011/2s8YzRyNcq

```
