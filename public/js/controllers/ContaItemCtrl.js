angular.module('ContaItemCtrl', []).controller('ContaItemController', function ($scope, $log, $location, Conta, Identidade) {

    var Persistencia = Conta;

    $scope.alerts = [];
    $scope.titulo = Persistencia.getTitulo();
    $scope.item = Persistencia.getItem();
    $scope.listaHref = Persistencia.getListaHref();

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    Identidade.getDados().success(function (lista) {
      $scope.identidades = lista;
      $log.info('Lista de identidades obtida com sucesso.');
    });

    $scope.salva = function () {
      Persistencia.persiste($scope.item).success(function () {
        $log.info('Item salvo com sucesso.');
        $location.path($scope.listaHref);
      }).error(function (err) {
        $scope.alerts[0] = {type: 'danger', msg: "Erro ao salvar item: " + err};
        $log.info('Erro ao salvar item: ' + err);
      });
    };


  });
