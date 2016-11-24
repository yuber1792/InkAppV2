angular.module('inkgps.recargaInkPoints', [])

.controller('recargarInkPointsController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes,$cordovaBarcodeScanner){
  //console.log("entra controlador filtro");
  Scopes.store('recargarInkPointsController', $scope);
 // alert("entro recarga f");

  $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
  $rootScope.dataClienteRegistrado.infoClienteQr = $rootScope.dataClienteRegistrado.displayName  +"/"+ $rootScope.dataClienteRegistrado.uid; 
 


  $scope.scanCodigoRecarga = function() {
     $scope.infoCliRecarga = {};

        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            $scope.infoClienteRecarga  = imageData.text.split("/");
            
             $scope.infoCliRecarga.nombre  = $scope.infoClienteRecarga[0];
             $scope.infoCliRecarga.uid  = $scope.infoClienteRecarga[1];

             var ref =  firebase.database().ref() ;           
            // alert(ref);
            var refUser = ref.child("PuntosCliente").child($rootScope.dataClienteRegistrado.uid);
            //alert(refUser);

            $scope.datosClientes  = {};
            refUser.child("puntos").on("value", function(datos){
                console.log("datos");
                $rootScope.dataClienteRegistrado.puntos  = datos.val();
                console.log( $rootScope.dataClienteRegistrado.puntos );

              });
           
             $scope.nuevosPuntos = parseInt($rootScope.dataClienteRegistrado.puntos) + parseInt($scope.infoClienteRecarga[2]);
//                  alert("nuevos puntos a recargar " + $scope.nuevosPuntos  )
    
           
              refUser.update({
                  puntos:  $scope.nuevosPuntos 
              });

              alert("Felicidades has recargado " + $scope.infoClienteRecarga[2] );


            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
      
    };

    $scope.llamarPayU = function(){

      $http.defaults.useXDomain = true;
      $scope.url = "https://sandbox.gateway.payulatam.com/ppp-web.gateway/";
          $http.post($scope.url, null, null)
          .success(function (data, status, headers, config) {
            console.log("paso");
          })
          .error(function (data, status, header, config) {
            console.log("error");
            console.log(data);
            console.log(status);
            console.log(header);
            console.log(JSON.stringify(config));
          });
    }

})