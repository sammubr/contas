angular.module('SecretariaService', []).factory('Secretaria', ['$http', function ($http) {

    var fItem = {};

    fItem.identidades = [];

    return {

        getDados: function (pQuery) {
            return $http.get('/api/secretarias', {
                params: pQuery
            });
        },

        persiste: function (item) {
            return $http.post('/api/secretarias', item);
        },

        exclui: function (id) {
            return $http.delete('/api/secretarias/' + id);
        },

        getTitulo: function () {
            return 'Cadastro de secretarias';
        },

        getNovoRegistroHref: function () {
            return '/secretarias/item';
        },

        getListaHref: function () {
            return '/secretarias/list';
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
            return $http.get('/api/secretarias', {
                params: { query: pQuery }
            });
        }

    }

}]);