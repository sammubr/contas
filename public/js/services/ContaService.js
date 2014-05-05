angular.module('ContaService', []).factory('Conta', ['$http', function ($http) {

  var fItem = {};

  return {

    getDados: function (pQuery) {
      return $http.get('/api/contas', {
        params: pQuery
      });
    },

    persiste: function (item) {
      return $http.post('/api/contas', item);
    },

    exclui: function (id) {
      return $http.delete('/api/contas/' + id);
    },

    getTitulo: function () {
      return 'Cadastro de contas';
    },

    getNovoRegistroHref: function () {
      return '/contas/item';
    },

    getListaHref: function () {
      return '/contas/list';
    },

    getItem: function () {
      return fItem;
    },

    getOrdemInicial: function () {
      return 'competencia.ano';
    },

    setItem: function (pItem) {
      fItem = pItem;
      return fItem;
    },

    getQuery: function (pQuery) {
      return $http.get('/api/contas', {
        params: { query: pQuery }
      });
    }

  }

}]);