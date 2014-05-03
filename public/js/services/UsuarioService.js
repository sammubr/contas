angular.module('UsuarioService', []).factory('Usuario', ['$http', function ($http) {

    var fItem = {};

    return {

        getDados: function (pQuery) {
            return $http.get('/api/usuarios', {
                params: pQuery
            });
        },

        persiste: function (item) {
            return $http.post('/api/usuarios', item);
        },

        exclui: function (id) {
            return $http.delete('/api/usuarios/' + id);
        },

        loga: function (usuario) {
            return $http.get('/api/login', {
                params: usuario
            });
        },

        getTitulo: function () {
            return 'Cadastro de usuários';
        },

        getNovoRegistroHref: function () {
            return '/usuarios/item';
        },

        getListaHref: function () {
            return '/usuarios/list';
        },

        getItem: function () {
            return fItem;
        },

        getOrdemInicial: function () {
            return 'nome';
        },

        setItem: function (pItem) {
            fItem = pItem;
            return fItem;
        },

        getQuery: function (pQuery) {
            return $http.get('/api/usuarios', {
                params: { query: pQuery }
            });
        }

    }

}]);
