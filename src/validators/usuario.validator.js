const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const create = function (){
    return[
        body('nome',validatorMessage('Nome')).exists().bail().isString(),
        body('email',validatorMessage('Email')).exists().bail().isString(),
        body('senha',validatorMessage('Senha')).exists().bail().isString(),
    ]
}

const encontrarPorId = function() {
    return [
        param('id',validatorMessage('Id')).exists().bail().isInt(),
    ]
}

const deletarPorId = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
    ]
}


const trocarSenha = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
        body('senhaAtual', validatorMessage('Senha Atual')).exists().bail().isString().isLength({ min: 6 }),
        body('novaSenha', validatorMessage('Nova Senha')).exists().bail().isString().isLength({ min: 6 }),
    ];
};


module.exports = {
    create: create,
    encontrarPorId: encontrarPorId,
    deletarPorId:deletarPorId,
    trocarSenha:trocarSenha
};