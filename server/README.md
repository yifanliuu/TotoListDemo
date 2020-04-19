# Server

- Steps to run this server:
  1. Run `npm i` command
  2. create database `todolistdemo` in your Mysql
  3. Change database settings inside `ormconfig.json` file
  ```json
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "windellwin990901",
    "database": "todolistdemo",
  }
  ```
  4. Run `npm start` command
---
**Make sure that the server is running on port 3000.**