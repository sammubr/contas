/**
 * Created by samuel on 18/04/14.
 */
angular.module('appRoutes', [])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
      })

      .when('/usuarios/list', {
        templateUrl: 'views/usuario/list.html',
        controller: 'UsuarioListController'
      })

      .when('/usuarios/item', {
        templateUrl: 'views/usuario/item.html',
        controller: 'UsuarioItemController'
      })

      .when('/secretarias/list', {
        templateUrl: 'views/secretaria/list.html',
        controller: 'SecretariaListController'
      })
      .when('/secretarias/item', {
        templateUrl: 'views/secretaria/item.html',
        controller: 'SecretariaItemController'
      })
      .when('/identidades/list', {
        templateUrl: 'views/identidade/list.html',
        controller: 'IdentidadeListController'
      })
      .when('/identidades/item', {
        templateUrl: 'views/identidade/item.html',
        controller: 'IdentidadeItemController'
      })



      .when('/contas/list', {
        templateUrl: 'views/conta/list.html',
        controller: 'ContaListController'
      })
      .when('/contas/item', {
        templateUrl: 'views/conta/item.html',
        controller: 'ContaItemController'
      })



      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })

      .when('/relatorio1', {
        templateUrl: 'views/relatorio1.html',
        controller: 'Relatorio1Controller'
      });


    $locationProvider.html5Mode(true);


  }])

  .run(function ($rootScope, $location, Login) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      if (!Login.isLogged()) {
        $location.path('/login');
      }
    });
  });