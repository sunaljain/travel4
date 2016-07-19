(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('StokTrekCtrl', ['$scope', '$location', '$anchorScroll', '$route', 'TourService', controller]);
    function controller($scope, $location, $anchorScroll, $route, tourService) {
        //====== Scope Variables==========
        //================================
        $scope.pillTabIndex = 0;
        $scope.privateGroupTabIndex = 0;
        $scope.numberOfPeople = 1;
        $scope.peoplesCost = 0
        var tourPriceId = "ydQEL5I6LT"//stokId
        $scope.tourPrice;
        $scope.selectedAccomodation = { cost: 0 }
        $scope.totalCost;
        $scope.totalSleepingBags = 0;
        $scope.numberOfRooms = 0;
        $scope.numberOfPeopleInGroup = 1;
        $scope.totalSleepingBagsGroup = 0;
        $scope.groupMonthsList = [
            { Id: 1, Value: 'January' },
            { Id: 2, Value: 'February' },
            { Id: 3, Value: 'March' },
            { Id: 4, Value: 'April' },
            { Id: 5, Value: 'May' },
            { Id: 6, Value: 'June' },
            { Id: 7, Value: 'July' },
            { Id: 8, Value: 'August' },
            { Id: 9, Value: 'September' },
            { Id: 10, Value: 'October' },
            { Id: 11, Value: 'November' },
            { Id: 12, Value: 'December' }
        ];
        $scope.groupDateList = new Array()
        $scope.selectedMonth = { Id: 1, Value: 'January' };
        $scope.selectedDate;
        $scope.groupDateTimelist = new Array();

        $scope.$watch('numberOfPeople', function () {
            $scope.numberOfRooms = Math.floor($scope.numberOfPeople / 2) + $scope.numberOfPeople % 2;
        });
        $scope.$watch('selectedAccomodation.cost', function () {
            if (!$scope.selectedAccomodation) {
                $scope.selectedAccomodation = { cost: 0 }
            }
        });
        $scope.$watch('selectedMonth', function () {
            $scope.groupDateList = new Array()
           getDateListForMonth($scope.selectedMonth.Id)
        });
        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        }
        $scope.updatePillTabPos = function (pos) {
            $scope.pillTabIndex = pos;
        }
        $scope.updatePrivateGroupTab = function (pos) {
            $scope.privateGroupTabIndex = pos;
        }
        $scope.priceList = [{ people: 2, cost_per_person: 16000 }, { people: 4, cost_per_person: 12500 }, { people: 6, cost_per_person: 10500 }, { people: 8, cost_per_person: 6500}]
        $scope.calculatePeoplesCost = function () {

            if ($scope.numberOfPeople <= 3) {
                $scope.peoplesCost = 16000 * $scope.numberOfPeople
            }
            else if ($scope.numberOfPeople <= 5) {
                $scope.peoplesCost = 12500 * $scope.numberOfPeople
            }
            else if ($scope.numberOfPeople <= 7) {
                $scope.peoplesCost = 10500 * $scope.numberOfPeople
            }
            else {
                $scope.peoplesCost = 6500 * $scope.numberOfPeople
            }
        }

        function getMarkhaTrekPriceDetails() {
            tourService.getTourPriceDetails(tourPriceId, function (data) {
                if (data) {
                    $scope.tourPrice = data
                    $scope.calculatePeoplesCost()
                    getDateTimeListFromString($scope.tourPrice.group_dates)
                    getDateListForMonth(1)
                    $scope.$apply()
                }
            })
        }
        getMarkhaTrekPriceDetails()
        function getDateTimeListFromString(dateList) {
            angular.forEach(dateList, function (dateString, key) {
                try {
                    $scope.groupDateTimelist.push(new Date(dateString))
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        function getDateListForMonth(month){
            angular.forEach($scope.groupDateTimelist, function (dateObj, key) {
                try {
                    if(month == dateObj.getMonth() + 1){
                        $scope.groupDateList.push(dateObj.getDate())
                    }
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        $scope.sendUserQuery = function(){
            if($scope.userQuery.name && $scope.userQuery.phone && $scope.userQuery.email){
                $scope.userQuery.isPrivateOrGroup = $scope.privateGroupTabIndex
                if(!$scope.userQuery.isPrivateOrGroup){
                    //Private
                    $scope.userQuery.private = {
                        tourId: tourPriceId,
                        tourName: $scope.tourPrice.trek_name,
                        numberOfPeople: $scope.numberOfPeople,
                        peopleCost: $scope.peoplesCost, 
                        selectedAccomodation: $scope.selectedAccomodation,
                        selectedAccomodationCostFor3Nights: ( 3 * $scope.selectedAccomodation.cost * $scope.numberOfRooms),
                        totalSleepingBags: $scope.totalSleepingBags,
                        totalSleepingBagsCost: $scope.totalSleepingBags * $scope.tourPrice.sleeping_bag_cost,
                        totalCost: ($scope.peoplesCost + (3 * $scope.selectedAccomodation.cost * $scope.numberOfRooms) + ($scope.totalSleepingBags * $scope.tourPrice.sleeping_bag_cost))/$scope.numberOfPeople
                    }
                }
                else{
                    //Group
                    $scope.userQuery.group = {
                        tourId: tourPriceId,
                        tourName: $scope.tourPrice.trek_name,
                        groupCost: $scope.tourPrice.group_cost,
                        numberOfPeople: $scope.numberOfPeopleInGroup,
                        selectedMonth: $scope.selectedMonth,
                        selectedDate: $scope.selectedDate,
                        totalSleepingBags: $scope.totalSleepingBagsGroup,
                        totalSleepingBagsCost: $scope.totalSleepingBagsGroup * $scope.tourPrice.sleeping_bag_cost
                    }
                }
                tourService.sendUserTourQuery($scope.userQuery,function(data){
                    if(data){
                        console.log(data)
                        $('#enqModal').modal('hide')
                    }
                })
            }
        }
    };
})();