angular.module('inkgps.procedimientosArtista', [])
.controller('procedimientosArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
  console.log("procedimientos  artista  ");
  $rootScope.dataArtistaRegistrado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
  var ref =  firebase.database().ref() ;
  var refProcedimientosArtista = ref.child("ProcedimientosArtista");

   $scope.dataProcedimientosArtista = [];
   $scope.dataTotalProcedimientos = [];

  refProcedimientosArtista.child($rootScope.dataArtistaRegistrado.uid).on("value", function(datos){
     
        $scope.dataProcedimientosArtista  = datos.val();
        $scope.dataProcedimientosArtistaJSON  = JSON.stringify($scope.dataProcedimientosArtista);
        console.log("procedimientos data  ");
        console.log(JSON.stringify($scope.dataProcedimientosArtista));
        console.log("sale procedimiento :" +$scope.dataProcedimientosArtistaJSON.length);

        angular.forEach($scope.dataProcedimientosArtista, function(user,key) {
           console.log("Entra foreach " + key);
            console.log(JSON.stringify($scope.dataProcedimientosArtista[key]));
                angular.forEach($scope.dataProcedimientosArtista[key], function(user1,key1) {
                  console.log("foreach 2 ");
                  console.log(JSON.stringify($scope.dataProcedimientosArtista[key][key1]));
                   $scope.dataTotalProcedimientos.push($scope.dataProcedimientosArtista[key][key1]);


                });            

        });
    });

   
})