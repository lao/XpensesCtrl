(function () {
    'use strict';

    angular
        .module('XpensesCtrlApp')
        .factory('AuthenticationService', AuthenticationService);

    function AuthenticationService($window, $auth, $location, $rootScope) {

        return {
            logout: function () {
                $auth.logout();
                $location.path('/');
                $window.localStorage.removeItem('user');
                $rootScope.currentUser = null;
            }
        };

    }

})();