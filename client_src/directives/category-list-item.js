(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .directive('categoryListItem', categoryListItem);

    function categoryListItem(ApiService, $mdDialog, $rootScope, EVENTS, $mdToast) {
        return {
            restrict: 'E',
            scope: {
                category: "="
            },
            templateUrl: 'templates/category-list-item.html',
            link: function (scope) {

                scope.delete = function () {

                    var removeConfirmationDialog = $mdDialog.confirm()
                        .title('Would you like to remove category named: ' + scope.category.name + ' ?')
                        .textContent('This can\'t be undone.')
                        .ariaLabel('Remove category:' + scope.category.name)
                        .ok('Yes, remove it!')
                        .cancel('No.');

                    $mdDialog
                        .show(removeConfirmationDialog)
                        .then(function () {
                            return ApiService.category.remove(scope.category.id);
                        })
                        .then(function () {
                            $rootScope.$emit(EVENTS.DASHBOARD_LISTS_UPDATE);
                        })
                        .catch(function () {
                            $mdToast.show($mdToast.simple().textContent('Couldn\'t remove category.'));
                        });

                }

            }
        };
    }

})();