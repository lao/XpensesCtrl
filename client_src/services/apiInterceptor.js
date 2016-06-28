(function () {
    'use strict';

    angular
        .module('XpensesCtrlApp')
        .factory('ApiInterceptor', ApiInterceptor);

    function ApiInterceptor($q, $rootScope, $log, EVENTS) {

        return {
            responseError: function (response, error) {

                //Unauthorized
                if (response.status === 401) {
                    $rootScope.$emit(EVENTS.UNAUTHORIZED_REQUEST);

                } else {
                    $log.error(error);
                }

                return $q.reject(response);

            }
        };

    }

})();