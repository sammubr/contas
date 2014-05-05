var mongoose = require("mongoose");
var Identidade = require("./identidade");

var contaSchema = mongoose.Schema({

  identidade : { type: mongoose.Schema.Types.ObjectId, ref: 'Identidade', required: true },
  competencia: {
    ano: { type: Number, required: true },
    mes: { type: Number, required: true }
  },
  valor      : { type: Number, required: true },
  vencimento : { type: Date, required: true },
  observacao : { type: String }

});

module.exports = mongoose.model('Conta', contaSchema);