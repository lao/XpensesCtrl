(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp')
        .directive('shouldEqualTo', shouldEqualTo);

    function shouldEqualTo() {
        return {
            restrict: 'A',
            require: "ngModel",
            scope: {
                modelToCompare: "=shouldEqualTo"
            },
            link: function (scope, element, attributes, ngModel) {

                scope.$watch("modelToCompare", function () {
                    ngModel.$validate();
                });

                ngModel.$validators.shouldEqualTo = function (modelValue) {
                    return modelValue === scope.modelToCompare;
                };

            }
        };
    }

})();