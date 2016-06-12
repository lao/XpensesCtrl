(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .controller('EntryCreationController', EntryCreationController);

    function EntryCreationController(ApiService, $mdDialog, $mdToast) {

        var self = this;

        self.entry = { sign: 1 };

        self.closeDialog = function () {
            $mdDialog.hide();
        };

        self.checkSign = function () {
            if (angular.isDefined(self.entry.value)) {
                self.entry.sign = Math.sign(self.entry.value);
            }
        };

        self.changeSign = function () {
            self.entry.sign = self.entry.sign * -1;
            self.entry.value = self.entry.value * -1;
        };

        self.save = function () {
            ApiService.entry
                .create(self.entry)
                .then(function () {
                    $mdDialog.hide()
                        .then(function () {
                            $mdToast.show($mdToast.simple().textContent('Entry created'));
                        });
                });
        };

    }

})();