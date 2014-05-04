var mongoose = require("mongoose");
var Secretaria = require("./secretaria");

var identidadeSchema = mongoose.Schema({
  descricao: { type: String, required: true },
  endereco: { type: String, required: true },
  secretaria: { type: mongoose.Schema.Types.ObjectId, ref: 'Secretaria', required: true }
});

identidadeSchema.post('init', function () {
  if (!this.isNew) {
    this.identidade_original = this.toObject();
  }
  ;
})

identidadeSchema.post('save', function (identidade) {

  if (typeof this.identidade_original === "undefined") {

    //localiza secretaria selecionada e adiciona identidade nela
    Secretaria.findOne({ _id: identidade.secretaria }, function (err, secretaria) {
      if (err) {
        return err;
      } else {
        if (typeof secretaria.identidades === 'undefined') {
          secretaria.identidades = [];
        }
        ;
        if (secretaria.identidades.indexOf(identidade._id) == -1) {
          secretaria.identidades.push(identidade._id);
        }
        ;
        secretaria.save(
          function (err) {
            if (err) {
              return err;
            }
          }
        );
      }
    });


  } else {


    if (this.identidade_original.secretaria.id != identidade.secretaria.id) {

      var teste = this.identidade_original;

      //localiza secretaria antiga e remove identidade dela
      Secretaria.findOne({ _id: teste.secretaria }, function (err, secretaria) {
        if (err || !secretaria) {
          done(err);
        } else {
          indice = secretaria.identidades.indexOf(teste._id);

          if (indice != -1) {
            secretaria.identidades.splice(indice, 1);
          }
          ;

          secretaria.save(
            function (err) {
              if (err) {
                res.send(err);
              }
            }
          );
        }
      });


      //localiza secretaria selecionada e adiciona identidade nela
      Secretaria.findOne({ _id: identidade.secretaria }, function (err, secretaria) {
        if (err) {
          done(err);
        } else {
          if (typeof secretaria.identidades === 'undefined') {
            secretaria.identidades = [];
          }
          ;
          if (secretaria.identidades.indexOf(identidade._id) == -1) {
            secretaria.identidades.push(identidade._id);
          }
          ;
          secretaria.save(
            function (err) {
              if (err) {
                res.send(err);
              }
            }
          );
        }
      });
    }
  }

})


identidadeSchema.post('remove', function (identidade) {

  //localiza secretaria e remove identidade dela
  Secretaria.findOne({ _id: identidade.secretaria }, function (err, secretaria) {
    if (err || !secretaria) {
      return err;
    } else {
      indice = secretaria.identidades.indexOf(identidade._id);

      if (indice != -1) {
        secretaria.identidades.splice(indice, 1);
      }
      ;

      secretaria.save(
        function (err) {
          if (err) {
            return err;
          }
        }
      );
    }
  });

})


module.exports = mongoose.model('Identidade', identidadeSchema);