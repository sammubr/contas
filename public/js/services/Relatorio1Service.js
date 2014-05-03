/**
 * Created by samuel on 18/04/14.
 */
angular.module('Relatorio1Service', []).factory('Relatorio1', ['$http', function ($http) {

    return {
        // call to get all nerds
        get: function () {
            return $http.get('/api/relatorio1');
        },

        // call to POST and create a new geek
        create: function (relatorio1Data) {
            return $http.post('/api/relatorio1', relatorio1Data);
        },

        // call to DELETE a geek
        delete: function (id) {
            return $http.delete('/api/relatorio1/' + id);
        }
    }

}]);
