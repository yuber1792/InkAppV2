angular.module('inkgps.multimedia', [])


.controller('MultimediaController', function($scope,$http,$ionicLoading,$sce ,$state,Scopes,$rootScope) {
  Scopes.store('MultimediaController', $scope);

 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
$scope.valorfiltro=true;
   $scope.show = function() {
    $ionicLoading.show({
      template: 'Cargando...',

    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
 $scope.show();
  
  $http.defaults.useXDomain = true;
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkmultimedia')
    .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
      $scope.hide();
  
    })
    .then(function(response){
      //alert("**** THEN ****"+ response.data);
      //$scope.artistas = response.data;
      //$scope.trabajos = $scope.artistas[1].trabajos;
      //$scope.trabajosjson = JSON.stringify($scope.trabajos);
      $scope.multimedia = response.data;
     // alert("la data es" + $scope.trabajos);
      //alert("la data 1   " + $scope.trabajosjson);
       // alert("la data  2  " + $scope.trabajosjson.toJson);
      $scope.hide();
    })
  //alert("entra");
})