// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var usuarioSchema = mongoose.Schema({
    nome: String,
    senha: String
});

// methods ======================
// generating a hash
usuarioSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.senha);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Usuario', usuarioSchema);
