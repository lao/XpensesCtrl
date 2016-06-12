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
                create: userCreate
            },
            category: {
                getAll: categoryGetAll,
                remove: categoryRemove
            },
            entry: {
                create: entryCreate,
                remove: entryRemove,
                getAll: entryGetAll
            }
        };

        /**
         *
         *
         * @returns {Promise}
         */
        function categoryRemove(id) {
            return $http({
                method: 'DELETE',
                url: BASE_URL + '/category/' + id
            });
        }

        /**
         * Get all user categories
         *
         * @returns {Promise}
         */
        function categoryGetAll() {
            return $http({
                method: 'GET',
                url: BASE_URL + '/category'
            });
        }

        /**
         * Get all user entries
         *
         * @returns {Promise}
         */
        function entryGetAll() {
            return $http({
                method: 'GET',
                url: BASE_URL + '/entry'
            });
        }

        /**
         * Delete entry by id
         *
         * @param id
         * @returns {Promise}
         */
        function entryRemove(id) {
            return $http({
                method: 'DELETE',
                url: BASE_URL + '/entry/' + id
            });
        }

        /**
         * Create new entry
         *
         * @param data
         * @returns {Promise}
         */
        function entryCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/entry',
                data: data
            });
        }

        /**
         *  Create new user - signup
         *
         * @param data
         * @returns {Promise}
         */
        function userCreate(data) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/user',
                data: data
            });
        }

    }

})();