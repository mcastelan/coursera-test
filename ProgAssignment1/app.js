(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.food ="";
  $scope.validationMessage ="";
  $scope.fontColor ="black";

  $scope.checkIfTooMuch = function(){

  if($scope.food.length >0){

    $scope.validationMessage ="Enjoy!"
    $scope.fontColor ="green";

    var words = $scope.food.split(',');
    var counter =0;
    for (var i = 0; i < words.length; i++) {
         if( words[i].length >0)
            counter++;
    }


    if(counter>3) {
      $scope.validationMessage ="Too Much!"
    }

  }
  else {

    $scope.validationMessage ="Please enter data first";
     $scope.fontColor="red";

  }


  };
}

})();
