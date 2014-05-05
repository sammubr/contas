angular.module('MenuCtrl', []).controller('MenuController', function ($scope, Login) {

  $scope.usuario = Login.getUsuario();
  $scope.mainMenu = [];

  var menuCadastro = {nome: 'Cadastros', link: '#', subMenu: []};

  if ($scope.usuario.nome == 'admin') {
    menuCadastro.subMenu.push({nome: 'Usuários', link: '/usuarios/list'});
  }

  menuCadastro.subMenu.push({nome: 'Secretarias', link: '/secretarias/list'});
  menuCadastro.subMenu.push({nome: 'Identidades', link: '/identidades/list'});
  menuCadastro.subMenu.push({nome: 'Contas', link: '/contas/list'});


  //    menuCadastro.subMenu.push({nome: 'Contas', link: '/contas'});

  var menuRelatorios = {nome: 'Relatórios', link: '#', subMenu: []};
  menuRelatorios.subMenu.push({nome: 'Relatório 1', link: '/relatorio1'});
  menuRelatorios.subMenu.push({nome: 'Relatório 2', link: '/relatorio2'});
  menuRelatorios.subMenu.push({nome: 'Relatório 3', link: '/relatorio3'});

  $scope.mainMenu.push(menuCadastro);
  $scope.mainMenu.push(menuRelatorios);

});
