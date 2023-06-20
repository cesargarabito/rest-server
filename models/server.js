const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
//holi
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      buscar: '/api/buscar',
      usuariosPath: '/api/usuarios',
      authPath: '/api/auth',
      categoriasPath: '/api/categorias',
      productosPath: '/api/productos'
    }
    
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
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.usuariosPath, require('../routes/user'));
    this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
    this.app.use(this.paths.productosPath, require('../routes/productos'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Corriendo en puerto: ', this.port);
    });
  }
}

module.exports = Server;
