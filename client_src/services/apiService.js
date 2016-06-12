(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .factory('ApiService', ApiService);

    //-
    var BASE_URL = 'http://localhost:3000';

    function ApiService($http) {

        return {
            user: {
                /**
                 *  Create new user - signup
                 *
                 * @param data
                 * @returns {Promise}
                 */
                create: userCreate
            },
            entry: {
                /**
                 * Create new entry
                 *
                 * @param data
                 * @returns {Promise}
                 */
                create: entryCreate,
                /**
                 * Delete entry by id
                 *
                 * @param data
                 * @returns {Promise}
                 */
                remove: entryRemove,
                getAll: entryGetAll
            }
        };

        function entryGetAll() {
            return $http({
                method: 'GET',
                url: BASE_URL + '/entry'
            });
        }

        function entryRemove(id) {
            return $http({
                method: 'DELETE',
                url: BASE_URL + '/entry/' + id
            });
        }

        function entryCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/entry',
                data: data
            });
        }

        function userCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/user',
                data: data
            });
        }

    }

})();