(function () {
    'use strict';

    angular
        .module('XpensesCtrlApp')
        .constant('EVENTS', {
            UNAUTHORIZED_REQUEST: 'UNAUTHORIZED_REQUEST',
            ENTRY_LIST_UPDATE: 'ENTRY_LIST_UPDATE',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR'
        });

})();