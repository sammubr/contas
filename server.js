var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var port = process.env.PORT || 8080;
mongoose.connect(db.url);

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use('/', express.static(__dirname + '/public'));
    app.use('/', morgan());
    app.use('/', bodyParser());
    app.use('/', function (req, res, next) {
        console.log(req.body); // populated!
        next();
    });
    app.use('/', methodOverride());
    app.use(function errorHandler(err, req, res, next) {
        res.status(500);
        res.render('error', { error: err });
    });

}

require('./app/routes')(app);

app.listen(port);
console.log('Esperando conexões na porta ' + port + '...');

exports = module.exports = app;