const usuarioRepository = require('../repositories/usuario.repository')
const createError = require('http-errors')
require('dotenv').config();
const bcrypt = require('bcrypt');

const create = async function(usuario) {
    existeUsuario = await usuarioRepository.encontrarPorWhere({ email: usuario.email });

    if (existeUsuario) {
        return createError(409, 'Usuário já existe');
    }

    usuario.senha = await bcrypt.hash(usuario.senha, parseInt(process.env.SALT))
    const usuarioCriado = await usuarioRepository.create(usuario);
    return usuarioCriado;
}

const encontrarTodos = async function() {
    const usuarios = await usuarioRepository.encontrarTodos();
    return usuarios;
}

const encontrarPorId = async function(id) {
    const usuario = await usuarioRepository.encontrarPorId(id);

    if (!usuario){
        return createError(404, 'Usuário não encontrado');
    }

    return usuario;
}

const deletarPorId = async function(id) {
    const resultado = await usuarioRepository.deletarPorId(id);

    if (resultado === 0) {
        return { message: 'Usuário não encontrado' };
    }

    return { message: 'Usuário deletado com sucesso' };
};


const trocarSenha = async (id, senhaAtual, novaSenha) => {
    const usuario = await usuarioRepository.encontrarPorId(id);

    if (!usuario) {
        return { message: 'Usuário não encontrado' };
    }

    // Verifica se a senha atual confere
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
        return { message: 'Senha atual incorreta' };
    }

    // Criptografa a nova senha
    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha
    await usuarioRepository.atualizar({ senha: novaSenhaHash }, id);

    return { message: 'Senha alterada com sucesso' };
};


module.exports = {
    create: create,
    encontrarTodos: encontrarTodos,
    encontrarPorId: encontrarPorId,
    deletarPorId: deletarPorId,
    trocarSenha:trocarSenha
}