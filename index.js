//Importación de dependencias
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = "Shhhh";
const {} = require("./consultas")

// Conexión al servidor
app.listen(3000, () => console.log("Servidor encendido"));


// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); //para recibir la carga de imagenes del servidor  a traves de formulario html
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
    expressFileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: "Login.htmlEl tamaño de la imagen supera el limite permitido",
    })
);

app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
);

app.set('view engine', 'handlebars');

// Disponibiliza ruta raiz
app.get('/', (req, res) => {
    res.render('Home')
});