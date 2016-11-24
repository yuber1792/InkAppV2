angular.module('inkgps.bocetos', [])

.controller('BocetosController', function($scope,$http,$ionicLoading,$ionicModal,$state,$window,Scopes,$rootScope) {
Scopes.store('BocetosController', $scope);


   $ionicModal.fromTemplateUrl('./templates/detalleArtistaBocetos.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeDetallebocetos = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.openDetalleBocetos = function () {
        $scope.modal.show();
    };


$scope.facebook = function() {
    $scope.urlFacebook  = "https://facebook.com/"+$scope.artistaSeleccionado.usuarioFacebook;
    window.open($scope.urlFacebook, '_system', 'location=yes');
 }

 $scope.twitter = function() {
    $scope.urlTwitter  = "https://twitter.com/"+$scope.artistaSeleccionado.twitter;
    window.open($scope.urlTwitter, '_system', 'location=yes');
 }

 $scope.instagram = function() {
    $scope.urlInstagram  = "https://instagram.com/"+$scope.artistaSeleccionado.instagram;
    window.open($scope.urlInstagram, '_system', 'location=yes');
 }

 
 $scope.whatsapp = function() {
 
   cordova.plugins.Whatsapp.send($scope.artistaSeleccionado.celular);

 }

 $scope.showImages = function(index) {
 $scope.activeSlide = index;
 $scope.showModal('templates/pop.html');
 }
 
 $scope.showModal = function(templateUrl) {
 $ionicModal.fromTemplateUrl(templateUrl, {
 scope: $scope,
 animation: 'slide-in-up'
 }).then(function(modalImg) {
 $scope.modalImg = modalImg;
 $scope.modalImg.show();
 });
 }
  // Close the modal
 $scope.closeModal = function() {
 $scope.modalImg.hide();
 $scope.modalImg.remove()
 };

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
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkbocetos')
    .success(function(data, status, headers, config){

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
      $scope.bocetos = response.data;
      $scope.hide();
    })

    
 
     $scope.cargarSeleccionadoBoceto = function (id) {
      $scope.abrirLoadingArtistaSolo();

        $http.get('https://inkgpsapp.firebaseio.com/DataId/'+id+'.json')
    
        .error(function(data, status, headers, config){
          alert("**** Verificar conexion a internet ****");
      
        })
        .then(function(response){
            $scope.artistaSeleccionado = {};
              
                $scope.openDetalleBocetos();
                $scope.artistaUpdate = response.data;               

               //  alert( $scope.artistas[id1].id );
              //  $scope.idArtista =  id+1;
                $scope.artistaSeleccionado.id =  $scope.artistaUpdate.id; 
                $scope.artistaSeleccionado.codigo =  $scope.artistaUpdate.id; 
                $scope.artistaSeleccionado.nombre =  $scope.artistaUpdate.nombre; 
                $rootScope.nombreEnvio = $scope.artistaUpdate.nombre; 
                $scope.artistaSeleccionado.estudio=  $scope.artistaUpdate.estudio;
                $scope.artistaSeleccionado.especialidad =  $scope.artistaUpdate.especialidad; 
                $scope.artistaSeleccionado.descripcion =  $scope.artistaUpdate.descripcion; 
                $scope.artistaSeleccionado.imagen =  $scope.artistaUpdate.imagen; 
                $scope.artistaSeleccionado.direccion = $scope.artistaUpdate.direccion; 
                $scope.artistaSeleccionado.celular = $scope.artistaUpdate.celular; 
                $scope.artistaSeleccionado.facebook =  $scope.artistaUpdate.facebook; 
                $scope.artistaSeleccionado.twitter =  $scope.artistaUpdate.twitter; 
                $scope.artistaSeleccionado.instagram =  $scope.artistaUpdate.instagram; 
                $scope.artistaSeleccionado.trabajos =  $scope.artistaUpdate.trabajos;
                $scope.artistaSeleccionado.opcionVideo =  $scope.artistaUpdate.opcionVideo;
                $scope.artistaSeleccionado.videos =  $scope.artistaUpdate.videos;
                $scope.artistaSeleccionado.latitud=  $scope.artistaUpdate.latitud;
                $scope.artistaSeleccionado.longitud =  $scope.artistaUpdate.longitud;
                $scope.artistaSeleccionado.ciudad =  $scope.artistaUpdate.ciudad;
                $scope.artistaSeleccionado.verificado =  $scope.artistaUpdate.verificado;
                $scope.allImages = $scope.artistaSeleccionado.trabajos;
                $rootScope.mailEnvio = $scope.artistaUpdate.correo ;
                $scope.artistaSeleccionado.usuarioFacebook =  $scope.artistaUpdate.usuarioFacebook;
                $scope.artistaSeleccionado.usuarioTwitter = $scope.artistaUpdate.usuarioTwitter;
                $scope.mostrarTwitter  = false;
                //$scope.artistaSeleccionado.video1 = $scope.artistaSeleccionado.videos[0];
                //console.log($scope.artistaSeleccionado.video1);
                //alert($scope.artistaSeleccionado.codigo);
                if($scope.artistaSeleccionado.usuarioTwitter  === 'false')
                {
                  
                  $scope.mostrarTwitter  = false;
                  //alert( $scope.artistaSeleccionado.mostrarTwitter);

                }else{
                  $scope.mostrarTwitter  = true;
                  // alert( $scope.artistaSeleccionado.mostrarTwitter);
                }

                $scope.artistaSeleccionado.usuarioInstagram =  $scope.artistaUpdate.usuarioInstagram;
                $scope.mostrarInstagram  = false;
                 if($scope.artistaSeleccionado.usuarioInstagram  === 'false')
                {
                  
                  $scope.mostrarInstagram   = false;
                  //alert( $scope.artistaSeleccionado.mostrarTwitter);

                }else{
                  $scope.mostrarInstagram   = true;
                  // alert( $scope.artistaSeleccionado.mostrarTwitter);
                }    

                $scope.cerrarLoading();
                   

            var codigofiltro =   $scope.artistaUpdate.id; 

           })
  

 
    };


})