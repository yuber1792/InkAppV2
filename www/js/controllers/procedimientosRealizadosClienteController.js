angular.module('inkgps.procedimientosCliente', [])
.controller('procedimientosClienteController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
  console.log("procedimientos  cliente  ");
  $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
  var ref =  firebase.database().ref() ;
  var refProcedimientosCliente = ref.child("ProcedimientosCliente");

   $scope.dataProcedimientosCliente = [];
   $scope.dataTotalProcedimientos = [];

  refProcedimientosCliente.child($rootScope.dataClienteRegistrado.uid).on("value", function(datos){
     
        $scope.dataProcedimientosCliente  = datos.val();
        $scope.dataProcedimientosArtistaJSON  = JSON.stringify($scope.dataProcedimientosCliente);
        //console.log("procedimientos data cliente  ");
        //console.log(JSON.stringify($scope.dataProcedimientosCliente));
        //console.log("sale procedimiento :" +$scope.dataProcedimientosArtistaJSON.length);

        angular.forEach($scope.dataProcedimientosCliente, function(user,key) {
           //console.log("Entra foreach " + key);
           // console.log(JSON.stringify($scope.dataProcedimientosCliente[key]));
                angular.forEach($scope.dataProcedimientosCliente[key], function(user1,key1) {
                  //console.log("foreach 2 ");
                  console.log(JSON.stringify($scope.dataProcedimientosCliente[key][key1]));
                   $scope.dataTotalProcedimientos.push($scope.dataProcedimientosCliente[key][key1]);


                });            

        });
    });
})