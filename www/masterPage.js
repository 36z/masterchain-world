/*
    Copyright Masterchain Grazcoin Grimentz 2013-2014
    https://github.com/masterchain/masterchain-world
    https://masterchain.info
    masterchain@@bitmessage.ch
    https://masterchain.info/LICENSE.txt
*/

function NavigationController($scope, $http) {
    $scope.values = {};

    var myURLParams = BTCUtils.getQueryStringArgs();
    var url = BTCUtils.getUrl();
    var title = myURLParams['title'].toString();
    var currency = myURLParams['currency'].toString();
    var filter_caption = (myURLParams['filter'] && myURLParams['filter'].length > 0)? " " + myURLParams['filter'] : "";
    var filter = myURLParams['filter'];
    var sub_title = "";
    $scope.title = title;
    $scope.currency = currency;
    $scope.footer = '';
    $scope.filter = filter_caption;
    $scope.sub_title = filter_caption;
    $scope.getNavData = function () {

        $scope.values = {};
        // Nav bar selection - Make the http request and process the result
        $http.get('values.json', {}).success(function (data, status, headers, config) {
           $scope.values = data;
	   angular.forEach($scope.values, function(value, key) {
            // Prepare same url with a different currency
            $scope.values[key].newUrl=BTCUtils.replaceCurrency(url, value.currency);
            //console.log($scope.values[key].newUrl);
	    if (value.currency==$scope.currency) {
		$scope.values[key].selected="selected";
		var pages = value.pages;
		switch (filter) {
			case "accept":
				pages = value.accept_pages;
				break;
			case "sell":
				pages = value.sell_pages;
                                $scope.sub_title = " order book";
				break;
			default:
				break;
		}
		$scope.$emit('handlePagesEmit', {message: pages});
	    }
	    else
		$scope.values[key].selected="";
	  });
        });
    }
}

function RevisionController($scope, $http) {
    $scope.revision = {};
    
    $scope.getData = function () {
        
        // Revision - Make the http request and process the result
	$http.get('revision.json', {}).success(function (data, status, headers, config) {
	    $scope.revision=data;
        });

    }
}

