(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('EntryCreationController', EntryCreationController);

    function EntryCreationController(ApiService, $mdDialog, $mdToast, EVENTS, $rootScope, entry) {

        var self = this;

        self.entry = {};

        self.closeDialog = closeDialog;
        self.checkSign = checkSign; //triggerd when user type on value input
        self.changeSign = changeSign; //triggerd when clicked on sign button
        self.save = save;

        return init();

        function init() {
            _loadEntryForEdition();
        }

        function closeDialog() {
            $mdDialog.hide();
        }

        function checkSign() {
            if (angular.isDefined(self.entry.value)) {
                self.entry.sign = Math.sign(self.entry.value);
            }
        }

        function changeSign() {
            self.entry.sign = self.entry.sign * -1;
            self.entry.value = self.entry.value * -1;
        }

        function save() {

            if (!entry) {
                ApiService.entry
                    .create(self.entry)
                    .then(function () {
                        $mdDialog.hide()
                            .then(function () {
                                $mdToast.show($mdToast.simple().textContent('Entry created'));
                                $rootScope.$emit(EVENTS.DASHBOARD_LISTS_UPDATE);
                            });
                    });
            } else {
                ApiService.entry
                    .update(entry.id, self.entry)
                    .then(function () {
                        $mdDialog.hide()
                            .then(function () {
                                $mdToast.show($mdToast.simple().textContent('Entry updated'));
                                $rootScope.$emit(EVENTS.DASHBOARD_LISTS_UPDATE);
                            });
                    });
            }

        }

        function _loadEntryForEdition() {
            //entry comes from $mdDialog service locals variable.
            if (entry) {
                self.entry.name = entry.name;
                self.entry.value = entry.value;
                self.entry.categoryname = entry.category.name;
                self.entry.date = new Date(entry.date);
                checkSign();
            }
        }

    }

})();