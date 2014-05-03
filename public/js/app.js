/**
 * Created by samuel on 18/04/14.
 */
angular.module('sampleApp', ['ngRoute', 'appRoutes', 'ngCookies',

    'MainCtrl', 'MenuCtrl',
    'LoginCtrl', 'LoginService',

    'UsuarioService', 'UsuarioListCtrl', 'UsuarioItemCtrl',
    'SecretariaService', 'SecretariaListCtrl', 'SecretariaItemCtrl',
    'IdentidadeService', 'IdentidadeListCtrl', 'IdentidadeItemCtrl',


    'ModalInstanceCtrl',
    'Relatorio1Ctrl', 'Relatorio1Service',
    'ContaCtrl', 'ContaService',

    'ui.bootstrap']);
