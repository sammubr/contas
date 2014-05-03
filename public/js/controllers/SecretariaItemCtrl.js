angular.module('SecretariaItemCtrl', []).controller('SecretariaItemController', function ($scope, $log, Secretaria, $location) {

    var Persistencia = Secretaria;

    $scope.titulo = Persistencia.getTitulo();
    $scope.item = Persistencia.getItem();
    $scope.alerts = [];
    $scope.listaHref = Persistencia.getListaHref();

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.salva = function () {

        if (typeof $scope.item.identidades === 'undefined'){
            $scope.item.identidades = [];
        }
        $scope.item.identidades.push({ descricao: 'teste2', endereco: 'endereco2'});
        Persistencia.persiste($scope.item)
            .success(function () {
                $log.info('Item inserido com sucesso.');
                $location.path($scope.listaHref);
            })
            .error(function (err) {
                $scope.alerts[0] = {type: 'danger', msg: "Erro ao inserir item: " + err.message};
                $log.info('Erro ao inserir item: ' + err.message);
            });
    };


});