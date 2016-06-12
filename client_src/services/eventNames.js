(function () {
    'use strict';

    angular
        .module('XpensesCtrlApp')
        .constant('EVENTS', {
            UNAUTHORIZED_REQUEST: 'UNAUTHORIZED_REQUEST',
            DASHBOARD_LISTS_UPDATE: 'DASHBOARD_LISTS_UPDATE',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR'
        });

})();