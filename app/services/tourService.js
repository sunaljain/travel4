var app = angular.module('campture');
app.factory('TourService', ['$http', '$q', function ($http, $q) {
    var TourPrice = Parse.Object.extend("Tour_Price");
    //var tourPrice = TourPrice();    

    return {
        getTourPriceDetails: getTourPriceDetails
    };

    function getTourPriceDetails(tourPriceId, callback) {
        var tourPrice = new TourPrice();
        var query = new Parse.Query(tourPrice);
        query.get(tourPriceId, {
            success: function (parseObject) {
                callback(JSON.parse(JSON.stringify(parseObject)));
            },
            error: function (object, error) {
                // The object was not retrieved successfully.
            }
        });
    }

} ]);