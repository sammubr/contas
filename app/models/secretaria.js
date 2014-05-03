var mongoose = require('mongoose');

var identidadeSchema = mongoose.Schema({
    descricao: String,
    endereco: String
});

var secretariaSchema = mongoose.Schema({
    nome: String,
    identidades: [ identidadeSchema ]
});

module.exports = mongoose.model('Secretaria', secretariaSchema);
