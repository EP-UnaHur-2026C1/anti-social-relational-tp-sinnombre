const express = require("express");
const app = express();

const routes = require("./src/routes");
const db = require("./src/models");

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync()
  .then(() => {
    console.log("Base de datos conectada");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });