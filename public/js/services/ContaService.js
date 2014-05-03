/**
 * Created by samuel on 18/04/14.
 */
angular.module('ContaService', []).factory('Conta', ['$http', function ($http) {

    return {
        // call to get all nerds
        get: function () {
            return $http.get('/api/contas');
        },

        // call to POST and create a new nerd
        create: function (contaData) {
            return $http.post('/api/contas', contaData);
        },

        // call to DELETE a nerd
        delete: function (id) {
            return $http.delete('/api/contas/' + id);
        }
    }

}]);
