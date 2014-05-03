var mongoose = require('mongoose');

var identidadeSchema = mongoose.Schema({
    descricao: String,
    endereco: String
});

module.exports = mongoose.model('Identidade', identidadeSchema);
