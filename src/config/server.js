require('dotenv').config();
const cors = require('cors');

const handle404Error = require('../middlewares/handle404Error')
const handleError = require('../middlewares/handleError');

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

const usuarioRoute = require('../routes/usuario.route');
server.use(cors());  

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use('/api/usuarios/', usuarioRoute)
server.use(handle404Error);
server.use(handleError);

server.listen(process.env.PORTA, function() {
    console.log(`BACKEND rodando na porta ${process.env.PORTA}...`)
})
