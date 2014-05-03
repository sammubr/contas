angular.module('UsuarioItemCtrl', []).controller('UsuarioItemController', function ($scope, $log, Usuario, $location) {

    var Persistencia = Usuario;

    $scope.titulo = Persistencia.getTitulo();
    $scope.item = Persistencia.getItem();
    $scope.item.senha = '';
    $scope.item.novaSenha = '';
    $scope.itemNovo = ( typeof $scope.item._id === "undefined" );
    $scope.alerts = [];
    $scope.listaHref = Persistencia.getListaHref();

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.salva = function () {
        Persistencia.persiste($scope.item)
            .success(function () {
                $log.info('Item inserido com sucesso.');
                $location.path($scope.listaHref);
            })
            .error(function (err) {
                $scope.alerts[0] = {type: 'danger', msg: "Erro ao item usuário: " + err};
                $log.info('Erro ao inserir item: ' + err);
            });
    };


});



