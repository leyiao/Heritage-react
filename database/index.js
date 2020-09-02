const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "35.225.152.6",
    database: "heritage",
    user: "node",
    password: "heritage2020",
    port: 3306
  }
});




module.exports = knex;
