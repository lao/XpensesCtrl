(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($mdDialog, ApiService, $rootScope, EVENTS) {

        var self = this;

        self.entries = [];
        self.categories = [];
        self.userWeekReport = [];
        self.familyWeekReport = [];
        self.currentWeekDays = [];

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
            _getFamilyGraphData();
            _populateWeekDays();
        })();

        /** private methods **/

        /**
         * Getting the list of days in current week for report build
         */
        function _populateWeekDays() {
            var beginOfWeek = moment().startOf('week');
            for (var i = 0; i < 7; i++) {
                self.currentWeekDays.push(moment(beginOfWeek));
                beginOfWeek.add(1, 'day');
            }
        }

        function _getFamilyGraphData() {

            self.familyWeekReport = [];

            ApiService.entry
                .familyWeekSum()
                .then(function (result) {

                    var data = result.data;

                    //iterating over current week days to build full week list even if there wasn't entries on a day
                    self.currentWeekDays.forEach(function (momentDay) {

                        // should have only one row per day
                        var dataEntry = _.where(data, { date_part: parseInt(momentDay.date()) })[0];
                        if (dataEntry) {
                            self.familyWeekReport.push(dataEntry);
                        } else {
                            self.familyWeekReport.push({ date_part: momentDay.date(), sum: 0 });
                        }

                    });

                });

        }

        function _getUserGraphData() {

            self.userWeekReport = [];

            ApiService.entry
                .userWeekSum()
                .then(function (result) {

                    var data = result.data;

                    //iterating over current week days to build full week list even if there wasn't entries on a day
                    self.currentWeekDays.forEach(function (momentDay) {

                        // should have only one row per day
                        var dataEntry = _.where(data, { date_part: parseInt(momentDay.date()) })[0];
                        if (dataEntry) {
                            self.userWeekReport.push(dataEntry);
                        } else {
                            self.userWeekReport.push({ date_part: momentDay.date(), sum: 0 });
                        }

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
                //Reloading everything, even though it can be heavy
                _getAllEntries();
                _getAllCategories();
                _getUserGraphData();
                _getFamilyGraphData();
            });
        }

    }

})();