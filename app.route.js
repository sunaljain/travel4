(function () {
    'use strict';
    var app = angular.module('campture');
    app.config(function ($httpProvider, $routeProvider, $locationProvider) {
        // attach our auth interceptor to the http requests
        //$httpProvider.interceptors.push('AuthInterceptor');
        $routeProvider

    .when('/', {
        controller: 'TempLandingCtrl',
        templateUrl: 'app/components/tempLanding/tempLanding.html'
    }).when('/gearChecklistForm/',{
            controller: 'GearChecklistFormCtrl',
            templateUrl:'app/components/gearChecklist/gearChecklistForm/gearChecklistForm.html'
        })
        .when('/gearChecklistResults/:lat/:lon/:formattedAddress/:numberOfDays/:dateString',{
            controller: 'GearChecklistCtrl',
            templateUrl:'app/components/gearChecklist/gearChecklist.html'
        })
        .when('/explore/',{
            templateUrl:'app/components/exploreComingSoon/exploreComingSoon.html'
        })
        .when('/location/',{
            templateUrl:'app/components/locationComingSoon/locationComingSoon.html'
        })
        .when('/chatWithCampture/',{		
             controller: 'ChatWithCamptureCtrl',		
             templateUrl:'app/components/chatWithCampture/chatWithCampture.html'		
         })

         .when('/tours/markhaTrek', {
             controller: 'MarkhaValleyTrekCtrl',
            templateUrl: 'app/components/tours/markhaTrek/markhaValleyTrek.html'
        })
        .when('/tours/lehTour', {
             controller: 'LehTourCtrl',
            templateUrl: 'app/components/tours/lehTour/lehTour.html'
        })
        .when('/tours/stokTrek', {
             controller: 'StokTrekCtrl',
            templateUrl: 'app/components/tours/stokTrek/stokTrek.html'
        })
        .when('/tours/lehTourAlternate', {
             controller: 'LehTourAlternateCtrl',
            templateUrl: 'app/components/tours/lehTourAlternate/lehTourAlternate.html'
        })
        .when('/pageNotFound/',{
            controller: 'ErrorPageCtrl',
            templateUrl:'app/components/error/errorPage.html'
        })
        .otherwise({redirectTo : '/pageNotFound/'});
        // $locationProvider.html5Mode(true);
    });

})();
