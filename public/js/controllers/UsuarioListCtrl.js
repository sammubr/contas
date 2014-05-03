angular.module('UsuarioListCtrl', []).controller('UsuarioListController', function ($scope, $filter, $log, Usuario) {

    var Persistencia = Usuario;

    $scope.itensSelecionados = [];
    $scope.selecionaTodos = false;
    $scope.titulo = Persistencia.getTitulo();
    $scope.ordem = Persistencia.getOrdemInicial();
    $scope.novoRegistroHref = Persistencia.getNovoRegistroHref();

    Persistencia.getDados().success(function (lista) {
        $scope.itens = lista;
        $log.info('Lista obtida com sucesso.');
    });

    $scope.criaItem = function () {
        Persistencia.setItem({});
    };

    $scope.editaItem = function (item) {
        Persistencia.setItem(item);
    };

    $scope.excluiItem = function (item) {
        Persistencia.exclui(item._id)
            .success(function (listaRetornada) {
                $scope.itens = listaRetornada;
                $log.info('Item excluído com sucesso.');
            })
            .error(function (erro) {
                $log.info('Erro ao excluir item.');
                $log.info('Erro: ' + erro);
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



