(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($mdDialog, ApiService, $scope, $rootScope, EVENTS) {

        var self = this;

        self.entries = [];

        self.openEntryModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'templates/entry-creation.html'
            });
        };

        self.getAllEntries = function () {
            ApiService.entry
                .getAll()
                .then(function (result) {
                    self.entries = result.data;
                });
        };

        function _loadListeners() {
            $rootScope.$on(EVENTS.ENTRY_LIST_UPDATE, function () {
                self.getAllEntries();
            });
        }

        (function controllerLoad() {

            self.getAllEntries();

            _loadListeners();

        })();

    }

})();