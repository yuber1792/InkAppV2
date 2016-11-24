angular.module('inkgps.promociones', [])

.controller('PromocionesController', function($scope,$http,$ionicLoading,$state ,$window,Scopes,$rootScope) {
  Scopes.store('PromocionesController', $scope);
  //console.log("entra controlador promo");
   /*$scope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
         console.log("ir tab index "  +$scope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else if (nombre === 'descubrir'){
            $state.go('app.'+nombre);
            $rootScope.shuffleArray($rootScope.artistas);
         }else{

           $state.go('app.'+nombre);
         }
     
    }*/
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
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkpromociones')
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
      $scope.promociones = response.data;
     // alert("la data es" + $scope.trabajos);
      //alert("la data 1   " + $scope.trabajosjson);
       // alert("la data  2  " + $scope.trabajosjson.toJson);
      $scope.hide();
    })
  //alert("entra");
})