import "reflect-metadata";
import { createConnection  } from "typeorm";
import * as express from "express";
import routes from "./routes";
var compression = require('compression');
var helmet = require('helmet');
var cors = require('cors');

createConnection().then(async connection => {

    //Instancia de express
    const app = express()
    const port = process.env.PORT || 5000;

    app.use(helmet())
    app.use(cors())
    app.use(compression())
    app.use(express.json())

    app.use("/", routes)

    app.listen(port, () => {
        console.log(`Servidor ejecutandose en el puerto ${port}`)
    })

}).catch(error => console.log(error))
