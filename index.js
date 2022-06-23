//Importación de dependencias
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = "secret";
const { getUsuarios, nuevoUsuario, editarUsuario, eliminarUsuario } = require("./consultas")

// Conexión al servidor
app.listen(3000, () => console.log("Servidor encendido"));


// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); //para recibir la carga de imagenes del servidor  a traves de formulario html
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use('/css', express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(expressFileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: "Login.html El tamaño de la imagen supera el limite permitido",
}));

app.set('view engine', 'handlebars');

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
);


// rutas



app.get('/', async(req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.render('index', { usuarios });
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal... ${error}`,
            code: 500
        })
    };
});



app.get('/admin', async(req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.render('Admin', { usuarios });
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal... ${error}`,
            code: 500
        })
    };
});





app.get('/registro', async(req, res) => {
    res.render('Registro');
});









app.post("/registrar", async(req, res) => {
    const { email, nombre, password, experiencia, especialidad } = req.body;
    try {
        const usuario = await nuevoUsuario(email, nombre, password, experiencia, especialidad)
        res.status(201).redirect('/');
        res.render('Registro')
    } catch (error) {
        res.status(500).send({
            error: `Algo salió mal... ${error}`,
            code: 500
        })

    }

})

app.get('/login', (req, res) => {
    res.render('Login');
});




app.get('/datos', (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        const { data } = decoded;

        error ? res.status(401).send(
                res.send({
                    message: "Usted no esta autorizado para estar aqui",
                    token_error: error.message
                })
            ) :
            res.render('Datos', { data });
    });
});





app.put('/usuario', async(req, res) => {
    const { id } = req.query;
    try {
        await editarUsuario(id, req.body);
        res.status(200).send(JSON.stringify({ message: 'Usuario modificado con exito' }));
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
});






app.delete('/usuario', async(req, res) => {
    const { id } = req.query;
    try {
        await eliminarUsuario(id);
        res.status(200).send(JSON.stringify({ message: 'Usuario eliminado con exito' }));
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
});