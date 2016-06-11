(function (){

    'use strict';

    var XpensesCtrlApp = angular
        .module('XpensesCtrlApp', ['ngMaterial'])
        .run(function ($rootScope){
            $rootScope.test = 'oiiii';
        });

})();