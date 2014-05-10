angular.module('ContaListCtrl', []).controller('ContaListController', function ($scope, $filter, $log, Conta, Identidade) {

  var Persistencia = Conta;

  $scope.alerts = [];
  $scope.itensSelecionados = [];
  $scope.selecionaTodos = false;
  $scope.titulo = Persistencia.getTitulo();
  $scope.ordem = Persistencia.getOrdemInicial();
  $scope.novoRegistroHref = Persistencia.getNovoRegistroHref();


  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };

  Persistencia.getDados().success(function (lista) {
    Identidade.getDados().success(function (identidades) {
      lista.forEach(function (item) {
        var identidadesFiltrada = identidades.filter(function (identidade) {
          return identidade._id == item.identidade
        });
        item.nossoNumero = identidadesFiltrada[0].nossoNumero;
        item.descricao = identidadesFiltrada[0].descricao;
        item.vencimento = $filter('date')(item.vencimento,'shortDate');
      });
      $scope.itens = lista;
      $log.info('Lista obtida com sucesso.');
    });
  });

  $scope.criaItem = function () {
    Persistencia.setItem({});
  };

  $scope.editaItem = function (item) {
    Persistencia.setItem(item);
  };

  $scope.excluiItem = function (item) {
    Persistencia.exclui(item._id).success(function (listaRetornada) {
      $scope.itens = listaRetornada;
      $scope.alerts[0] = {type: 'success', msg: 'Item excluído com sucesso.'};
      $log.info('Item excluído com sucesso.');
    }).error(function (err) {
      $scope.alerts[0] = {type: 'danger', msg: "Erro ao excluir item: " + err};
      $log.info('Erro ao excluir item.');
      $log.info('Erro: ' + err);
    });
  };

  $scope.selecionaItem = function (item) {
    if (item.checked) {
      $scope.itensSelecionados.push(item);
    } else {
      var i = $scope.itensSelecionados.indexOf(item);
      if (i != -1) {
        $scope.itensSelecionados.splice(i, 1);
      }
    }
    $scope.selecionaTodos = ( $scope.itensSelecionados.length == $scope.itens.length );
  };

  $scope.selecionaTodosItens = function (selecionaTodos) {
    for (i = 0; i < $scope.itens.length; i++) {
      $scope.itens[i].checked = selecionaTodos;
      $scope.selecionaItem($scope.itens[i]);
    }
  };

  $scope.itemSelecionado = function (item) {
    if (item.checked) {
      return 'active'
    }
  };

  $scope.excluiItensSelecionados = function () {
    for (i = 0; i < $scope.itensSelecionados.length; i++) {
      $scope.excluiItem($scope.itensSelecionados[i]);
    }
  };

  $scope.colunaSelecionada = function (column) {
    return column == $scope.ordem && 'sort-' + $scope.reverse;
  };
});