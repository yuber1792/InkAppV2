angular.module('directivas', [])




.directive('bg', function() {
  return {
    restrict: 'A',
    require: '^multiBg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, multiBgController) {
      element.on('load', function() {
        multiBgController.animateBg();
      });
    }
  };
})


.directive('showHideContainer', function(){
  return {
    scope: {

    },
    controller: function($scope, $element, $attrs) {
      $scope.show = false;

      $scope.toggleType = function($event){
        $event.stopPropagation();
        $event.preventDefault();

        $scope.show = !$scope.show;

        // Emit event
        $scope.$broadcast("toggle-type", $scope.show);
      };
    },
    templateUrl: 'views/common/show-hide-password.html',
    restrict: 'A',
    replace: false,
    transclude: true
  };
})


.directive('showHideInput', function(){
  return {
    scope: {

    },
    link: function(scope, element, attrs) {
      // listen to event
      scope.$on("toggle-type", function(event, show){
        var password_input = element[0],
            input_type = password_input.getAttribute('type');

        if(!show)
        {
          password_input.setAttribute('type', 'password');
        }

        if(show)
        {
          password_input.setAttribute('type', 'text');
        }
      });
    },
    require: '^showHideContainer',
    restrict: 'A',
    replace: false,
    transclude: false
  };
})

.directive('preImg', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      ratio:'@',
      helperClass: '@'
    },
    controller: function($scope) {
      $scope.loaded = false;

      this.hideSpinner = function(){
        // Think i have to use apply because this function is not called from this controller ($scope)
        $scope.$apply(function () {
          $scope.loaded = true;
        });
      };
    },
    templateUrl: 'views/common/pre-img.html'
  };
})

.directive('spinnerOnLoad', function() {
  return {
    restrict: 'A',
    require: '^preImg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, preImgController) {
      element.on('load', function() {
        preImgController.hideSpinner();
      });
    }
  };
})

;
