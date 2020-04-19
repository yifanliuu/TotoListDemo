# Todo List Demo
## Quick Start
### Run the server: 
1. Install dependencies.
```shell
cd ./server
npm i
```
2. Create database `todolistdemo` in your Mysql.
3. Change database settings inside `ormconfig.json` file.
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "password",
  "database": "todolistdemo",
}
```
4. Run `npm start` command.

**Make sure that the server is running on port 3000.**

---
### Run the client:
1. Install dependencies.
```shell
cd ./client
npm i
```
2. Open another terminal, run `npm run serve` command.
---
### Attentions
- **1. If you are running your server on other ports, you need to change configurations in `/client/vue.config.js` file:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:your_server_port/',
    changeOrigin: true,
    ws: true,
    pathRewrite:{
      '^/api':''
    }
  }
}
```
- **2. Make sure your MySQL supports 中文, otherwise you cannot create any todos using 中文.**
