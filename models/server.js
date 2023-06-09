const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios';
    //Conectar a DB
    this.conectarDB();
    //Middleware
    this.middlewares();
    //Rutas de la aplicacao
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    //Cors
    this.app.use( cors() );
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Corriendo en puerto: ', this.port);
    });
  }
}

module.exports = Server;
