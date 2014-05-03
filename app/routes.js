var Usuario = require('./models/usuario');
var Secretaria = require('./models/secretaria');
var Identidade = require('./models/identidade');

module.exports = function (app) {


    app.get('/api/contas', function (req, res) {
        // use mongoose to get all nerds in the database
        Conta.find(function (err, contas) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(contas); // return all nerds in JSON format
        });
    });


//--------------------------------------------------------------------------------------------------------------------- LOGIN

    app.get('/api/login', function (req, res) {

//        usuario = new Usuario();

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Usuario.findOne({ nome: req.query.nome }, function (err, usuario) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // if no user is found, return the message
            if (!usuario || ( !usuario.validPassword(req.query.senha) )) {
                res.send(401, null);
            } else {
                // all is well, return successful user
                res.json(usuario); // return all nerds in JSON format
            }

        });

    });


//--------------------------------------------------------------------------------------------------------------------- USUARIOS

    app.get('/api/usuarios', function (req, res) {

        Usuario.find(req.query, function (err, usuarios) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(usuarios); // return all nerds in JSON format
        });

    });

// create usuario and send back all todos after creation
    app.post('/api/usuarios', function (req, res) {

            if (typeof req.body._id === 'undefined') {

                var usuario = new Usuario(req.body);

                usuario.senha = usuario.generateHash(usuario.senha);

                usuario.save(
                    function (err) {
                        if (err)
                            res.send(err);

                        // get and return all the todos after you create another
                        Usuario.find(function (err, usuarios) {
                            if (err)
                                res.send(err);
                            res.json(usuarios);
                        });
                    }
                );

            } else {

                return Usuario.findById(req.body._id, function (err, usuario) {
                    if (err)
                        res.send(err);

                    if (!usuario.validPassword(req.body.senhaAtual)) {
                        res.send(401, 'Senha atual incorreta.');
                    } else {

                        usuario.nome = req.body.nome;
                        if (req.body.novaSenha != '') {
                            usuario.senha = usuario.generateHash(req.body.novaSenha);
                        }
                        usuario.save(function (err) {
                            if (err)
                                res.send(err);
                            // get and return all the todos after you create another
                            Usuario.find(function (err, usuarios) {
                                if (err)
                                    res.send(err);
                                res.json(usuarios);
                            });
                        });

                    }


                });
            }
        }
    );

// delete a usuario
    app.delete('/api/usuarios/:usuario_id', function (req, res) {
        Usuario.remove({
            _id: req.params.usuario_id
        }, function (err) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Usuario.find(function (err, usuarios) {
                if (err)
                    res.send(err);
                res.json(usuarios);
            });
        });
    });

//--------------------------------------------------------------------------------------------------------------------- SECRETARIAS

    app.get('/api/secretarias', function (req, res) {
        Secretaria.find(req.query, function (err, secretarias) {
            if (err)
                res.send(err);
            res.json(secretarias);
        });
    });

    app.post('/api/secretarias', function (req, res) {

            if (typeof req.body._id === 'undefined') {

                var secretaria = new Secretaria(req.body);

                secretaria.save(function (err) {
                    if (err) {
                        res.send(500, err)
                    } else {
                        Secretaria.find(function (err, secretarias) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json(secretarias);
                            }
                        });
                    }
                });


            } else {

                return Secretaria.findById(req.body._id, function (err, secretaria) {
                    if (err)
                        res.send(err);

                    secretaria.nome = req.body.nome;
                    secretaria.identidades = req.body.identidades;

                    secretaria.save(function (err) {
                        if (err)
                            res.send(err);
                        // get and return all the todos after you create another
                        Secretaria.find(function (err, secretarias) {
                            if (err)
                                res.send(err);
                            res.json(secretarias);
                        });
                    });


                });
            }
        }
    );

    app.delete('/api/secretarias/:secretaria_id', function (req, res) {
        Secretaria.remove({
            _id: req.params.secretaria_id
        }, function (err) {

            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Secretaria.find(function (err, secretarias) {
                if (err)
                    res.send(err);
                res.json(secretarias);
            });
        });
    });


    //--------------------------------------------------------------------------------------------------------------------- IDENTIDADES

    app.get('/api/identidades', function (req, res) {
        Identidade.find(req.query, function (err, identidades) {
            if (err)
                res.send(err);
            res.json(identidades);
        });
    });

    app.post('/api/identidades', function (req, res) {

            if (typeof req.body._id === 'undefined') {

                var identidade = new Identidade(req.body);
                identidade.save(
                    function (err) {
                        if (err)
                            res.send(err);

                        // get and return all the todos after you create another
                        Identidade.find(function (err, identidades) {
                            if (err)
                                res.send(err);
                            res.json(identidades);
                        });
                    }
                );

            } else {

                return Identidade.findById(req.body._id, function (err, identidade) {
                    if (err)
                        res.send(err);

                    identidade.descricao = req.body.descricao;

                    identidade.save(function (err) {
                        if (err)
                            res.send(err);
                        // get and return all the todos after you create another
                        Identidade.find(function (err, identidades) {
                            if (err)
                                res.send(err);
                            res.json(identidades);
                        });
                    });


                });
            }
        }
    );

    app.delete('/api/identidades/:identidade_id', function (req, res) {
        Identidade.remove({
            _id: req.params.identidade_id
        }, function (err) {

            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Identidade.find(function (err, identidades) {
                if (err)
                    res.send(err);
                res.json(identidades);
            });
        });
    });


// frontend routes =========================================================
// route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/views/index.html file
    });

};