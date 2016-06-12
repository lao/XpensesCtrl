(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($mdDialog, ApiService, $scope, $rootScope, EVENTS) {

        var self = this;

        self.entries = [];
        self.categories = [];
        self.openEntryModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'templates/entry-creation.html'
            });
        };

        //Self calling function for controller loading (help readability)
        (function controllerLoad() {
            _getAllEntries();
            _getAllCategories();
            _loadListeners();
        })();

        /** private methods **/

        function _getAllEntries() {
            ApiService.entry
                .getAll()
                .then(function (result) {
                    self.entries = result.data;
                });
        }

        function _getAllCategories() {
            ApiService.category
                .getAll()
                .then(function (result) {
                    self.categories = result.data;
                });
        }

        function _loadListeners() {
            $rootScope.$on(EVENTS.DASHBOARD_LISTS_UPDATE, function () {
                _getAllEntries();
                _getAllCategories();
            });
        }

    }

})();