(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('LoginController', LoginController);

    function LoginController($auth, $location) {

        var self = this;

        self.errorMsg = null;
        self.changed = true;

        self.login = function () {
            self.changed = false;
            $auth
                .login({ username: self.user.username, password: self.user.password })
                .then(function (response) {
                    $auth.setToken(response);
                    $location.path('/dashboard');
                })
                .catch(function (response) {
                    self.errorMsg = response.data.msg;
                })
        }

    }

})();