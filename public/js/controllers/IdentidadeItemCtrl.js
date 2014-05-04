angular.module('IdentidadeItemCtrl', []).controller('IdentidadeItemController', function ($scope, $log, $location, Identidade, Secretaria) {

  var Persistencia = Identidade;

  $scope.alerts = [];
  $scope.titulo = Persistencia.getTitulo();
  $scope.item = Persistencia.getItem();
  $scope.listaHref = Persistencia.getListaHref();

  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };

  Secretaria.getDados().success(function (lista) {
    $scope.secretarias = lista;
    $log.info('Lista de secretarias obtida com sucesso.');
  });

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