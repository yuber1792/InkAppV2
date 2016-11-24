angular.module('inkgps.estudios', [])

.controller('PublicidadController', function($window,$scope,$http,$ionicLoading,$cordovaSQLite,$ionicModal,$sce,$state,Scopes,$rootScope) {
  Scopes.store('PublicidadController', $scope);

 $ionicModal.fromTemplateUrl('./templates/detalleEstudio.html', {
        scope: $scope
    }).then(function (modalpubli) {
        $scope.modalpubli= modalpubli;
    });



    // Triggered in the login modal to close it
    $scope.closeInfoPublicidad= function () {
        $scope.modalpubli.hide();
    };

    // Open the login modal
    $scope.openInfoPublicidad = function () {
     // alert("event");
        $scope.modalpubli.show();
    };

  $scope.ir = function(url){
   
          window.open(url, '_system', 'location=yes');

    }

//abrir url de manera segura
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
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkpublicidad')
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
      $scope.publicidad = response.data;
      
     // alert("la data es" + $scope.trabajos);
      //alert("la data 1   " + $scope.trabajosjson);
       // alert("la data  2  " + $scope.trabajosjson.toJson);
      $scope.hide();
    })


  

    $scope.publicidadSeleccionada = {};
    $scope.seleccionarPublicidad = function(id){
      $scope.publicidadSeleccionada = null;
      $scope.publicidadSeleccionada = {};
       $scope.imagenesCargadas = null ; 
       $scope.videosCargados = null ;
        $scope.videosCargados = null ;
        $scope.openInfoPublicidad(); 
        $scope.publicidadSeleccionada.descripcion=$scope.publicidad[id].descripcion;
        $scope.publicidadSeleccionada.nombre=$scope.publicidad[id].nombre;
        $rootScope.nombreEnvio = $scope.publicidad[id].nombre; 
        $scope.publicidadSeleccionada.imagen=$scope.publicidad[id].imagen;
        $scope.publicidadSeleccionada.url=$scope.publicidad[id].redireccion;
        $rootScope.mailEnvio = $scope.publicidad[id].email; 
       // alert($rootScope.mailEnvio);
        if($scope.publicidad[id].tieneImagenes === "false"){
           $scope.publicidadSeleccionada.tieneImagenes=false;
        }else{
           $scope.publicidadSeleccionada.tieneImagenes=true;
        }
        if($scope.publicidad[id].tieneVideos === "false"){
           $scope.publicidadSeleccionada.tieneVideos=false;
        }else{
           $scope.publicidadSeleccionada.tieneVideos=true;
        }
        if($scope.publicidad[id].tieneRedes === "false"){
           $scope.publicidadSeleccionada.tieneRedes=false;
        }else{
           $scope.publicidadSeleccionada.tieneRedes=true;
        }
       
        $scope.publicidadSeleccionada.showImagenes=true;
        $scope.publicidadSeleccionada.showVideos=true;
        $scope.publicidadSeleccionada.showRedes=true;
        $scope.publicidadSeleccionada.showLeerMas = true;
        if($scope.publicidad[id].imagenes != null || $scope.publicidad[id].imagenes != undefined){
          $scope.imagenesCargadas = $scope.publicidad[id].imagenes;
        }
        if($scope.publicidad[id].videos != null || $scope.publicidad[id].videos != undefined){
          $scope.videosCargados = $scope.publicidad[id].videos;
        }
        if($scope.publicidad[id].redes != null  || $scope.publicidad[id].redes != undefined  ){
          $scope.publicidadSeleccionada.redesCargadas = $scope.publicidad[id].redes;
         // console.log("entra"); 
          //  console.log($scope.publicidad[id].redes);
           $scope.publicidadSeleccionada.showLeerMas = false;  
        }
        
    }

      $scope.openGeoEstudio = function() {
          $scope.latitude =   $scope.publicidadSeleccionada.redesCargadas.latitud;
          $scope.longitude =   $scope.publicidadSeleccionada.redesCargadas.longitud;
          window.open('geo:' + $scope.latitude + ',' + $scope.longitude + '?z=11&q=' + $scope.latitude + ',' + $scope.longitude + '(Treasure)', '_system', 'location=yes');
      }
      $scope.whatsapp = function() {
  
         cordova.plugins.Whatsapp.send($scope.publicidadSeleccionada.redesCargadas.celular);

      }
       $scope.twitter = function() {
          $scope.urlTwitter  = "https://twitter.com/"+$scope.publicidadSeleccionada.redesCargadas.usuarioTwitter;
          window.open($scope.urlTwitter, '_system', 'location=yes');
      }
      $scope.facebook = function() {
        $scope.urlFacebook  = "https://facebook.com/"+$scope.publicidadSeleccionada.redesCargadas.usuarioFacebook;
         window.open($scope.urlFacebook, '_system', 'location=yes');
      }
       $scope.instagram = function() {
        $scope.urlInstagram  = "https://instagram.com/"+$scope.publicidadSeleccionada.redesCargadas.instagram;
        window.open($scope.urlInstagram, '_system', 'location=yes');
      }
})