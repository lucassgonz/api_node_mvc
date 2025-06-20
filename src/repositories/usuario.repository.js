const db = require('../database/models/index')
const { Usuario } = require('../database/models/index')

const create = async function(usuario) {
    const usuarioCriado = await Usuario.create(usuario)
    return usuarioCriado;
}

const atualizar = async function(dados, id) {
    const [linhasAfetadas] = await Usuario.update(dados, {
        where: { id }
    });
    return linhasAfetadas; 
};


const encontrarTodos = async function() {
    const usuarios = await Usuario.findAll()
    return usuarios;
}

const encontrarPorId = async function(id) {
    const usuario = await Usuario.findByPk(id)
    return usuario;
}


const encontrarPorWhere = async function(where) {
    const usuario = await Usuario.findOne({
        where: where
    });
    return usuario;
}

const deletarPorId = async function(id) {
    const usuarioDeletado = await Usuario.destroy({
        where: { id: id }
    });
    return usuarioDeletado;
};


module.exports = {
    create: create,
    atualizar: atualizar,
    encontrarTodos: encontrarTodos,
    encontrarPorId: encontrarPorId,
    encontrarPorWhere: encontrarPorWhere,
    deletarPorId:deletarPorId
}