/**
 * Created by samuel on 18/04/14.
 */
angular.module('sampleApp', ['ngRoute', 'appRoutes', 'ngCookies',

  'MainCtrl', 'MenuCtrl',
  'LoginCtrl', 'LoginService',

  'UsuarioService', 'UsuarioListCtrl', 'UsuarioItemCtrl',
  'SecretariaService', 'SecretariaListCtrl', 'SecretariaItemCtrl',
  'IdentidadeService', 'IdentidadeListCtrl', 'IdentidadeItemCtrl',

  'ContaService', 'ContaListCtrl', 'ContaItemCtrl',

  'ModalInstanceCtrl',
  'Relatorio1Ctrl', 'Relatorio1Service',

  'ui.bootstrap']);
