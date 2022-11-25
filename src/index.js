const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//Ruta de Express
const backRoutes = require("./routes/routesInmuebles")

//DB config
const db = require("./database/db").mongoURILocal;

//connect to mongodb
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log('Base de datos conectada exitosamente'))
    .catch((err) => console.log(err));

//Configuraciones
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

//
app.use(bodyParser.urlencoded({ extended : false }));

//parser application/json
app.use(bodyParser.json());

//Respuesta a navegador
app.get('/', (req, res) => {
    res.json({
        "Title" : "Hola soy un API REST"
    });
});

//El cors
app.use(cors());

app.use("/APIRESTSHLLC", backRoutes)

//Iniciando servidor
app.listen(app.get('port'), ()=>{
    console.log('Server escuchando por el puerto : ' + app.get('port'));
});

app.use(function(err, req, res, next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});