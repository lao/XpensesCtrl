(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('HeaderController', HeaderController);

    function HeaderController(AuthenticationService) {

        var self = this;

        self.logout = function () {
            AuthenticationService.logout();
        }

    }

})();