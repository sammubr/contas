angular.module('LoginService', []).factory('Login', function ($cookieStore) {

    return {
        getUsuario: function () {
            var usuario = $cookieStore.get('usuario');
            if (typeof usuario === "undefined") {
                usuario = '';
            }
            return usuario;
        },

        setUsuario: function (pUsuario) {
            $cookieStore.put('usuario', pUsuario);
        },

        logoff: function () {
            $cookieStore.remove('usuario');
        },

        isLogged: function () {
            return ((this.getUsuario() != ''));
        }

    }

});
