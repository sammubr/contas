var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var secretariaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  identidades: [
    { type: Schema.Types.ObjectId, ref: 'Identidade' }
  ]
});

secretariaSchema.pre('remove', function (next) {

    if ((typeof this.identidades !== "undefined") && (this.identidades.length > 0)) {
      err = new Error('Não é possivel excluir pois existem identidades vinculadas');
      next(err);
    } else {
      next();
    }

  }
)

module.exports = mongoose.model('Secretaria', secretariaSchema);
