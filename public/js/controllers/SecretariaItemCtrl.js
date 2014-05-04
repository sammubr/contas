angular.module('SecretariaItemCtrl', []).controller('SecretariaItemController', function ($scope, $log, Secretaria, $location) {

  var Persistencia = Secretaria;

  $scope.alerts = [];
  $scope.titulo = Persistencia.getTitulo();
  $scope.item = Persistencia.getItem();
  $scope.listaHref = Persistencia.getListaHref();

  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.salva = function () {

    Persistencia.persiste($scope.item)
      .success(function () {
        $log.info('Item salvo com sucesso.');
        $location.path($scope.listaHref);
      })
      .error(function (err) {
        $scope.alerts[0] = {type: 'danger', msg: "Erro ao salvar item: " + err.message};
        $log.info('Erro ao salvar item: ' + err.message);
      });
  };


});