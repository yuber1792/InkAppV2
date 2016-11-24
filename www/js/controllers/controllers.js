angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state ,Scopes ,$rootScope) {
  Scopes.store('AppCtrl', $scope);
  $scope.valorfiltro=true;
  $scope.usuarioAutenticado = 0  ;
})


//ol version  

.controller('editarArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
      Scopes.store('editarArtistaController', $scope);
    //  console.log("entra controlador editarArtista");
      //$rootScope.loginData = {};
      $rootScope.loginData.usuario = window.localStorage.getItem("usuario");
      $rootScope.loginData.clave = window.localStorage.getItem("clave");
      //console.log("valor");
      //console.log(angular.toJson(window.localStorage.getItem('artistaLogueado')));


     // $scope.artistaLogueado = {};

    
      $scope.artistaLogueado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
     
  
     // console.log("artista loguado");
      //console.log($scope.artistaLogueado);


      /*  $scope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
         console.log("ir tab editar "  +$scope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else{

           $state.go('app.'+nombre);
         }
     
    }*/

      $scope.selImagenPerfil= function() {
          

          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
          };

          $cordovaCamera.getPicture(options).then(function(imageUri) {
           // console.log('img', imageUri);
         
            //$scope.images.push(imageUri);
             $scope.artistaLogueado.imagen = "data:image/jpeg;base64," + imageUri;
                
          }, function(err) {
          // error
          });

      };

     


      /**********Editar fotos  ******************/

  $scope.ready = false;
  $scope.images = [];
  
  $rootScope.$watch('appReady.status', function() {
    console.log('watch fired '+$rootScope.appReady.status);
    if($rootScope.appReady.status) $scope.ready = true;
  });
  
   
  $scope.selImagenTrabajos= function(index) {
    //alert("entra seleccionar foto " + index);

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      targetHeight: 600
    };

    $cordovaCamera.getPicture(options).then(function(imageUri) {
      console.log('img', imageUri);
   
      //$scope.images.push(imageUri);
       $scope.artistaLogueado.trabajos[index] = "data:image/jpeg;base64," + imageUri;
          
    }, function(err) {
    // error
    });

  };

   $scope.tomarFotoDePerfil = function() {

      
        var options1 = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options1).then(function(imageData) {
         
            $scope.artistaLogueado.imagen = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };
    $scope.tomarFotoDeImagen = function(index) {

      //alert("entra tomar foto "+index);
        var options1 = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            //allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth:600,
            targetHeight: 900,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options1).then(function(imageData) {
         
            $scope.artistaLogueado.trabajos[index] = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };
  
  $scope.selImages = function() {
    
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      targetHeight: 600
    };

    $cordovaCamera.getPicture(options).then(function(imageUri) {
     // console.log('img', imageUri);
      $scope.images.push("data:image/jpeg;base64," +imageUri);
          
    }, function(err) {
    // error
    });

  };

     //llamar al servicio para cargar estilo
$http.defaults.useXDomain = true;
  $http.get('http://8-dot-inkdata-1019.appspot.com/estilos')
    .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
     
      $scope.estilosCargados = response.data;
      
    })

     //llamar al servicio para ciudad estilo
    $http.get('http://8-dot-inkdata-1019.appspot.com/ciudades')
    .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
     
      $scope.ciudadesCargadas = response.data;
      
    })


/*******************Mapas  para la  edicion ***********************************/
  var marker  = null;
    
  $scope.showMap = function (){
        var myLatlng = new google.maps.LatLng($scope.artistaLogueado.latitud,$scope.artistaLogueado.longitud);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
       var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
       
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Puedes arrastrar el mapa para reajustar la posición. </a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Posicion'
        });
        

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
        
        google.maps.event.addListener(map,'drag',function(pos) {
     
          
            marker.setPosition(new google.maps.LatLng( map.getCenter().lat(), map.getCenter().lng()) );
      
        });
         google.maps.event.addListener(map,'dragend',function(pos) {
     
          
            marker.setPosition(new google.maps.LatLng( map.getCenter().lat(), map.getCenter().lng()) );
      
        });
        google.maps.event.addListener(map,'center_ch',function(pos) {
     
          
           marker.setPosition(new google.maps.LatLng( map.getCenter().lat(), map.getCenter().lng()) );
      
        });
         google.maps.event.addListener(map,'idle',function(pos) {
     
          
           marker.setPosition(new google.maps.LatLng( map.getCenter().lat(), map.getCenter().lng()) );
      
        });
       

        $scope.map = map;
  }
  $scope.edicionUbicacionCorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'La ubicación se ha guardado satisfactoriamente.',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });
 }
  $scope.edicionFotosCorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'Las imagenes se ha guardado satisfactoriamente.',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });
 }

  $scope.edicionClaveCorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'La clave se ha guardado satisfactoriamente.',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });
 }
   $scope.edicionClaveIncorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'La claves no coinciden, intentelo nuevamente.',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });
 }


  $scope.guardarUbicacion =  function(){
    

     var objetoPosicionEd = new Firebase('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario'));
              // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
      objetoPosicionEd.update( { 
                            longitud : $scope.map.getCenter().lng(),
                            latitud : $scope.map.getCenter().lat()
                          });
    
    $scope.edicionUbicacionCorrecta();
     $http.get('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario')+'.json')
          .success(function(data, status, headers, config){
         
          })
          .error(function(data, status, headers, config){
        
          })
          .then(function(response){
               $scope.artistaLogueado = response.data;
          });
 


  }
  $scope.guardarFotos =function (){

       var objetofotos = new Firebase('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario'));
              // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
      if($scope.artistaLogueado.trabajos.length === 9 ){
           objetofotos.update( { 
                            trabajos : {
                                          0:$scope.artistaLogueado.trabajos[0],
                                          1:$scope.artistaLogueado.trabajos[1],
                                          2:$scope.artistaLogueado.trabajos[2],
                                          3:$scope.artistaLogueado.trabajos[3],
                                          4:$scope.artistaLogueado.trabajos[4],
                                          5:$scope.artistaLogueado.trabajos[5],
                                          6:$scope.artistaLogueado.trabajos[6],
                                          7:$scope.artistaLogueado.trabajos[7],
                                          8:$scope.artistaLogueado.trabajos[8],
                                          9:$scope.artistaLogueado.trabajos[9]
                                          

                                        }

                          });
      }else{
        objetofotos.update( { 
                            trabajos : {
                                          0:$scope.artistaLogueado.trabajos[0],
                                          1:$scope.artistaLogueado.trabajos[1],
                                          2:$scope.artistaLogueado.trabajos[2],
                                          3:$scope.artistaLogueado.trabajos[3],
                                          4:$scope.artistaLogueado.trabajos[4]
                                        }

                          });

      }        
     

      $scope.edicionFotosCorrecta();
       $http.get('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario')+'.json')
          .success(function(data, status, headers, config){
         
          })
          .error(function(data, status, headers, config){
        
          })
          .then(function(response){
               $scope.artistaLogueado = response.data;
          });

      

  }
$scope.claves={};
  $scope.guardarClave = function(){

    //$http.get('http://8-dot-inkdata-1019.appspot.com/inkfeed')
          $http.get('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario')+'.json')
          .success(function(data, status, headers, config){
         
          })
          .error(function(data, status, headers, config){
        
          })
          .then(function(response){
         
               $scope.artistaLogueado = response.data;

               //console.log("clave = " + $scope.artistaLogueado.clave );


    
                //console.log(objetoClave);
                    if($scope.claves.claveActual != null ||  $scope.claves.claveActual != ''){
                     
                        if($scope.artistaLogueado.clave === $scope.claves.claveActual){
                        
                          if($scope.claves.claveNueva === $scope.claves.repiteClaveNueva){
                              var objetoClave = new Firebase('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario'));
                               

                                objetoClave.update( { 
                                        clave : $scope.claves.repiteClaveNueva
                                       
                                      });

                                  $scope.edicionClaveCorrecta();
                                  $scope.claves.claveActual = "";
                                  $scope.claves.repiteClaveNueva = "";
                                  $scope.claves.claveNueva = "";
                                  return;
                          }
                        }

                    }
             $scope.edicionClaveIncorrecta();
        });

    
    

  }
  $scope.$watch("artistaLogueado.descripcion", function(newValue, oldValue){

        if (newValue.length > 180){
            $scope.artistaLogueado.descripcion = oldValue;
           
        }
            $scope.valorDescripcion  =  $scope.artistaLogueado.descripcion.length;
        
         
        
    });

  $scope.edicionCorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'La informaciòn se ha guardado satisfactoriamente.',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });

   alertPopup.then(function(res) {
     console.log('cierra mensaje');
   });
 };


  $scope.guardar = function(){

    //console.log("Json");
    //console.log('https://inkgpsapp.firebaseio.com/DataId/'+$rootScope.loginData.usuario);



      var fredNameRef = new Firebase('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario'));
              // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
      fredNameRef.update( { 
                            imagen :$scope.artistaLogueado.imagen,
                            nombre: $scope.artistaLogueado.nombre,
                            descripcion:$scope.artistaLogueado.descripcion,
                            correo:$scope.artistaLogueado.correo,
                            celular:$scope.artistaLogueado.celular,
                            ciudad:$scope.artistaLogueado.ciudad,
                            direccion:$scope.artistaLogueado.direccion,
                            especialidad:$scope.artistaLogueado.especialidad,
                            estudio:$scope.artistaLogueado.estudio,
                            facebook:$scope.artistaLogueado.facebook,
                            usuarioFacebook:$scope.artistaLogueado.usuarioFacebook,
                            usuarioInstagram:$scope.artistaLogueado.usuarioInstagram,
                            instagram:$scope.artistaLogueado.usuarioInstagram

                          });

    
    
     $http.get('https://inkgpsapp.firebaseio.com/DataId/'+window.localStorage.getItem('usuario')+'.json')
          .success(function(data, status, headers, config){
         
          })
          .error(function(data, status, headers, config){
        
          })
          .then(function(response){

               $rootScope.artistaLogueado = response.data;
               $scope.edicionCorrecta();
          });


  }

   $scope.mensajeDatosFaltantes = function(campo) {
     var alertPopup = $ionicPopup.alert({
       title: 'Información',
       template: 'El campo '+ campo + ' es requerido',
        buttons: [
                     
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                 console.log("ok")
                                  //return scope.data.response;

                              }
                        }
                ]

     });

       alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
       });
    };
  $scope.campoValidacion = ""; 
  $scope.verficarEdicion = function (){
        if($scope.artistaLogueado.imagen  ===  null ||  $scope.artistaLogueado.imagen  === ""){
            $scope.campoValidacion = "Imagen perfil"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else if($scope.artistaLogueado.nombre === "" || $scope.artistaLogueado.nombre === undefined){
            $scope.campoValidacion = "Nombre"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else if($scope.artistaLogueado.descripcion === "" || $scope.artistaLogueado.descripcion === undefined){
            $scope.campoValidacion = "Descripción"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else if($scope.artistaLogueado.celular === "" || $scope.artistaLogueado.celular === undefined){
            $scope.campoValidacion = "Celular"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else if($scope.artistaLogueado.ciudad === "" || $scope.artistaLogueado.ciudad === undefined){
            $scope.campoValidacion = "Ciudad"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else if($scope.artistaLogueado.especialiodad === "" || $scope.artistaLogueado.especialidad === undefined){
            $scope.campoValidacion = "Especialidad"; 
            $scope.mensajeDatosFaltantes($scope.campoValidacion);
            return ;
        }else{
          $scope.guardar();
        }

  }
   
  
  $scope.buscarMiUbicacion =function(){
      
       navigator.geolocation.getCurrentPosition(function(pos) {
             $scope.abrirLoading(); 
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            marker.setPosition(new google.maps.LatLng( pos.coords.latitude, pos.coords.longitude) );
           /* marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: $scope.map,
                title: "My Location"
            });*/
            $scope.cerrarLoading();
        });
      
      
  }


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/editarUbicacionArtista.html', {
    scope: $scope
  }).then(function(modalUbicacion) {
    $scope.modalUbicacion = modalUbicacion;
  });

  // Triggered in the login modal to close it
  $scope.cerrarUbicacion = function() {
    $scope.modalUbicacion.hide();
  };

  // Open the login modal
  $scope.abrirUbicacion = function() {
    $scope.modalUbicacion.show();
    $scope.showMap();

  };
    
  $scope.cargaServicio = function(){
   // console.log("Entra cargar Servicio " + $rootScope.loginData.usuario);
   
     /* $scope.artistaLogueado = 
                      {"direccion":"Zona rosa",
                      "ciudad":"Bogotá",
                      "instagram":"jhonmadhousetattoo",
                      "videos":[],
                      "verificado":"false",
                      "descripcion":"Mi especialidad  es el neo tradicional, letting y estilo propio tengo una experiencia de 4 años ",
                      "opcionVideo":"false",
                      "especialidad":"Neo tradicional",
                      "id":"122",
                      "nombre":"Jhon mad house",
                      "twitter":"no",
                      "imagen":"http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMadPerfil.jpg",
                      "estudio":"Odd tattoo Bogotá ",
                      "facebook":"Jhon mad",
                      "trabajos":["http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMad3.jpg",
                                  "http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMad5.jpg",
                                  "http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMad1.jpg",
                                  "http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMad4.jpg",
                                  "http:\/\/8-dot-inkdata-1019.appspot.com\/img\/jhonMad\/jhonMad2.jpg"],
                      "latitud":"4.618728965718560",
                      "usuarioFacebook":"rudeMr.Andy",
                      "usuarioInstagram":"jhonmadhousetattoo",
                      "longitud":"-74.1382460296154",
                      "usuarioTwitter":"false",
                      "celular":"+573133599185"} ;*/
   // console.log($scope.artistaLogueado);
    //console.log("nombre =>" + $scope.artistaLogueado.nombre);

  }

   $scope.cargaServicio();

})



.controller('indexController', function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$cordovaDevice,$cordovaSocialSharing ,$cordovaScreenshot ,$templateCache,$firebaseObject,$ionicSideMenuDelegate ,$firebaseArray,$firebaseAuth,$cordovaOauth,$cordovaBarcodeScanner,$crypto) {
    Scopes.store('indexController', $scope);
    $ionicSideMenuDelegate.canDragContent(false);
    console.log("entra controlador index");




    $scope.encriptar  = function (){
       var encrypted = $crypto.encrypt('steven castro');
       var decrypted = $crypto.decrypt(encrypted);
       console.log("texto encriptado = " + encrypted);
       console.log("texto desencriptado = " + decrypted);
    }

    $scope.encriptarTexto  = function (texto){
      console.log("texto encriptado = " + $crypto.encrypt(texto));
      return $crypto.encrypt(texto);
    }


    $scope.scanBarcode = function() {

        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
      

    };






    $rootScope.marca = "otro"; 
    $scope.artistaLogueado = {};

  $scope.abrirLoading = function() {
    $ionicLoading.show({
      template: 'Cargando artistas...'
    });
  };
   $scope.abrirLoadingPreCargado = function() {
    $ionicLoading.show({
      template: 'Cargando artistas...'
    });
  };

  $scope.abrirLoadingArtistaSolo = function() {
    $ionicLoading.show({
      template: 'Cargando artista.'
    });
  };

  $scope.cerrarLoading = function(){
    $ionicLoading.hide();
  };

  document.addEventListener("deviceready", function () {
        var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        var model = $cordovaDevice.getModel();
        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();
        var version = $cordovaDevice.getVersion();



      //  alert("device model =>" +device.model);
        //alert("device manufacturer =>" +device.manufacturer);
        $rootScope.marca  =  device.manufacturer ; 
      //  alert("device platform =>" +device.platform);
      //  alert("cordova =>" +cordova);
      //  alert("model =>" +model);
      //  alert("platform =>" +platform);
      //  alert("uuid =>" +uuid);
      //  alert("version =>" +version);

        }, false);

    $rootScope.loginData = {};
   
   // window.localStorage.setItem('clienteLogueado',null);

    $rootScope.dataClienteRegistrado =[];
    $rootScope.loginData.login = false;
    
    $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
    $rootScope.dataArtistaRegistrado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
     console.log("data");
     //console.log(window.localStorage.getItem('clienteLogueado'));
    console.log(JSON.stringify(JSON.parse(window.localStorage.getItem('clienteLogueado'))));
    
    if(JSON.stringify(JSON.parse(window.localStorage.getItem('clienteLogueado'))) != "null" ){
      $rootScope.loginData.login = true;
       $rootScope.loginData.isClient = true;
       //console.log(window.localStorage.getItem('clienteLogueado'));
     
      console.log("cliente logueado ");
      //console.log(JSON.stringify(JSON.parse(window.localStorage.getItem('clienteLogueado'))));
      //console.log(JSON.stringify($rootScope.dataClienteRegistrado));
    }else{
      console.log("No se encontro ningun cliente logueado.");
      if(JSON.stringify(JSON.parse(window.localStorage.getItem('artistaLogueado'))) != "null" ){
         console.log("artisla logueado");
         console.log(JSON.stringify(JSON.parse(window.localStorage.getItem('artistaLogueado'))));
           $rootScope.loginData.login = true;
           $rootScope.loginData.isClient = false;

      }else{
        console.log("No se encontro ningun artista logueado.");
      }

    }


  //console.log("valor usuario " + window.localStorage.getItem('usuario'));
    /*
    if( window.localStorage.getItem('usuario') === "" || 
        window.localStorage.getItem('usuario') === null  ||
         window.localStorage.getItem('usuario') === undefined ||
         window.localStorage.getItem('clave') === ""  ||  
           window.localStorage.getItem('clave') === undefined  ||  
         window.localStorage.getItem('clave') === null 
          ){
           
           
          }
          else{
           $rootScope.artistaLogueado = window.localStorage.getItem('artistaLogueado');
           $rootScope.loginData.login = true;

          }
    */

    var idUsuarioLog = true ; 

   $rootScope.shuffleArray = function(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle
        while (m) {

          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);

          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }

        return array;
      }


 
      $rootScope.llamaFireBaseActualizar = function (id){

            var active = dataBase.result;
            var data = active.transaction(["artistas"], "readwrite");
            var object = data.objectStore("artistas");
            var codigofiltro = id; 

            object.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;
              if(cursor) {
                if(parseInt(cursor.value.idArtista) === parseInt(codigofiltro)) {
                  var request = cursor.delete();
                  request.onsuccess = function() {
                    //console.log('Deleted' + codigofiltro );
                      $http.get('https://inkgpsapp.firebaseio.com/DataId/'+codigofiltro+'.json')
                     //  $http.get('https://inkgpsapp.firebaseio.com/DataId/00.json')
                
                      .error(function(data, status, headers, config){
                        alert("**** Verificar conexion a internet ****");
                    
                      })
                     .then(function(response){
                               $scope.resultadoCodigo =  response.data ; 
                   
                               //console.log(  $scope.resultadoCodigo );
                               //console.log(  $scope.resultadoCodigo.id );
                                var active = dataBase.result;
                                var data = active.transaction(["artistas"], "readwrite");
                                var object = data.objectStore("artistas");
                                 

                                  var request = object.put({
                                      texto: $scope.resultadoCodigo,
                                      idArtista: $scope.resultadoCodigo.id
                                      
                                  });

                                  request.onerror = function (e) {
                                      console.log(request.error.name + '\n\n' + request.error.message);
                                  };

                                  data.oncomplete = function (e) {
                                    
                                      console.log('Objeto agregado correctamente');                                     
                                      return;                 
                                };
                          
                      });
                  };
                } else {
                   // console.log('NO ENCONTRO -- ' + cursor.value.idArtista +"- " +  codigofiltro);
                }
                cursor.continue();        
              } else {
                console.log('Entries displayed.');         
              }
            };

              

      }
      $rootScope.llamaFireBase = function (){
     

             $http.get('https://vivid-inferno-5389.firebaseio.com/Numeros.json')
             //$http.get('https://artistasid.firebaseio.com//Numeros.json')
                          
                                  .error(function(data, status, headers, config){
                                  //alert("**** Verificar conexion a internet ****");
                                 // alert(status);
                                 // alert(angular.toJson(data))
                                  })
                                  .then(function(response){
                                    $scope.numeroArray = [];
                                    $scope.numeroData  =  response.data ; 
                                    $scope.cantidadNumeros =  $scope.numeroData.split(",");
                                    //alert($scope.cantidadNumeros.length);
                                   
                                    for (var i = 0; i < $scope.cantidadNumeros.length ; i++) {
                                      $scope.numeroArray = $scope.numeroArray.concat(
                                                                                    {
                                                                                      id:i , 
                                                                                      codigo:$scope.cantidadNumeros[i]
                                                                                    }
                                                                                  );
                                    }
                                   // console.log($scope.numeroArray);
                                    $rootScope.shuffleArray( $scope.numeroArray);
                                   // console.log("despues");
                                   // console.log($scope.numeroArray);
                                    $rootScope.artistas = [];  
                                   

                                    for (var i = 0; i < 10; i++) {

                                           $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.numeroArray[i].codigo+'.json')
                          
                                            .error(function(data, status, headers, config){
                                            //alert("**** Verificar conexion a internet ****");
                                           // alert(status);
                                           // alert(angular.toJson(data))
                                            })
                                            .then(function(response){
                                                      $rootScope.shuffleArray(response.data.trabajos);
                                                      $rootScope.artistas.push(response.data);
                                                       $scope.cerrarLoading();
                                                   


                                            });

                                      
                                    }


                                  });




      }

    //;
    $rootScope.cargaDescubrir =  function (){
      $scope.abrirLoadingPreCargado();   
      $rootScope.artistas =[];
      console.log("entra carga descubir ");
      

      $rootScope.llamaFireBase();
      primer = 1 ;
    }



    if(primer === 0){
       $rootScope.cargaDescubrir();  
    } 





   

     $scope.agendarCitaData = {};
      $scope.selImagenAgendarCita= function() {
          

          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 600,
            targetHeight: 600
          };

          $cordovaCamera.getPicture(options).then(function(imageUri) {
          //  console.log('img', imageUri);
         
            //$scope.images.push(imageUri);
             $scope.agendarCitaData.imagen =  imageUri;
                
          }, function(err) {
          // error
          });

      };



  $scope.tiposProcedimientoCita = [
    { text: "Tatuaje", value: "Tatuaje" },
    { text: "Cover up", value: "Cover up" },
    { text: "Modificacion corporal", value: "Modificacion corporal" }
  ];
  $scope.agendarCitaData.tipoProcedimiento = 'Tatuaje';
  $scope.agendarCitaData.nombre = '';
  $scope.agendarCitaData.ancho = '10';
  $scope.agendarCitaData.alto= '10';
  $scope.agendarCitaData.zona  ='Pecho';
  $scope.agendarCitaData.zonaModificacion = 'Pecho';
  $scope.agendarCitaData.tipoModificacion = 'Piercing';


    $scope.mensajeNombreRequerido = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Información',
       template: 'El campo nombre es requerido',
        buttons: [
                     
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                               //  console.log("ok")
                                  //return scope.data.response;

                              }
                        }
                ]

     });

       alertPopup.then(function(res) {
       // console.log('Thank you for not eating my delicious ice cream cone');
       });
    };
  $scope.validarEmailParaEnvio = function(){
    

   // alert( $rootScope.mailEnvio );
   // alert($rootScope.nombreEnvio);
      if($scope.agendarCitaData.nombre === "" || $scope.agendarCitaData.nombre === null  ){
           $scope.mensajeNombreRequerido();

      }else{

         $scope.enviarMail();
      }

  }
  $scope.enviarMail = function(){


    
   
    if($scope.agendarCitaData.tipoProcedimiento != 'Modificacion corporal'){
      $scope.agendarCitaData.descripcion = "Hola, "+$rootScope.nombreEnvio + "<br><br>";
      $scope.agendarCitaData.descripcion += "Mi nombre es "+$scope.agendarCitaData.nombre+", me gustaría agendar una visita, ya que deseo realizarme un ";
      $scope.agendarCitaData.descripcion +=  $scope.agendarCitaData.tipoProcedimiento +", con las siguientes características: <br><br>" ;
      $scope.agendarCitaData.descripcion += "Ancho:" + $scope.agendarCitaData.ancho +" CM<br>";
      $scope.agendarCitaData.descripcion += "Alto:" + $scope.agendarCitaData.alto +" CM<br>";
      $scope.agendarCitaData.descripcion += "Zona del cuerpo:" + $scope.agendarCitaData.zona +"<br><br>";
      if($scope.agendarCitaData.imagen != undefined || $scope.agendarCitaData.imagen != "unidefined"){
        $scope.agendarCitaData.descripcion += "Adjunto imagen de lo que deseo.";
      }
    }else{
      $scope.agendarCitaData.descripcion = "Hola, "+$scope.artistaSeleccionado.nombre + "<br><br>";
      $scope.agendarCitaData.descripcion += "Mi nombre es "+$scope.agendarCitaData.nombre+", me gustaría agendar una visita, ya que deseo realizarme una ";
      $scope.agendarCitaData.descripcion +=  $scope.agendarCitaData.tipoProcedimiento +", con las siguientes características: <br><br>" ;
      $scope.agendarCitaData.descripcion += "Tipo modificación:" + $scope.agendarCitaData.tipoModificacion +"<br>";
      $scope.agendarCitaData.descripcion += "Zona del cuerpo:" + $scope.agendarCitaData.zonaModificacion +"<br><br>";
      if($scope.agendarCitaData.imagen != undefined || $scope.agendarCitaData.imagen != "unidefined" || $scope.agendarCitaData.imagen != "" || $scope.agendarCitaData.imagen != null ){
        $scope.agendarCitaData.descripcion += "Adjunto imagen de lo que deseo.";
      }

    }
   // console.log($scope.agendarCitaData.imagen);
    //console.log($scope.agendarCitaData.descripcion);

    // $scope.agendarCitaData.descripcion  = "<h5>Hola</h5> <br><br> <h2>Mi nombre es "+$scope.agendarCitaData.nombre+", estoy interesado en un "+$scope.agendarCitaData.tipoProcedimiento+", las medidas son ancho:"+$scope.agendarCitaData.ancho+" cm alto:" + $scope.agendarCitaData.alto+" la zona  en la cual lo deseo es " + $scope.agendarCitaData.zona+"</h2>";
    
              $cordovaSocialSharing
                .shareViaEmail( $scope.agendarCitaData.descripcion , 
                                "InkGps Solicitud de cita", 
                                 $rootScope.mailEnvio , 
                                null, 
                                "socialinkgps@gmail.com", 
                                $scope.agendarCitaData.imagen)
                .then(function(result) {
                $scope.cerrarAgendarCita();
                  // Success!
                }, function(err) {
                  alert("fallo");
                  // An error occurred. Show a message to the user
              });
    

    }


 $scope.registroData = {};
  $scope.registrarUsuario = function(){
    console.log($scope.registroData.email);
    console.log($scope.registroData.clave);
    if($scope.registroData.email != null  ){
      if($scope.registroData.clave === $scope.registroData.reclave){
         var ref = firebase.database().ref();
          firebase.auth().createUserWithEmailAndPassword($scope.registroData.email, $scope.registroData.clave).then(function(userResponse) {
            $rootScope.loginData.login = true;
            $rootScope.loginData.isClient = true;
            console.log(userResponse);
            alert($scope.registroData.email +", Gracias por tu registro muy pronto nos pondremos en contacto contigo !!!");
            var ref =  firebase.database().ref() ;
            var refUser = ref.child("PuntosCliente").child(userResponse.uid);
             console.log(refUser);
              refUser.set({
                  puntos: 20,
                  tipoUsuario:"cliente"
              });
            $scope.cerrarRegistro();
            }, function(error){
            console.log(error);
          });
      }
    }

   
  }
   $scope.loginDataArtista= {};
 
  $scope.loginArtistaEmail = function() {

    // console.log($scope.loginDataArtista.email);
     //console.log($scope.loginDataArtista.clave);
     firebase.auth().signInWithEmailAndPassword($scope.loginDataArtista.email, $scope.loginDataArtista.clave).then(function(pasa) {
      // Handle Errors here.
     console.log("log exitoso");
     alert("registro exitoso");
     $rootScope.loginData.login = true;
     $rootScope.loginData.isClient = false;
     console.log(pasa.uid);
 
     window.localStorage.setItem('artistaLogueado',JSON.stringify(pasa));
    
   

     $scope.cerrarLogin();


      // ...
    })
   .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
      // ...
    });


  }
  
 // var fb = new Firebase("https://ink360-b7047.firebaseio.com");

  var auth = $firebaseAuth(authF);
  $scope.ingresoYregistroFacebook = function(){
 
     $cordovaOauth.facebook("968981486540678", ["email"]).then(function(result) {
           //alert(result);
           //$scope.resultado =  result ; 
          //alert("obtiene  token referencia CREDENCIAL: " + result.access_token );
          var credential = new firebase.auth.FacebookAuthProvider.credential(result.access_token);

          authF.signInWithCredential(credential).then(function(user) {
            console.log("Sign In Success");
            console.log(user);
            console.log(JSON.stringify(user));

            $rootScope.dataClienteRegistrado = user; 
            console.log($rootScope.dataClienteRegistrado.displayName);
           
                    
            idUsuarioLog = true; 
            $rootScope.loginData.login = true;
            $rootScope.loginData.isClient = true;
            alert($scope.dataClienteRegistrado.displayName +",Gracias por tu registro muy pronto nos pondremos en contacto contigo !!!");
          
           
            var ref =  firebase.database().ref() ;           
            var refUser = ref.child("PuntosCliente").child(user.uid);
            
            

            $scope.datosClientes  = {};

             ref.child("puntosPorRegistro").on("value", function(datos){
                console.log("puntos x registro " + datos.val());
                $scope.datosClientes.puntosRegistro  = datos.val() ; 
             });
            $rootScope.dataClienteRegistrado.puntos = 0 ;
            refUser.child("puntos").on("value", function(datos){
              
                $rootScope.dataClienteRegistrado.puntos  = datos.val();
                 console.log("puntos = " + $rootScope.dataClienteRegistrado.puntos  );
                  if( $rootScope.dataClienteRegistrado.puntos < 20 ){
                    console.log("usuario nuevo");
                    refUser.set({
                      puntos: $scope.datosClientes.puntosRegistro,
                      tipoUsuario:"cliente",
                      puntosEnCanje : 0 ,
                      paqueteCalificacion : 0 ,
                      posicionCalificacion : 0 ,
                      fechaUltimaCalificacion : 'nuevo',
                      fechaIngreso : 'nuevo'
                    });

                  }else{
                    console.log("usuario existente no se recarga");
                  }
                 
                 window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));
              });
              
           
              
            $scope.cerrarLoginCliente();

          
          }, function(error) {
            console.log("Sign In Error", error);
          });
      

        }, function(error) {
            console.log("ERROR: " + error);
            alert("ERROR: " + error);
        });   

   /*
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_friends');
    var authService = firebase.auth();
    alert("inicia llamado redirect");
   
    authService.signInWithRedirect(provider);
    authService.getRedirectResult().then(function(result) {
      console.log(result);
      if (result.credential) {
       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
        // ...
        }
      // The signed-in user info.
       var user = result.user;
      }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage);
            // ...
        });
    */
    /*authService.signInWithPopup(provider)
        .then(function(result) {
            //todo correcto
            console.log('autenticado usuario ', result.user);
            console.log(result);
            alert("nombre en redes :" + result.user.displayName);
            alert("email : " + result.user.email);
           


        })
        .catch(function(error) {
            // error de login
            alert("error");
            alert(error);
            console.log('Detectado un error:', error);
        });
    */

  }
 $scope.loginClienteData  = {};
 $scope.loginCliente = function (){
   
  console.log($scope.loginClienteData.email);
    console.log($scope.loginClienteData.clave);
   firebase.auth().signInWithEmailAndPassword($scope.loginClienteData.email, $scope.loginClienteData.clave).then(function(pasa) {
      // Handle Errors here.
     console.log("log exitoso");
     alert("registro exitoso");

      // ...
    })
   .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

 } 

$ionicModal.fromTemplateUrl('templates/RegistroCliente.html', {
    scope: $scope
  }).then(function(modalRegistro) {
    $scope.modalRegistro = modalRegistro;
  });

  // Triggered in the login modal to close it
  $scope.cerrarRegistro = function() {
    $scope.modalRegistro.hide();
  };

  // Open the login modal
  $scope.abrirRegistro = function() {

    $scope.modalRegistro.show();
  };

  $ionicModal.fromTemplateUrl('templates/loginCliente.html', {
    scope: $scope
  }).then(function(modalClienteLog) {
    $scope.modalClienteLog = modalClienteLog;
  });

  // Triggered in the login modal to close it
  $scope.cerrarLoginCliente= function() {
    $scope.modalClienteLog.hide();
  };

  // Open the login modal
  $scope.abrirLoginCliente = function() {
   
    $scope.modalClienteLog.show();
  };

$scope.abrirVentanaRegistro = function(){
$scope.cerrarLoginCliente();
$scope.abrirRegistro();

}


$scope.logueado = 0 ; 

 //console.log("valor inicial ==>"  + $rootScope.loginData.usuarioAutenticado  );
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loginArtista.html', {
    scope: $scope
  }).then(function(modalLogin) {
    $scope.modalLogin = modalLogin;
  });

  // Triggered in the login modal to close it
  $scope.cerrarLogin = function() {
    $scope.modalLogin.hide();
  };

  // Open the login modal
  $scope.abrirLogin = function() {

    $scope.modalLogin.show();
  };

   // An alert dialog
 $scope.loginIncorrectoMensaje = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Información',
     template: 'Login incorrecto',
       buttons: [
                       
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                 // console.log("ok");
                                  //return scope.data.response;

                              }
                        }
                        ]
   });

   alertPopup.then(function(res) {
    // console.log('cierra mensaje');
   });
 };




  // Perform the login action when the user submits the login form
  $scope.informacion={};
  $scope.informacion.mostrarLogin =false;
  $scope.autentica = function() {
       $http.defaults.useXDomain = true;
      $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$rootScope.loginData.usuario+'.json')
      
      .error(function(data, status, headers, config){
      //alert("**** Verificar conexion a internet ****");
     // alert(status);
     // alert(angular.toJson(data))
      })
      .then(function(response){
      idUsuarioLog =   $stateParams.idParametro ; 
  
      $scope.obtenido = response.data ;  
      if(response.data === null ){
           $scope.loginIncorrectoMensaje();

      }else{
          $rootScope.artistaLogueado = response.data ; 
          if($rootScope.artistaLogueado.clave === $rootScope.loginData.clave){
             

                     // console.log('Doing login', $rootScope.loginData);
                      window.localStorage.setItem('usuario' ,  $rootScope.loginData.usuario);
                      window.localStorage.setItem('clave' ,  $rootScope.loginData.clave);
                      window.localStorage.setItem('artistaLogueado' ,  JSON.stringify($rootScope.artistaLogueado));
                    
                      idUsuarioLog = true; 
                      $rootScope.loginData.login = true;
                      $rootScope.loginData.isClient = false;

                      //console.log('Doing login', $rootScope.loginData);

                      $scope.cerrarLogin();
                

          }else{
               $scope.loginIncorrectoMensaje();
          }        
       }       
     });
  };

  $scope.cerrarSesion = function (){
       $rootScope.loginData.login = false;
      // window.localStorage.setItem('usuario' , "");
      // window.localStorage.setItem('clave' ,  "");
      // window.localStorage.setItem('artistaLogueado' ,  "");
      // window.localStorage.setItem('posicionEnFire' ,"");
      
       window.localStorage.setItem('clienteLogueado' , "null");
       window.localStorage.setItem('artistaLogueado' , "null");
       $state.go("app.descubrir");
  }




 /************************/


  $scope.nextVideo = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previousVideo = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChangedVideo = function(index) {
    $scope.slideIndex = index;
  };


$ionicModal.fromTemplateUrl('./templates/videoArtista.html', {
        scope: $scope
    }).then(function (modalVideo) {
        $scope.modalVideo = modalVideo;
    });

    // Triggered in the login modal to close it
    $scope.closeVideo = function () {
      
        $scope.modalVideo.hide();
          
    };

    // Open the login modal
    $scope.openVideo = function (id) {
     // alert("event");
       $scope.valorSeleccionadoVideo = id ; 
        $scope.modalVideo.show();
        
        //$scope.filtro.cargando = true;

    };


     // An alert dialog
 $scope.ventanaLoginIncorrecto = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Login incorrecto',
     template: 'El id de usuario o clave son invalidos.'
   });

   alertPopup.then(function(res) {
    console.log('Thank you for not eating my delicious ice cream cone');
   });
 };



//abrir url de manera segura
 $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

 $scope.toIntro = function(){
    $state.go('app.intro');
}

$scope.scrollTop = function() {//ng-click for back to top button
    $ionicScrollDelegate.scrollTop();
  };
  $scope.irArtistas = function() {//ng-click for back to top button
    
    //alert("entra");
     //$scope.filtro.cargando = true;
    //$window.location.href = '#/app/artistas';
  
     $window.location.href = '#/app/artistas';
   
    //$state.go('/app/artistas');
    //$window.location.reload(true);
      //alert("ENTRA 3");
  };
//$window.location.href = '#/app/artistas';
    $scope.esDescubrir  = false ; 

    $rootScope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
       //  console.log("ir tab index "  +$rootScope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else if (nombre === 'descubrir'){
            $state.go('app.'+nombre);
            $scope.esDescubrir  = false ;             
            for (var i = 0; i <  $rootScope.artistas.length; i++) {
                 $rootScope.shuffleArray($rootScope.artistas[i].trabajos);
               }
            $rootScope.shuffleArray($rootScope.artistas);
         }else if (nombre === 'artistas'){
            $state.go('app.'+nombre);
            $scope.esDescubrir  = true ;
           // $rootScope.shuffleArray($rootScope.artistas);
         }else if (nombre === 'login'){
           // $state.go('app.'+nombre);
            //$scope.esDescubrir  = true ;
            $scope.abrirLogin();
            //$rootScope.shuffleArray($rootScope.artistas);
         }
         else if (nombre === 'loginCliente'){
           // $state.go('app.'+nombre);
            //$scope.esDescubrir  = true ;
           
            $scope.abrirLoginCliente();
            //$rootScope.shuffleArray($rootScope.artistas);
         }
         else if (nombre === 'calificar'){
          console.log("ir calificacion");
          $state.go('app.'+nombre);
          //$state.reload();
         }
         else{

           $state.go('app.'+nombre);
         }
     
    }

 
   $scope.mostrarTamano = false;




 $scope.getScrollPosition = function() {
 //monitor the scroll
 //alert("ENTRA");
  $scope.moveData = $ionicScrollDelegate.getScrollPosition().top;
   //$('.scrollToTop').slideIn();
   $scope.mostrarScroll = false;
  if($scope.moveData>=600){
   // 
    $scope.mostrarScroll = true;
   
    $scope.$apply();
   //$scope.$watch;
    //alert("ebtra " + $scope.mostrarScroll);
      //$('.scrollToTop').fadeIn();
     // $scope.cantidad = "entra ";
   }else if($scope.moveData<600){
    //alert("ENTRA 2");
    
     $scope.$apply();
//       $('.scrollToTop').slideOut();
       //$scope.cantidad = "sale ";
   }
    
  };

$scope.valorfiltro=true;
 
//alert("entra"+$scope.valorfiltro);
$scope.show1 = function() {
    $ionicLoading.show({
      template: 'Cargando...',

    });
  };
  $scope.hide1 = function(){
    $ionicLoading.hide();
  };
 
  $scope.artistaSeleccionado = {};

   $ionicModal.fromTemplateUrl('./templates/detalleArtista.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };



    

     $ionicModal.fromTemplateUrl('./templates/artistaslista.html', {
        scope: $scope
    }).then(function (modal1) {
        $scope.modal1 = modal1;
    });

    // Triggered in the login modal to close it
    $scope.cerrarArtistas = function () {
        $scope.modal1.hide();
    };

    // Open the login modal
    $scope.mostrarArtistas = function () {
        $scope.modal1.show();
    };


    $ionicModal.fromTemplateUrl('./templates/agendarCita.html', {
        scope: $scope
    }).then(function (modalCita) {
        $scope.modalCita = modalCita;
    });

    // Triggered in the login modal to close it
    $scope.cerrarAgendarCita = function () {
        $scope.modalCita.hide();
    };

    // Open the login modal
    $scope.mostrarAgendarCita = function () {
        $scope.modalCita.show();
    };





                $scope.allImages = [{
 'src' : '1-1.jpg'
 }, {
 'src' : '1-2.jpg'
 }, {
 'src' : '1-3.jpg'
 }];
 
    
      //llamar servicio que devvuelve las ciudades 
        $http.defaults.useXDomain = true;
  $http.get('http://8-dot-inkdata-1019.appspot.com/ciudades')
    .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
     
      $scope.ciudadesCargadas = response.data;
      
    })
    //llamar al servicio para cargar estilo
    $http.defaults.useXDomain = true;
  $http.get('http://8-dot-inkdata-1019.appspot.com/estilos')
    
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
     
      $scope.estilosCargados = response.data;
      
    })
 var idGlobal = "";
    $scope.actualizarSeleccionado  = function (id) {
      alert(id);
       

    }
      $rootScope.nombreEnvio = "";

     $scope.cargarSeleccionado = function (id) {
      
      $scope.abrirLoadingArtistaSolo();
       //$scope.login();

        $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$rootScope.artistas[id].id+'.json')
    
        .error(function(data, status, headers, config){
          alert("**** Verificar conexion a internet ****");
      
        })
        .then(function(response){
          $scope.login();
         
          $scope.artistaUpdate = response.data;
          $rootScope.artistas[id] = $scope.artistaUpdate ;
          $scope.idArtista =  id+1;
          $rootScope.artistas[id] = $scope.artistaUpdate ; 
          $scope.artistaSeleccionado.id = $rootScope.artistas[id].id; 
          $scope.artistaSeleccionado.codigo = $rootScope.artistas[id].id; 
          $scope.artistaSeleccionado.nombre = $rootScope.artistas[id].nombre; 
          $rootScope.nombreEnvio = $rootScope.artistas[id].nombre;  
          $scope.artistaSeleccionado.estudio= $rootScope.artistas[id].estudio;
          $scope.artistaSeleccionado.especialidad = $rootScope.artistas[id].especialidad; 
          $scope.artistaSeleccionado.descripcion = $rootScope.artistas[id].descripcion; 
          $scope.artistaSeleccionado.imagen = $rootScope.artistas[id].imagen; 
          $scope.artistaSeleccionado.direccion = $rootScope.artistas[id].direccion; 
          $scope.artistaSeleccionado.celular = $rootScope.artistas[id].celular; 
          $scope.artistaSeleccionado.facebook = $rootScope.artistas[id].facebook; 
          $scope.artistaSeleccionado.twitter = $rootScope.artistas[id].twitter; 
          $scope.artistaSeleccionado.instagram = $rootScope.artistas[id].instagram; 
          $scope.artistaSeleccionado.trabajos = $rootScope.artistas[id].trabajos;
          $scope.artistaSeleccionado.opcionVideo = $rootScope.artistas[id].opcionVideo;
          $scope.artistaSeleccionado.videos = $rootScope.artistas[id].videos;
          $scope.artistaSeleccionado.latitud= $rootScope.artistas[id].latitud;
          $scope.artistaSeleccionado.longitud = $rootScope.artistas[id].longitud;
          $scope.artistaSeleccionado.ciudad = $rootScope.artistas[id].ciudad;
          $scope.artistaSeleccionado.verificado = $rootScope.artistas[id].verificado;
          $rootScope.mailEnvio  = $rootScope.artistas[id].correo;

          $scope.allImages = $scope.artistaSeleccionado.trabajos;
          $scope.artistaSeleccionado.usuarioFacebook = $rootScope.artistas[id].usuarioFacebook;
          $scope.artistaSeleccionado.usuarioTwitter = $rootScope.artistas[id].usuarioTwitter;
          $scope.mostrarTwitter  = false;
         // $scope.artistaSeleccionado.video1 = $scope.artistaSeleccionado.videos[0];
        //  console.log($scope.artistaSeleccionado.video1);
          if($scope.artistaSeleccionado.usuarioTwitter  === 'false')
          {
            
            $scope.mostrarTwitter  = false;
            //alert( $scope.artistaSeleccionado.mostrarTwitter);

          }else{
            $scope.mostrarTwitter  = true;
            // alert( $scope.artistaSeleccionado.mostrarTwitter);
          }

          $scope.artistaSeleccionado.usuarioInstagram = $rootScope.artistas[id].usuarioInstagram;
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

         // console.log($scope.artistaUpdate );
         


        

        


          

      });

       

                         
                                   

      }


    $scope.datos = {};   
    $scope.datos.ancho  = "";
    $scope.datos.alto = "";
    $scope.datos.vacio = "";

     $scope.verificarDatos = function () {



        //salert($scope.datos.ancho) ;
       
            //HREF
          //  $state.go('app.artistas');
                $window.location.href = '#/app/artistas';
            //$scope.mostrarArtistas();
      
       
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

  $scope.denunciar = function() {
    $scope.urlDenunciar = "http://goo.gl/forms/KTtH0p3vJe";
    window.open($scope.urlDenunciar, '_system', 'location=yes');
 }

  $scope.agendar = function() {
    $scope.urlAgendar = "http://goo.gl/forms/nXdfBTX0ea";
    window.open($scope.urlAgendar, '_system', 'location=yes');
 }
/*
$scope.getContactList = function() {
    $cordovaContacts.find({filter: ''}).then(function(result) {
        $scope.contacts = result;
    }, function(error) {
      //  console.log("ERROR: " + error);
    });
}*/
  
 $scope.whatsapp = function() {
  //$scope.getContactList();
 // alert($scope.contacts);
    //cordova.plugins.Whatsapp.send("+573102683586");
   cordova.plugins.Whatsapp.send($scope.artistaSeleccionado.celular);

 }


 $scope.openGeo = function() {
    $scope.latitude =  $scope.artistaSeleccionado.latitud;
      $scope.longitude =  $scope.artistaSeleccionado.longitud;
    window.open('geo:' + $scope.latitude + ',' + $scope.longitude + '?z=11&q=' + $scope.latitude + ',' + $scope.longitude + '(Treasure)', '_system', 'location=yes');
}


//cordova.plugins.Whatsapp.send("1112223333");



    
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




    $scope.valorRegla = {
        val: 1
      };

      $scope.valorReglaAgenda = {
        val: 1
      };

   
    
  $scope.filtro={};
 $scope.regla = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
  /*for (var i = 2; i <= 101; i++) {
    
    $scope.regla[i] = i;
  
  };*/
  $scope.filtro.tipoRegla = "1"; //valor ancho  2  valor alto 
  $scope.filtro.estilo = "Todos";
  $scope.filtro.codigo = "";
  $scope.filtro.nombre = "";
   $scope.filtro.ciudad = "Todos";
   $scope.filtro.ancho = 10;
   $scope.filtro.alto = 10;
   $scope.filtro.tamanoMinimo = 16 ; //tatuaje minimo de 16 cm 
   $scope.filtro.tamanoMinimo = 2500 ; //tatuaje minimo de 16 cm 
   $scope.filtro.tiempoTotalTatuaje =  "1 a 5 horas";
   $scope.filtro.cantidadSesiones = 1;
   $scope.filtro.intensidadDeDolor ="Media" ; //1 = bajo  , 2 = medio , 3 = alto 
   $scope.filtro.zona = "Cabeza";
   $scope.filtro.resultadoEnFiltro = false;
   $scope.filtro.cargando = false;
   $scope.filtro.mostrarVideo = $scope.artistaSeleccionado.opcionVideo;
   $scope.filtro.iniciaFiltro =true;

 $ionicModal.fromTemplateUrl('./templates/filtro.html', {
        scope: $scope
    }).then(function (modalFiltro) {
        $scope.modalFiltro = modalFiltro;
    });

    // Triggered in the login modal to close it
    $scope.closeFiltro = function () {
        $scope.modalFiltro.hide();
           $scope.filtro.cargando = false;
    };

    // Open the login modal
    $scope.openFiltro = function () {
     // alert("event");
        $scope.modalFiltro.show();
         $scope.filtro.resultadoEnFiltro = false;
        //$scope.filtro.cargando = true;

    };
    
    $scope.verificaFiltro = function(){
      //console.log($rootScope.loginData) ; 
        
       // console.log($rootScope.loginData) ; 
         //    console.log( $scope.filtro.estilo + " --- "+ $scope.filtro.ciudad + "--" + $scope.filtro.mostrarCodigo ) ; 
        if ($scope.filtro.estilo === "Todos" && $scope.filtro.ciudad === "Todos") {
              if ($scope.filtro.mostrarCodigo === "undefined" || !$scope.filtro.mostrarCodigo ) {
           //       console.log("no selecciono filtro  ");
            //       console.log("no hacer nada" + $scope.siFiltrar);

                   var confirmPopup = $ionicPopup.confirm({
                       title: 'Información',
                       template: "<center>Esta consulta puede tardar varios segundos.</center>",
                       buttons: [
                        { text: 'Cancelar' },
                        {
                          text: '<b>Ok</b>',
                          type: 'button-assertive'
                              ,onTap: function(e) {
                                  //e.preventDefault();
                                  
                              // Returning a value will cause the promise to resolve with the given value.
                                  $scope.filtrar();
                                  //return scope.data.response;

                              }
                        }
                        ]
                    });

                   confirmPopup.then(function(res) {
                   // console.log("res" + res);
                     
                   });
                  
              }
              else if($scope.filtro.codigo != "undefined" || $scope.filtro.codigo != "" && $scope.filtro.estilo === "Todos" && $scope.filtro.ciudad === "Todos"){
                  $scope.filtrar();

              }
        }else{

            $scope.filtrar();

        }

    }
     $scope.estilos = [];
     $scope.mostrarTextoEstilo = function(idEstilo) {
   
      $http.get('./templates/estilo.json').success (function(data){
        $scope.estilos = data;
         
       // console.log($scope.estilos);
      });
         // console.log("entra ==" + $scope.estilos);

       var alertPopup = $ionicPopup.alert({
         title: $scope.estilos[2].nombre,
         template: "<p class='justificar'>"+$scope.estilos[idEstilo].descripcion+"</p>",
          buttons: [
          { text: 'Ok' ,
           type: 'button-assertive'
         }]
       });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };

     $scope.mostrarTextoNoEncontroCodigo = function() {
   
   

       var alertPopup = $ionicPopup.alert({
         title: "Información",
         template: "No se encontraron resultados.",
          buttons: [
          { text: 'Ok' ,
           type: 'button-assertive'
         }]
       });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };
   
  //$scope.artistas ;
    $scope.abrirLoadingArtistaSolo = function() {
    $ionicLoading.show({
      template: 'Cargando artista.'
    });
  };

  $scope.cerrarLoading = function(){
    $ionicLoading.hide();
  };
  
    $scope.cargarSeleccionadoFiltro = function (id) {
    // alert("entra");
      
    $scope.abrirLoadingArtistaSolo();
    
        $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.artistasResultado[id].id+'.json')
    
        .error(function(data, status, headers, config){
          alert("**** Verificar conexion a internet ****");
      
        })
        .then(function(response){
            $scope.login();
            
            $scope.idArtista =  id+1;
            $scope.artistaUpdate = response.data;
            $scope.artistasResultado[id] = $scope.artistaUpdate ;
            $scope.artistaSeleccionado.id =$scope.artistasResultado[id].id; 
            $scope.artistaSeleccionado.codigo =$scope.artistasResultado[id].id; 
            $scope.artistaSeleccionado.nombre = $scope.artistasResultado[id].nombre; 
            $rootScope.nombreEnvio = $scope.artistasResultado[id].nombre;  
            $scope.artistaSeleccionado.estudio= $scope.artistasResultado[id].estudio;
            $scope.artistaSeleccionado.especialidad = $scope.artistasResultado[id].especialidad; 
            $scope.artistaSeleccionado.descripcion = $scope.artistasResultado[id].descripcion; 
            $scope.artistaSeleccionado.imagen = $scope.artistasResultado[id].imagen; 
            $scope.artistaSeleccionado.direccion = $scope.artistasResultado[id].direccion; 
            $scope.artistaSeleccionado.celular = $scope.artistasResultado[id].celular; 
            $scope.artistaSeleccionado.facebook = $scope.artistasResultado[id].facebook; 
            $scope.artistaSeleccionado.twitter = $scope.artistasResultado[id].twitter; 
            $scope.artistaSeleccionado.instagram = $scope.artistasResultado[id].instagram; 
            $scope.artistaSeleccionado.trabajos = $scope.artistasResultado[id].trabajos;
            $scope.artistaSeleccionado.opcionVideo = $scope.artistasResultado[id].opcionVideo;
            $scope.artistaSeleccionado.videos = $scope.artistasResultado[id].videos;
            $scope.artistaSeleccionado.latitud= $scope.artistasResultado[id].latitud;
            $scope.artistaSeleccionado.longitud = $scope.artistasResultado[id].longitud;
            $scope.artistaSeleccionado.ciudad = $scope.artistasResultado[id].ciudad;
             $scope.artistaSeleccionado.verificado = $scope.artistasResultado[id].verificado;
            $scope.allImages = $scope.artistasResultado.trabajos;
            $rootScope.mailEnvio = $scope.artistasResultado[id].correo ;
            $scope.artistaSeleccionado.usuarioFacebook = $scope.artistasResultado[id].usuarioFacebook;
            $scope.artistaSeleccionado.usuarioTwitter =$scope.artistasResultado[id].usuarioTwitter;
            $scope.mostrarTwitter  = false;
            //$scope.artistaSeleccionado.video1 = $scope.artistaSeleccionado.videos[0];
           // console.log($scope.artistaSeleccionado.video1);
            if($scope.artistaSeleccionado.usuarioTwitter  === 'false')
            {
              
              $scope.mostrarTwitter  = false;
              //alert( $scope.artistaSeleccionado.mostrarTwitter);

            }else{
              $scope.mostrarTwitter  = true;
              // alert( $scope.artistaSeleccionado.mostrarTwitter);
            }

            $scope.artistaSeleccionado.usuarioInstagram = $scope.artistasResultado[id].usuarioInstagram;
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


          });
        
 
    };


    
    $scope.filtrar = function () {

 
      $scope.filtro.iniciaFiltro =false;
      $scope.abrirLoading();
    //  $scope.filtro.cargando = true;

      
       //$window.location.reload(true);
      $http.defaults.useXDomain = true;


    //  $http.get('http://8-dot-inkdata-1019.appspot.com/inkdata')
   /*     $http.get('https://inkgpsapp.firebaseio.com/data.json')
      .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);
      })
      .error(function(data, status, headers, config){
      //alert("**** Verificar conexion a internet ****");
     // alert(status);
     // alert(angular.toJson(data))
      })
      .then(function(response){*/
      //alert("**** THEN ****"+ response.data);
      // $scope.filtro.cargando = true;
        
        $scope.resultadoFiltro =[];
     
          //SI BUSCA TODOS
          console.log("estilo = " + $scope.filtro.estilo);
           console.log("ciudad = " + $scope.filtro.ciudad);
            console.log("codigo = " + $scope.filtro.codigo);

        if($scope.filtro.estilo === "Todos" && $scope.filtro.ciudad === "Todos" && $scope.filtro.codigo === "" )
        {  
             $scope.abrirLoading();
          // console.log("entra");
          /*
            var active = dataBase.result;
            var data = active.transaction(["artistas"], "readwrite");
            var object = data.objectStore("artistas");
            var objectStoreRequest = object.clear();

            objectStoreRequest.onsuccess = function(event) {
              // report the success of our clear operation
              $scope.abrirLoadingPreCargado();
              $rootScope.llamaFireBase();
              $scope.artistasResultado = $rootScope.artistas; 
              $scope.filtro.mostrarCodigo = false;
            };
            */
              $http.get('https://vivid-inferno-5389.firebaseio.com/Numeros.json')
                          
                                  .error(function(data, status, headers, config){
                                  //alert("**** Verificar conexion a internet ****");
                                 // alert(status);
                                 // alert(angular.toJson(data))
                                  })
                                  .then(function(response){
                                    $scope.numeroArray = [];
                                    $scope.numeroData  =  response.data ; 
                                    $scope.cantidadNumeros =  $scope.numeroData .split(",");
                                    //alert($scope.cantidadNumeros.length);
                                    for (var i = 0; i < $scope.cantidadNumeros.length; i++) {
                                      $scope.numeroArray = $scope.numeroArray.concat(
                                                                                    {
                                                                                      id:i , 
                                                                                      codigo:$scope.cantidadNumeros[i]
                                                                                    }
                                                                                  );
                                    }
                                    console.log($scope.numeroArray);
                                    $rootScope.shuffleArray( $scope.numeroArray);
                                   // alert("despues");
                                    console.log($scope.numeroArray);
                                     
                                   $scope.artistasResultado = [];

                                    for (var i = 0; i < $scope.numeroArray.length; i++) {

                                           $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.numeroArray[i].codigo+'.json')
                          
                                            .error(function(data, status, headers, config){
                                            //alert("**** Verificar conexion a internet ****");
                                           // alert(status);
                                           // alert(angular.toJson(data))
                                            })
                                            .then(function(response){
                                                $rootScope.shuffleArray(response.data.trabajos);
                                                       $scope.artistasResultado.push(response.data);
                                                      
                                                   


                                            });

                                      
                                    }
                                     $scope.cerrarLoading();


                         });


        }




          //SI BUSCA  POR CODIGO 
        if ($scope.filtro.codigo != "") {
           $scope.abrirLoadingArtistaSolo();


            $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.filtro.codigo+'.json')
                     //  $http.get('https://inkgpsapp.firebaseio.com/DataId/00.json')
                
                      .error(function(data, status, headers, config){
                        $scope.cerrarLoading();
                        $scope.mostrarTextoNoEncontroCodigo();
                        alert("**** Verificar conexion a internet ****");
                    
                      })
                     .then(function(response){
                     
                      $scope.resultadoCodigo =  response.data ; 
                      //alert($scope.resultadoCodigo);
                          if($scope.resultadoCodigo === null){
                                  $scope.cerrarLoading();
                                 $scope.mostrarTextoNoEncontroCodigo();
                                 return;

                          }else{
                           
                              $rootScope.shuffleArray(response.data.trabajos);

                                        $scope.filtro.estilo = "Todos";
                                        $scope.filtro.ciudad = "Todos" 
                                        $scope.siFiltro  = false;
                                        $scope.filtro.mostrarCodigo = false;
                                 
                                             //  alert("entra if");
                                        $scope.resultadoFiltro = $scope.resultadoCodigo;
                                        $scope.siFiltro = true;
                                        $scope.artistasResultado =[];
                                        $scope.artistasResultado.push($scope.resultadoFiltro);
                                        $scope.filtro.cargando = false;
                                        $scope.cerrarLoading();
        
                          }
                      });

/*

            var active = dataBase.result;
            var data = active.transaction(["artistas"], "readwrite");
            var object = data.objectStore("artistas");
            var codigofiltro =  $scope.filtro.codigo ; 
           // alert("entra evento" + codigofiltro);
            object.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;
              //alert(cursor);
              if(cursor) {

                if(parseInt(cursor.value.idArtista) === parseInt(codigofiltro)) {
                  var request = cursor.delete();
                  request.onsuccess = function() {
                    //console.log('Deleted' + codigofiltro );
                      $http.get('https://inkgpsapp.firebaseio.com/DataId/'+codigofiltro+'.json')
                     //  $http.get('https://inkgpsapp.firebaseio.com/DataId/00.json')
                
                      .error(function(data, status, headers, config){
                        alert("**** Verificar conexion a internet ****");
                    
                      })
                     .then(function(response){
                      $scope.resultadoCodigo =  response.data ; 
                      //alert($scope.resultadoCodigo);
                          if($scope.resultadoCodigo === null){
                                 $scope.mostrarTextoNoEncontroCodigo();
                                 return;

                          }else{
                               //console.log(  $scope.resultadoCodigo );
                               //console.log(  $scope.resultadoCodigo.id );
                                var active = dataBase.result;
                                var data = active.transaction(["artistas"], "readwrite");
                                var object = data.objectStore("artistas");
                                 

                                  var request = object.put({
                                      texto: $scope.resultadoCodigo,
                                      idArtista: $scope.resultadoCodigo.id
                                      
                                  });

                                  //alert(request);

                                  request.onerror = function (e) {
                                      console.log(request.error.name + '\n\n' + request.error.message);
                                  };

                                  data.oncomplete = function (e) {
                                    
                                      console.log('Objeto agregado correctamente');
                                        $scope.artistasCodigo = $rootScope.artistas;
                                         //$scope.trabajos = $scope.artistasCodigo[1].trabajos;
                                         $scope.trabajosjson = JSON.stringify($scope.artistasCodigo);

                                        $scope.filtro.estilo = "Todos";
                                        $scope.filtro.ciudad = "Todos" 
                                        $scope.siFiltro  = false;
                                        $scope.filtro.mostrarCodigo = false;
                                           for (var i=0; i<$scope.artistasCodigo.length; i++){
                                      //alert($scope.artistas[i].id + "   " + $scope.filtro.codigo);

                                            if(parseInt($scope.artistasCodigo[i].id) === parseInt(codigofiltro))
                                              {
                                             //  alert("entra if");
                                                $scope.resultadoFiltro = $scope.artistasCodigo[i];
                                                $scope.siFiltro = true;
                                                $scope.artistasResultado =[];
                                                $scope.artistasResultado.push($scope.resultadoFiltro);
                                                $scope.filtro.cargando = false;
                                                 $scope.cerrarLoading();
                                                return;
                                              }
                                          }  
                                          return;

                                      //alert("tamaño fin" + $scope.artistas.length);
                                     
                                    
                                    
                                };
                          }
                      });
                  };
                } else {
                    //console.log('NO ENCONTRO -- ' + cursor.value.idArtista +"- " +  codigofiltro);
                }
                cursor.continue();        
              } else {
                console.log('finalizo');         
              }
            };*/

       
        }

      
        //SI BUSCA POR  ESTILO
        if($scope.filtro.estilo != "Todos" && $scope.filtro.ciudad == "Todos" )
        {



 

             $http.get('https://vivid-inferno-5389.firebaseio.com/Estilos.json')
                          
                                  .error(function(data, status, headers, config){
                                  //alert("**** Verificar conexion a internet ****");
                                 // alert(status);
                                 // alert(angular.toJson(data))
                                  })
                                  .then(function(response){
                                    $scope.numeroArray = [];
                                    $scope.numeroData  =  response.data ; 
                                    $scope.cantidadNumeros =  $scope.numeroData.split(",");

                                    //alert($scope.cantidadNumeros.length);
                                    for (var i = 0; i < $scope.cantidadNumeros.length; i++) {
                                      $scope.tempData  = $scope.cantidadNumeros[i].split("-");
                                      $scope.tempId = $scope.tempData[0];
                                      $scope.tempEstilo = $scope.tempData[1];
                                     
                                      $scope.numeroArray = $scope.numeroArray.concat(
                                                                                    {
                                                                                      id:i , 
                                                                                      codigo: $scope.tempId,
                                                                                      estilo : $scope.tempEstilo
                                                                                    }
                                                                                  );
                                      
                                    }
                                    console.log($scope.numeroArray);
                                    $rootScope.shuffleArray( $scope.numeroArray);
                                    //alert("despues 1");
                                    console.log($scope.numeroArray);
                                    //$rootScope.artistas = [];  
                                   $scope.artistasResultado = [];

                                    for (var i = 0; i < $scope.numeroArray.length; i++) {

                                        if($scope.filtro.estilo === $scope.numeroArray[i].estilo ){
                                           $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.numeroArray[i].codigo+'.json')
                          
                                            .error(function(data, status, headers, config){
                                            //alert("**** Verificar conexion a internet ****");
                                           // alert(status);
                                           // alert(angular.toJson(data))
                                            })
                                            .then(function(response){
                                              $rootScope.shuffleArray(response.data.trabajos);
                                                       $scope.artistasResultado.push(response.data);
                                                      

                                            });
                                        }

                                      
                                    }
                                     $scope.cerrarLoading();


               });

$scope.cerrarLoading();

/*

           $scope.artistasCodigo = $rootScope.artistas;
            $rootScope.shuffleArray($scope.artistasCodigo);
          // $scope.trabajos = $scope.artistasCodigo[1].trabajos;
           $scope.trabajosjson = JSON.stringify($scope.artistasCodigo);
//alert("entra estilo");
          $scope.contador = 0
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistasCodigo.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistasCodigo[i].especialidad === $scope.filtro.estilo )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistasCodigo[i];
                   $scope.contador = $scope.contador +1 ; 

                   $scope.siFiltro = true;
                }

           }
           //alert("tamaño ---" + $scope.artistasFiltro.length);
           if($scope.siFiltro)
                {

                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                 $scope.artistasResultado =[];
                  for (var i=0; i<$scope.artistasFiltro.length; i++){

                      $scope.artistasResultado.push($scope.artistasFiltro[i]);

                  }
                  $scope.filtro.cargando = false;
               }else
               {
              //alert("No hay resultados , se mostraran todos los artistas ");
               $scope.mostrarTextoNoEncontroCodigo();
               $scope.filtro.cargando = false;
               }
        
       // alert("tamaño" + $scope.artistas.length);

        */


        }
        
         //SI BUSCA POR  CIUDAD
        if($scope.filtro.ciudad != "Todos" && $scope.filtro.estilo == "Todos" )
        {

             $http.get('https://vivid-inferno-5389.firebaseio.com/Ciudades.json')
                          
                                  .error(function(data, status, headers, config){
                                  //alert("**** Verificar conexion a internet ****");
                                 // alert(status);
                                 // alert(angular.toJson(data))
                                  })
                                  .then(function(response){
                                    $scope.numeroArray = [];
                                    $scope.numeroData  =  response.data ; 
                                    $scope.cantidadNumeros =  $scope.numeroData.split(",");

                                    //alert($scope.cantidadNumeros.length);
                                    for (var i = 0; i < $scope.cantidadNumeros.length; i++) {
                                      $scope.tempData  = $scope.cantidadNumeros[i].split("-");
                                      $scope.tempId = $scope.tempData[0];
                                      $scope.tempCiudad = $scope.tempData[1];
                                     
                                      $scope.numeroArray = $scope.numeroArray.concat(
                                                                                    {
                                                                                      id:i , 
                                                                                      codigo: $scope.tempId,
                                                                                      ciudad : $scope.tempCiudad
                                                                                    }
                                                                                  );
                                      
                                    }
                                    //onsole.log($scope.numeroArray);
                                    $rootScope.shuffleArray( $scope.numeroArray);
                                    //alert("despues 1");
                                    //console.log($scope.numeroArray);
                                   // $rootScope.artistas = [];  
                                   $scope.artistasResultado = [];

                                    for (var i = 0; i < $scope.numeroArray.length; i++) {

                                        if($scope.filtro.ciudad === $scope.numeroArray[i].ciudad ){
                                           $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.numeroArray[i].codigo+'.json')
                          
                                            .error(function(data, status, headers, config){
                                            //alert("**** Verificar conexion a internet ****");
                                           // alert(status);
                                           // alert(angular.toJson(data))
                                            })
                                            .then(function(response){
                                                $rootScope.shuffleArray(response.data.trabajos);
                                                       $scope.artistasResultado.push(response.data);
                                                      

                                            });
                                        }

                                        
                                    }
                                     $scope.cerrarLoading();


               }) 




/*

           $scope.artistasCodigo = $rootScope.artistas;
           $rootScope.shuffleArray($scope.artistasCodigo);
        //   $scope.trabajos = $scope.artistasCodigo[1].trabajos;
           $scope.trabajosjson = JSON.stringify($scope.trabajos);
         //    alert("entra ciudad");
          $scope.contador = 0
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistasCodigo.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistasCodigo[i].ciudad === $scope.filtro.ciudad )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistasCodigo[i];
                   $scope.contador = $scope.contador +1 ; 

                   $scope.siFiltro = true;
                }

           }
           //alert("tamaño ---" + $scope.artistasFiltro.length);
           if($scope.siFiltro)
                {

                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                $scope.artistasResultado =[];
                  for (var i=0; i<$scope.artistasFiltro.length; i++){

                      $scope.artistasResultado.push($scope.artistasFiltro[i]);

                  }
                  $scope.filtro.cargando = false;
               }else{
                $scope.filtro.cargando = false;
               }
        }
          */}
         //SI BUSCA POR  CIUDAD   Y  POR ESTILO 
        if($scope.filtro.ciudad != "Todos" && $scope.filtro.estilo != "Todos" && $scope.filtro.codigo === "")
        {

                  $http.get('https://vivid-inferno-5389.firebaseio.com/EstiloCiudad.json')
                          
                                  .error(function(data, status, headers, config){
                                  //alert("**** Verificar conexion a internet ****");
                                 // alert(status);
                                 // alert(angular.toJson(data))
                                  })
                                  .then(function(response){
                                    $scope.numeroArray = [];
                                    $scope.numeroData  =  response.data ; 
                                    $scope.cantidadNumeros =  $scope.numeroData.split(",");

                                    //alert($scope.cantidadNumeros.length);
                                    for (var i = 0; i < $scope.cantidadNumeros.length ; i++) {
                                      $scope.tempData  = $scope.cantidadNumeros[i].split("-");
                                      $scope.tempId = $scope.tempData[0];
                                //      console.log("id == " + $scope.tempData[1]);
                                      if($scope.tempData[1] != undefined){
                                        $scope.tempData2 = $scope.tempData[1].split("@");
                                  //    console.log("ESTI LO == " + $scope.tempData2[0]);
                                   //   console.log("CIUDAD == " + $scope.tempData2[1]);
                                        //alert($scope.tempData2);
                                      $scope.tempEstilo  = $scope.tempData2[0];
                                      $scope.tempCiudad  = $scope.tempData2[1];
                                    
                                     
                                      $scope.numeroArray = $scope.numeroArray.concat(
                                                                                    {
                                                                                      id:i , 
                                                                                      codigo: $scope.tempId,
                                                                                      ciudad : $scope.tempCiudad,
                                                                                      estilo : $scope.tempEstilo
                                                                                    }
                                                                                  );
                                      }
                                      
                                      
                                    }
                                    //console.log($scope.numeroArray);
                                    $rootScope.shuffleArray( $scope.numeroArray);
                                    //alert("despues 1");
                                   // console.log($scope.numeroArray);
                                    //$rootScope.artistas = [];  
                                   $scope.artistasResultado = [];

                                    for (var i = 0; i < $scope.numeroArray.length; i++) {

                                        if($scope.filtro.ciudad === $scope.numeroArray[i].ciudad && $scope.filtro.estilo === $scope.numeroArray[i].estilo ){
                                           $http.get('https://inkgpsapp.firebaseio.com/DataId/'+$scope.numeroArray[i].codigo+'.json')
                          
                                            .error(function(data, status, headers, config){
                                            //alert("**** Verificar conexion a internet ****");
                                           // alert(status);
                                           // alert(angular.toJson(data))
                                            })
                                            .then(function(response){
                                                $rootScope.shuffleArray(response.data.trabajos);
                                                       $scope.artistasResultado.push(response.data);
                                                      

                                            });
                                        }

                                        
                                    }
                                     $scope.cerrarLoading();


               }) 





/*

            $scope.artistasCodigo =$rootScope.artistas;
             $rootScope.shuffleArray($scope.artistasCodigo);
          // $scope.trabajos = $scope.artistasCodigo[1].trabajos;
           $scope.trabajosjson = JSON.stringify($scope.trabajos);
          //alert("entra doble");
          $scope.contador = 0;
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistasCodigo.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistasCodigo[i].ciudad === $scope.filtro.ciudad )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistasCodigo[i];
                   $scope.contador = $scope.contador +1 ; 

                   $scope.siFiltro = true;
                }

           }
          $scope.contador2 = 0;
          $scope.siFiltro2 = false;
          $scope.artistasFiltro2 = []; 
          //alert($scope.artistasFiltro.length);
           for (var j=0; j<$scope.artistasFiltro.length; j++){
            // alert($scope.artistasFiltro[j].especialidad +"----"+ $scope.filtro.estilo );

              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistasFiltro[j].especialidad === $scope.filtro.estilo)
                {
                 // alert("entra" + $scope.contador2);
                   $scope.artistasFiltro2[$scope.contador2] = $scope.artistasFiltro[j];
                   $scope.contador2 = $scope.contador2 +1 ; 

                   $scope.siFiltro2 = true;
                }
                //  alert("tamañoggggg ---" + $scope.artistasFiltro2.length);

           }
           //alert("tamaño ---" + $scope.artistasFiltro2.length);
           if($scope.siFiltro && $scope.siFiltro2)
                {
             //       alert("entro a si");
                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                $scope.artistasResultado =[];
                  for (var i=0; i<$scope.artistasFiltro2.length; i++){

                      $scope.artistasResultado.push($scope.artistasFiltro2[i]);

                  }
                  $scope.filtro.cargando = false;
               }else
               {
              //alert("No hay resultados , se mostraran todos los artistas ");
               $scope.mostrarTextoNoEncontroCodigo();
               $scope.filtro.cargando = false;
               }

*/


        }//CIERRA IF



          //$scope.filtro.estilo = "Todos";
          $scope.filtro.codigo = "";
          $scope.filtro.nombre = "";
          //$scope.filtro.ciudad = "Todos";
         
       


    // $scope.filtro.cargando = false;
     //})
      $scope.closeFiltro(); 
     //  $scope.filtro.cargando = true;
   
      
  };

   //$scope.filtrar();

$scope.identifyUser = function() {
 var user = $ionicUser.get();
 if(!user.user_id) {
 // Set your user_id here, or generate a random one.
 user.user_id = $ionicUser.generateGUID();
 };
 
 // Metadata
 angular.extend(user, {
 name: 'Steven',
 bio: 'Autor inkgps'
 });
 
 // Identify your user with the Ionic User Service
 $ionicUser.identify(user).then(function(){
 $scope.identified = true;
 //console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
 });
};

$scope.pushRegister = function() {
 console.log('Ionic Push: Registering user');
 
 // Register with the Ionic Push service.  All parameters are optional.
 /*$ionicPush.register({
   canShowAlert: true, //Can pushes show an alert on your screen?
   canSetBadge: true, //Can pushes update app icon badges?
   canPlaySound: true, //Can notifications play a sound?
   canRunActionsOnWake: true, //Can run actions outside the app,
   onNotification: function(notification) {
     // Handle new push notifications here
     return true;
   }
 });*/

};


/*$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  alert("Successfully registered token " + data.token);
  console.log('Ionic Push: Got token ', data.token, data.platform);
  $scope.token = data.token;
});*/

$ionicModal.fromTemplateUrl('./templates/terminosCondiciones.html', {
        scope: $scope
    }).then(function (modalTerminos) {
        $scope.modalTerminos = modalTerminos;
    });

    // Triggered in the login modal to close it
    $scope.closeTerminos = function () {
      ionic.Platform.exitApp();
        $scope.modalTerminos.hide();
          
    };

    // Open the login modal
    $scope.openTerminos = function () {
     // alert("event");
        $scope.modalTerminos.show();
        
        //$scope.filtro.cargando = true;

    };

    $scope.insertDataArtistas = function ( idArtista, texto ){
        var queryArtista = "INSERT INTO artistas (idArtista,texto) VALUES (?,?)";
        $cordovaSQLite.execute(db, queryArtista, [idArtista,texto]).then(function(res) {
            //console.log("INSERT ID -> " + res.insertId);
            //alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
            alert(err);
        });

    }

      $scope.selectArtistas = function(idArtista) {
     //$scope.openTerminos();  
        //var query = "SELECT texto  FROM artistas WHERE idArtista = ?";
          var query = "SELECT texto  FROM artistas";
        $cordovaSQLite.execute(db, query, [idArtista]).then(function(res) {
           alert("tamaño del select" + res.rows.length );
            if(res.rows.length > 0) {
           //     console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
               //alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
               //modal
                
            } else {
              //$scope.openTerminos();
               // console.log("No results found");
               // $scope.insert("OTRO2","SIRVIOINFO");

               // alert("No results found");
                
            }
        }, function (err) {
            console.error(err);
            alert(err);
        });
    }

$scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            //console.log("INSERT ID -> " + res.insertId);
            //alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
            alert(err);
        });
    }
 
    $scope.select = function(lastname) {
     //$scope.openTerminos();  
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
           //     console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
               //alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
               //modal
                
            } else {
              $scope.openTerminos();
               // console.log("No results found");
               // $scope.insert("OTRO2","SIRVIOINFO");

               // alert("No results found");

                
            }
        }, function (err) {
            console.error(err);
            alert(err);
        });
    }
   // $scope.insert("OTRO2","SIRVIOINFO"); 
   // $scope.select("SIRVIOINFO");
   $scope.closeTerminosok = function () {
     $scope.insert("OTRO2","SIRVIOINFO");

        $scope.modalTerminos.hide();
          
    };



     $ionicModal.fromTemplateUrl('./templates/regla.html', {
        scope: $scope
    }).then(function (modalRegla) {
        $scope.modalRegla = modalRegla;
    });
    
    // Triggered in the login modal to close it
    $scope.closeRegla = function () {
        // console.log($scope.valorRegla.val);
         if($scope.filtro.tipoRegla === 1)
         {
            $scope.filtro.ancho = $scope.valorRegla.val;
         }else{
           $scope.filtro.alto = $scope.valorRegla.val;
         }
       //console.log("valor "+$scope.valorRegla.val);
        $scope.modalRegla.hide();
   
    };

     

    // Open the login modal
    $scope.openRegla= function (tipo) {
     // alert("event");
        if (tipo === 1)
        {

           $scope.filtro.tipoRegla = 1;
        }else{

             $scope.filtro.tipoRegla = 2;
        }

        $scope.modalRegla.show();
      

    };

     $ionicModal.fromTemplateUrl('./templates/reglaAgenda.html', {
        scope: $scope
    }).then(function (modalReglaAgenda) {
        $scope.modalReglaAgenda = modalReglaAgenda;
    });

     // Open the login modal
    $scope.openReglaAgenda= function (tipo) {
     // alert("event");
        if (tipo === 1)
        {

           $scope.agendarCitaData.tipoRegla = 1;
        }else{

             $scope.agendarCitaData.tipoRegla = 2;
        }

        $scope.modalReglaAgenda.show();
      

    };

    $scope.closeReglaAgenda = function () {
         
         if($scope.agendarCitaData.tipoRegla === 1)
         {
            $scope.agendarCitaData.ancho = $scope.valorReglaAgenda.val;
         }else{
           $scope.agendarCitaData.alto = $scope.valorReglaAgenda.val;
         }
     
        $scope.modalReglaAgenda.hide();
   
    };




});








