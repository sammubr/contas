angular.module('IdentidadeService', []).factory('Identidade', ['$http', function ($http) {

    var fItem = {};

    return {

        getDados: function (pQuery) {
            return $http.get('/api/identidades', {
                params: pQuery
            });
        },

        persiste: function (item) {
            return $http.post('/api/identidades', item);
        },

        exclui: function (id) {
            return $http.delete('/api/identidades/' + id);
        },

        getTitulo: function () {
            return 'Cadastro de identidades';
        },

        getNovoRegistroHref: function () {
            return '/identidades/item';
        },

        getListaHref: function () {
            return '/identidades/list';
        },

        getItem: function () {
            return fItem;
        },

        getOrdemInicial: function () {
            return 'nossoNumero';
        },

        setItem: function (pItem) {
            fItem = pItem;
            return fItem;
        },

        getQuery: function (pQuery) {
            return $http.get('/api/identidades', {
                params: { query: pQuery }
            });
        }

    }

}]);