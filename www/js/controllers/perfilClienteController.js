angular.module('inkgps.perfilCliente', [])
.controller('perfilClienteController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
  //console.log("entra controlador filtro");
  Scopes.store('perfilClienteController', $scope);
    

  $scope.ganarInkPoints =  function (){
     alert("proximanente");
  }

  $scope.recargaInkPoints = function (){
    console.log("entra llamado 1");
    $state.go('app.recargarInkPoints');
   // $rootScope.irTab('recargarInkPoints');
  }
  $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
    var ref =  firebase.database().ref() ;
    /* ref.child("puntosPorRegistro").on("value", function(datos){
                console.log("puntos x registro " + datos.val());
             });*/
   // alert($rootScope.dataClienteRegistrado.uid);
  
    var refUser = ref.child("PuntosCliente").child($rootScope.dataClienteRegistrado.uid);
          //  alert(refUser);
            $scope.datosClientes  = {};
            refUser.child("puntos").on("value", function(datos){
                console.log("datos actual");
                
              
                $rootScope.dataClienteRegistrado.puntos  = datos.val();
                console.log( $rootScope.dataClienteRegistrado.puntos );
                 $scope.$apply();
                // window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));          
    });


   
})