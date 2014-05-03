angular.module('IdentidadeItemCtrl', []).controller('IdentidadeItemController', function ($scope, $log, Identidade, $location) {

    var Persistencia = Identidade;

    $scope.titulo = Persistencia.getTitulo();
    $scope.item = Persistencia.getItem();
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
                $scope.alerts[0] = {type: 'danger', msg: "Erro ao inserir item: " + err};
                $log.info('Erro ao inserir item: ' + err);
            });
    };


});