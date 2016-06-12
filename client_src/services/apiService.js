(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .factory('ApiService', ApiService);

    //-
    var BASE_URL = 'http://localhost:3000';

    function ApiService($http, $mdToast, $log) {

        return {
            user: {
                create: userCreate
            },
            entry: {
                create: entryCreate
            }
        };

        function entryCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/entry',
                data: data
            })
                .catch(function (error) {
                    $log.error(error);
                    _showErrorToast();
                    throw error;
                });
        }

        function userCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/user',
                data: data
            })
                .catch(function (error) {
                    $log.error(error);
                    _showErrorToast();
                    throw error;
                });
        }

        //TODO: Create default error handler function on $http provider
        function _showErrorToast(text) {
            text = text || 'Unknow Error';
            $mdToast.show($mdToast.simple().textContent(text));
        }

    }

})();