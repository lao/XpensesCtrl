(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($mdDialog, ApiService, $scope, $rootScope, EVENTS) {

        var self = this;

        self.entries = [];
        self.categories = [];
        self.userChartLabels = [];
        self.userChartData = [];

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
            _getUserGraphData();
        })();

        /** private methods **/

        function _getUserGraphData() {

            self.userChartLabels = [];
            self.userChartData = [];

            ApiService.entry
                .weekSum()
                .then(function (result) {
                    var chartData = result.data;
                    chartData.forEach(function (data){
                        self.userChartLabels.push(data.name || '_uncategorized_');
                        self.userChartData.push(data.sum);
                    });
                });

        }

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