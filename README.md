# TotoListDemo
A TodoList Demo based on Vue(Nuxtjs)+Nestjs/typeorm/mysql/

## Quick Start
### Run the server: 
1. Install dependencies.
```shell
cd ./myserver
npm i
```
2. Create database `todolistdemo` in your Mysql.
3. Change database settings inside `/src/app.module.ts` file.
```typescript
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "password",
  "database": "todolistdemo",
```
4. Run `npm run start` command.

**Make sure that the server is running on port 3001.**

---
### Run the client:
1. Install dependencies.
```shell
cd ./myclient
npm i
```
2. Open another terminal, run `npm run dev` command.
3. Open `localhost:3000/` in your browser.
---
### Attentions
- **1. If you are running your server on other ports, you need to change configurations in `/nuxt.config.js` file:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:your_server_port/',
    changeOrigin: true,
    pathRewrite:{
      '^/api':'/'
    }
  }
}
```
- **2. Make sure your MySQL supports 中文, otherwise you cannot create any todos using 中文.**
---
## Features
1. Add New Task
  - Set task's name, descriptions, labels, deadline. (:TODO lack parameter auth)
  - If you do not complete your task before deadline, youe task would turn to red.
2. Browse/Edit Present Tasks
  - the same rules as above
3. Delete Tasks
4. Change Status of Tasks.
  - from `Todo` to `Done`/from `Done` to `Todo`
  
