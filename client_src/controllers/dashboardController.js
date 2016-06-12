(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($mdDialog) {

        var self = this;

        self.openEntryModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl:'templates/entry-creation.html'
            });
        };

    }

})();