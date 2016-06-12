(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .directive('entryListItem', entryListItem);

    function entryListItem(ApiService, $mdDialog, $rootScope, EVENTS, $mdToast) {
        return {
            restrict: 'E',
            scope: {
                entry: "="
            },
            templateUrl: 'templates/entry-list-item.html',
            link: function (scope) {

                scope.delete = function () {

                    var removeConfirmationDialog = $mdDialog.confirm()
                        .title('Would you like to remove entry named: ' + scope.entry.name + ' ?')
                        .textContent('This can\'t be undone.')
                        .ariaLabel('Remove entry:' + scope.entry.name)
                        .ok('Yes, remove it!')
                        .cancel('No.');

                    $mdDialog
                        .show(removeConfirmationDialog)
                        .then(function () {
                            return ApiService.entry.remove(scope.entry.id);
                        })
                        .then(function () {
                            $rootScope.$emit(EVENTS.DASHBOARD_LISTS_UPDATE);
                        })
                        .catch(function () {
                            $mdToast.show($mdToast.simple().textContent('Couldn\'t remove entry.'));
                        });

                }

            }
        };
    }

})();