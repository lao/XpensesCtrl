(function () {

    'use strict';

    angular
        .module('XpensesCtrlApp', ['ngMaterial', 'ngRoute', 'satellizer'])
        //Annotations will be added by gulp-ng-annotate
        .config(function ($routeProvider, $locationProvider, $authProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController',
                    controllerAs: 'LoginCtrl',
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                })
                .when('/signup', {
                    templateUrl: 'templates/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'SignupCtrl',
                    resolve: { skipIfAuthenticated: skipIfAuthenticated }
                })
                .when('/dashboard', {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'DashCtrl',
                    resolve: { loginRequired: loginRequired }
                })
                .otherwise({
                    templateUrl: 'templates/default-error.html'
                });

            $authProvider.loginUrl = '/login';
            $authProvider.signupUrl = '/signup';

            function skipIfAuthenticated($location, $auth) {
                if ($auth.isAuthenticated()) {
                    $location.path('/dashboard');
                }
            }

            function loginRequired($location, $auth) {
                if (!$auth.isAuthenticated()) {
                    $location.path('/');
                }
            }

        })
        .run(function ($rootScope, $window) {

            if ($window.localStorage.user) {
                $rootScope.currentUser = JSON.parse($window.localStorage.user);
            }

        });

})();