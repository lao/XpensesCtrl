(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('SignupController', SignupController);

    function SignupController($location, ApiService) {

        var self = this;

        self.signup = function () {
            ApiService.user
                .create(self.user)
                .then(function () {
                    $location.path('/');
                });

        };

    }

})();