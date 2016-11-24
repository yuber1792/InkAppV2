angular.module('inkgps.recargaInkPointArtista', [])
.controller('recargarInkPointsArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes,$cordovaBarcodeScanner){
  //console.log("entra controlador filtro");
  Scopes.store('recargarInkPointsArtistaController', $scope);
 // alert("entro recarga f");
 $scope.infoCliRecarga = {};
 $scope.scanCodigoCliente = function() {
    
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            $scope.infoClienteRecarga  = imageData.text.split("/");
            alert("nombre cliente" + $scope.infoClienteRecarga[0] );
            alert("uid cliente" + $scope.infoClienteRecarga[1] );
             $scope.infoCliRecarga.nombre  = $scope.infoClienteRecarga[0];
             $scope.infoCliRecarga.uid  = $scope.infoClienteRecarga[1];
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });  
    };

    $scope.generarQrRecargar = function (){
      $scope.infoCliRecarga.qr = $scope.infoCliRecarga.nombre  + "/" + $scope.infoCliRecarga.uid + "/"+ $scope.infoCliRecarga.inkPoints ;  

    }
  //$rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
  //$rootScope.dataClienteRegistrado.infoClienteQr = $rootScope.dataClienteRegistrado.displayName  +"/"+ $rootScope.dataClienteRegistrado.uid; 

})