# XpensesCtrl

----

Simple expenses control app made using:

- Node.js
- Angular.js (1.5)
- Angular Material
- Express
- Sequelize (ORM - http://sequelizejs.com/)
- Postgresql
- Satellizer and node-jsonwebtoken (authentication)

----

Database configuration hardcoded on file /server_src/models/index.js - (*)

BUILD:
```shell
npm install
npm build
npm start
```

---

# ROADMAP:

- Model the database [DONE]
- Create models [DONE]
- Create routes structure [DONE]
- Create first route: signup [DONE]
- Create page for signup [DONE]
- FS - login [DONE]
- FS - entries list [DONE]
- FS - CRUD entries with categories (uncategorize entry if category is removed) [partially DONE (edit missing)]
- FS - Graphs and Reports  [DONE]
    - Weekly based reports - per user and per family  [DONE]

- create service that gets validation and known errors and shows on the toast message [TODO]
- Create Async validation for username [TODO]
- Check similar family names and show user similar family names to avoid repeated family names or misstyping [TODO]
- Category selection on entry creation [TODO]
- (*) Use dotenv for database and web server configurations [TODO]
