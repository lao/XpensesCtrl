(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .service('ApiService', ApiService);

    //-
    var BASE_URL = 'http://localhost:3000';

    function ApiService($http, $mdToast, $log) {

        var self = this;

        self.user = {
            create: userCreate
        };

        function userCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/create',
                data: data
            })
                .catch(function (error) {
                    $log.error(error);
                    showErrorToast();
                    throw error;
                });
        }

        function showErrorToast(text) {
            text = text || 'Unknow Error';
            $mdToast.show($mdToast.simple().textContent(text));
        }

    }

})();