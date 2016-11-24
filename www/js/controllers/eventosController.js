angular.module('inkgps.eventos', [])

.controller('EventosController', function($scope,$http,$ionicLoading,$cordovaSQLite,$window,$state,Scopes,$rootScope) {
  Scopes.store('EventosController', $scope);

    
$scope.ir = function(url){
   
          window.open(url, '_system', 'location=yes');

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
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkeventos')
    .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
      $scope.hide();
  
    })
    .then(function(response){
   
      $scope.eventos = response.data;
    
      $scope.hide();
    })
  //alert("entra");


})