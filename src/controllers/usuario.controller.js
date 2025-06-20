const usuarioService = require('../services/usuario.service')
const { validationResult } = require('express-validator')
const createError = require('http-errors')

const create = async function(req, res, next) {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            throw(createError(422,{ errors: errors.array() }))
        }

        const response = await usuarioService.create(req.body);
        if (response && response.message){
            throw response;
        }
        res.send(response);
    } catch (error){
        return next(error);
    }
    
}

const encontrarTodos = async function(req, res, next) {
    try {
        const response = await usuarioService.encontrarTodos();
        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const encontrarPorId = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            throw createError(422, { errors: errors.array() });
        }

        const response = await usuarioService.encontrarPorId(req.params.id);

        if (response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error)
    }

    
}


const deletarPorId = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            throw createError(422, { errors: errors.array() });
        }

        const response = await usuarioService.deletarPorId(req.params.id);

        if (response && response.message === 'Usuário não encontrado'){
            throw createError(404, response.message);
        }

        res.status(200).json({ message: response.message });
    } catch (error) {
        next(error);
    }
};


const trocarSenha = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() });
        }

        const { id } = req.params;
        const { senhaAtual, novaSenha } = req.body;

        const response = await usuarioService.trocarSenha(id, senhaAtual, novaSenha);

        if (response && response.message) {
            return res.status(200).json(response);
        }

        throw createError(400, 'Erro ao trocar a senha');

    } catch (error) {
        next(error);
    }
};



module.exports = {
    create: create,
    encontrarTodos: encontrarTodos,
    encontrarPorId: encontrarPorId,
    deletarPorId : deletarPorId,
    trocarSenha:trocarSenha
}