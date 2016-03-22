angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state ,Scopes) {
  Scopes.store('AppCtrl', $scope);
  console.log("entra controlador appCtrl");
    $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
    

         $state.go('app.'+nombre);

    }
  $scope.valorfiltro=true;
  $scope.usuarioAutenticado = 0  ;
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

})
.controller('BocetosController', function($scope,$http,$ionicLoading,$ionicModal,$state,$window,Scopes) {
Scopes.store('BocetosController', $scope);
console.log("entra controlador bocetos");


  $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
     
        $window.location.href  ='#/app/'+nombre;

    }

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
  //$scope.getContactList();
 // alert($scope.contacts);
    //cordova.plugins.Whatsapp.send("+573102683586");
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
    
      $http.get('http://8-dot-inkdata-1019.appspot.com/inkdata')
    .success(function(data, status, headers, config){

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
      $scope.artistas = {};
     $scope.artistas = response.data;
      for(var i = 0 ; i <= $scope.artistas.length ; i++){
      //  console.log("valor id = " + id+ "vlor 2 = " +$scope.artistas[i].id);

           if(parseInt($scope.artistas[i].id) === parseInt(id)){
              //if(angular.equals(id,$scope.artistas[i].id )){
              //alert("entra");
                 
            $scope.artistaSeleccionado = {};
              
                 $scope.openDetalleBocetos();
               

               //  alert( $scope.artistas[id1].id );
              //  $scope.idArtista =  id+1;
                $scope.artistaSeleccionado.codigo = $scope.artistas[i].id; 
                $scope.artistaSeleccionado.nombre = $scope.artistas[i].nombre; 
                $scope.artistaSeleccionado.estudio= $scope.artistas[i].estudio;
                $scope.artistaSeleccionado.especialidad = $scope.artistas[i].especialidad; 
                $scope.artistaSeleccionado.descripcion = $scope.artistas[i].descripcion; 
                $scope.artistaSeleccionado.imagen = $scope.artistas[i].imagen; 
                $scope.artistaSeleccionado.direccion = $scope.artistas[i].direccion; 
                $scope.artistaSeleccionado.celular = $scope.artistas[i].celular; 
                $scope.artistaSeleccionado.facebook = $scope.artistas[i].facebook; 
                $scope.artistaSeleccionado.twitter = $scope.artistas[i].twitter; 
                $scope.artistaSeleccionado.instagram = $scope.artistas[i].instagram; 
                $scope.artistaSeleccionado.trabajos = $scope.artistas[i].trabajos;
                $scope.artistaSeleccionado.opcionVideo = $scope.artistas[i].opcionVideo;
                $scope.artistaSeleccionado.videos = $scope.artistas[i].videos;
                $scope.artistaSeleccionado.latitud= $scope.artistas[i].latitud;
                $scope.artistaSeleccionado.longitud = $scope.artistas[i].longitud;
                $scope.artistaSeleccionado.ciudad = $scope.artistas[i].ciudad;
                $scope.allImages = $scope.artistaSeleccionado.trabajos;
                $scope.artistaSeleccionado.usuarioFacebook = $scope.artistas[i].usuarioFacebook;
                $scope.artistaSeleccionado.usuarioTwitter = $scope.artistas[i].usuarioTwitter;
                $scope.mostrarTwitter  = false;
                $scope.artistaSeleccionado.video1 = $scope.artistaSeleccionado.videos[0];
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

                $scope.artistaSeleccionado.usuarioInstagram = $scope.artistas[i].usuarioInstagram;
                $scope.mostrarInstagram  = false;
                 if($scope.artistaSeleccionado.usuarioInstagram  === 'false')
                {
                  
                  $scope.mostrarInstagram   = false;
                  //alert( $scope.artistaSeleccionado.mostrarTwitter);

                }else{
                  $scope.mostrarInstagram   = true;
                  // alert( $scope.artistaSeleccionado.mostrarTwitter);
                }    

            }
      }

  
    })
 
     

 
    };


})
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate ,Scopes) {
Scopes.store('IntroCtrl', $scope);
console.log("entra controlador intro");

   $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;

         $state.go('app.'+nombre);

    }
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.ayuda');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})



.controller('MultimediaController', function($scope,$http,$ionicLoading,$sce ,$state,Scopes) {
  Scopes.store('MultimediaController', $scope);
  console.log("entra controlador multimedia ");

  $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
       
         $state.go('app.'+nombre);

    }
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
  $http.get('http://8-dot-inkdata-1019.appspot.com/inkmultimedia')
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
      $scope.multimedia = response.data;
     // alert("la data es" + $scope.trabajos);
      //alert("la data 1   " + $scope.trabajosjson);
       // alert("la data  2  " + $scope.trabajosjson.toJson);
      $scope.hide();
    })
  //alert("entra");
})
.controller('PromocionesController', function($scope,$http,$ionicLoading,$state ,$window,Scopes) {
  Scopes.store('PromocionesController', $scope);
  console.log("entra controlador promo");
  $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;

 $window.location.href  ='#/app/'+nombre;

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
.controller('EventosController', function($scope,$http,$ionicLoading,$cordovaSQLite,$window,$state,Scopes) {
  Scopes.store('EventosController', $scope);
  console.log("entra controlador eventos");
  $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
     
        $window.location.href  ='#/app/'+nombre;

    }
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
      //alert("**** THEN ****"+ response.data);
      //$scope.artistas = response.data;
      //$scope.trabajos = $scope.artistas[1].trabajos;
      //$scope.trabajosjson = JSON.stringify($scope.trabajos);
      $scope.eventos = response.data;
     // alert("la data es" + $scope.trabajos);
      //alert("la data 1   " + $scope.trabajosjson);
       // alert("la data  2  " + $scope.trabajosjson.toJson);
      $scope.hide();
    })
  //alert("entra");


})

.controller('PublicidadController', function($window,$scope,$http,$ionicLoading,$cordovaSQLite,$ionicModal,$sce,$state,Scopes) {
  Scopes.store('PublicidadController', $scope);
  console.log("entra controlador publi");
   $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
     

         $window.location.href  ='#/app/'+nombre;

    }
 $ionicModal.fromTemplateUrl('./templates/modalPublicidad.html', {
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
        $scope.publicidadSeleccionada.imagen=$scope.publicidad[id].imagen;
        $scope.publicidadSeleccionada.url=$scope.publicidad[id].redireccion;
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
          console.log("entra" +$scope.publicidad[id].redes);
           $scope.publicidadSeleccionada.showLeerMas = false;  
        }
        
    }

      $scope.openGeo = function() {
          $scope.latitude =  $scope.redesCargadas.latitud;
            $scope.longitude =  $scope.redesCargadas.longitud;
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


.controller('wasapController', function($scope,$cordovaContacts) {
$scope.valorfiltro=true;
   
$scope.getContactList = function() {
    $cordovaContacts.find({filter: ''}).then(function(result) {
        $scope.contacts = result;
    }, function(error) {
        console.log("ERROR: " + error);
    });
}
  
  
})




.controller('PlaylistsCtrl', function($scope,$ionicModal,$state,$window,$ionicPopup) {
  console.log("entra controlador play");
  $scope.irTab =  function(nombre){
        // $window.location.href = '#/app/'+nombre;
      

         $window.location.href  ='#/app/'+nombre;

    }
  $scope.valorfiltro=true;
  $scope.playlists = [
    { title: 'Realismo,ilustracion ', id: 1 },
    { title: 'Arte japones', id: 2 },
    { title: 'Tradicional', id: 3 },
    { title: 'Nueva escuela', id: 4 },
    { title: 'Neotradicional', id: 5 },
    { title: 'Fine line', id: 6 },
    { title: 'Escritura', id: 7 },
    { title: 'Tribales,Maori', id: 8 }
  ];
  $scope.estilos = [
                    {
                        id: 1,
                        nombre: "Realismo",
                       imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/realismo_info.jpg",
                        descripcion:"Éste estilo abarca un amplio abanico de posibilidades. Si  "+ 
                        "somos muy concretos a la hora de tatuarnos, éste estilo es el más adecuado "+
                        "ya que  es inspirado"+
                        " en cuentos, películas e historias de ciencia-ficción; son diseños que muestran"+
                        " desgarros o heridas en la piel, dejando ver partes mecánicas dentro del cuerpo."+
                        " Son tatuajes de gran tamaño y suelen estar hechos de tintas negras, blanca y sus"+
                        " escalas."
                       
                    },
                    {
                        id: 2,
                      nombre: "Arte japonés",
                      imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/japones_info.jpg",
                        descripcion:"El catálogo de tatuajes japoneses abarca desde flores, dragones, "+
                        "animales fantásticos o geishas. "+
                        "Habitualmente estos diseños que requieren mucho color, por lo que es preciso "+
                        "que localices a un experto tatuador para garantizar resultados perfectos. Los "+
                        "tatuajes japoneses  son muy apreciados por los amantes de las culturas "+
                        "tradicionales orientales por  su elegancia y refinamiento; pero no creas que "+
                        "son los únicos, porque aquellos amantes de la moda de los tatuajes igualmente"+
                        " eligen los diseños japoneses para embellecer su piel."
                        
                       
                    },
                    {
                      id:3,
                        nombre: "Tradicional",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/vieja_escuela_info.jpg",
                        descripcion:"Sus características principales son el uso de líneas"+
                        " gruesas de color negro, y una gama de colores plana. Estas señas "+
                        "de identidad vienen dadas, en gran medida, por las limitaciones de "+
                        "la época, ya que las técnicas, los aparatos y las tintas de entonces,"+
                        " no permitían el realismo y los efectos que pueden obtenerse en la actualidad."
                      
                    },
                     {
                      id:4,
                        nombre: "Nueva escuela",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/nueva_escuela_info.jpg",
                        descripcion:"Básicamente, se llama tatuajes de la nueva escuela a los tatuajes"+
                        " modernos que incluyen colores brillantes y eléctricos, con una amplia variedad"+
                        " de tonos. Y en muchas ocasiones, también de diferentes colores en sí, lo que "+
                        "provoca un contraste y una definición característicamente llamativa. En este "+
                        "estilo de tatuajes, el uso de varios tonos de cada color es sumamente "+
                        "importante, ya que le da el efecto gráfico y visual que tanto lo caracteriza."
                      
                    },
                     {
                      id:5,
                        nombre: "Neotradicional",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/neotradicional_info.jpg",
                        descripcion:"Es un término relativamente nuevo en la industria del tatuaje."+
                        "Algunas personas describen los tatuajes neo-tradicionales como una combinación"+
                        " de la vieja escuela y la nueva escuela de tatuajes. Mientras que otros simplemente"+
                        " los consideran como los tatuajes de la vieja escuela con un nuevo enfoque.Debido "+
                        "a que estas piezas toman las ideas de los conceptos tanto de la nueva escuela como "+
                        "de la vieja escuela, tienes una variedad de opciones de diseño que sólo están"+
                        " limitadas por tu imaginación."
                      
                    },
                     {
                      id:6,
                        nombre: "Fine line",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/fineline_info.jpg",
                        descripcion:"El estilo de tatuar Fine line... Tal como su nombre indica, “línea fina”,"+
                        " es un estilo de tatuar muy detallista y fino. Generalmente es utilizado para los tatuajes"+
                        " en las mujeres o para aquellos que se tatúan algo pequeño y con bastantes detalles (también"+
                          " es una técnica utilizada para tatuajes realistas). Estos tatuajes necesitan ser hechos "+
                        "con un extremo cuidado, ya que el más mínimo error puede tener una fatal consecuencia. Al "+
                        "ser un tipo de tatuaje tan pequeño y tan detallista, los tatuadores que practican esta técnica,"+
                        " suelen utilizar un calibre de aguja inferior a lo habitual.  "
                      
                    },
                     {
                      id:7,
                        nombre: "Escritura",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/letras_info.jpg",
                        descripcion:"La escritura de un tatuaje puede ser una sola palabra o varias oraciones."+
                        " Puedes incluir tu apellido, un pasaje de tu libro favorito o alguna cita de una película"+
                        " para representar tus características personales o rendir homenaje a un ser querido o"+
                        " héroe. Debido a que la ubicación del tatuaje es tan importante como el propio tatuaje,"+
                        " ten en cuenta que cuanto más larga o más detallada sea la escritura, más espacio"+
                        " necesitarás para que quede bien. Al igual que con cualquier tatuaje, tómate tiempo "+
                        "para considerar su significado, su estilo de escritura y su ubicación adecuada antes"+
                        " de someterte al proceso del tatuaje."
                      
                    },

                    {
                        id:8,
                        nombre: "Tribales",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/tribal_info.jpg",
                        descripcion:"Tribal o tribual es un adjetivo que señala a aquel o aquello perteneciente"+
                        " o relativo a una tribu. Una tribu, por otra parte, es una agrupación de un pueblo "+
                        "antiguo o un grupo social de un mismo origen, ya sea real o supuesto."+
                        "Los diferentes estilos de arte tribal que participan en estos diseños incluyen "+
                        "una variedad de símbolos, muchos de los cuales están relacionados con el mundo "+
                        "natural alrededor de estas civilizaciones antiguas, como las plantas, los árboles, "+
                        "los pájaros, los animales e incluso seres humanos. Estos diseños ofrecen a menudo "+
                        "entrelazado líneas y espirales se arremolinan junto con objetos inanimados que se "+
                        "ven muy masculino."
                        
                    },
                    {
                        id:9,
                        nombre: "Acuarela",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/acuarela_info.jpg",
                        descripcion:"los tatuajes acuarela o en inglés “watercolours”, se han vuelto uno de"+
                         "los más flamantes y populares estilos de este arte. Básicamente y como no es difícil"+
                          "de imaginar, se trata de un estilo directamente relacionado con la pintura de acuarela."+
                          " los tatuajes acuarela incluyen efectos de pincelada, trazos similares a los que dejaría"+
                          " un cepillo o un pincel, determinadas manchas y salpicaduras de pintura y muchos otros"+
                          " efectos clásicos en la pintura, especialmente las que se realizan con acuarela."
                        
                    },
                    {
                        id:10,
                        nombre: "Trash polka",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/trashPolka_info.jpeg",
                        descripcion:"El estilo se asemeja a los collages de arte,"+
                         "se combinan imágenes realistas con manchas,  y "+
                         "diseños cinéticos que generan una apariencia "+
                         " discordante. Piezas de polca solamente se hacen"+ 
                         " en tinta roja o negro. Este estilo es una "+
                         " combinación de realismo y basura; la naturaleza "+
                         " y lo abstracto; la tecnología y la humanidad; "+
                         " pasado presente y futuro."
                        
                    },
                     {
                        id:11,
                        nombre: "Full color",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/full_color_info.jpeg",
                        descripcion:"El estilo se asemeja a los collages de arte,"+
                         "se combinan imágenes realistas con manchas,  y "+
                         "diseños cinéticos que generan una apariencia "+
                         " discordante. Piezas de polca solamente se hacen"+ 
                         " en tinta roja o negro. Este estilo es una "+
                         " combinación de realismo y basura; la naturaleza "+
                         " y lo abstracto; la tecnología y la humanidad; "+
                         " pasado presente y futuro."
                        
                    },
                    {
                        id:12,
                        nombre: "Geométrico",
                        imagen: "http://8-dot-inkdata-1019.appspot.com/img/estilos/geometrico_info.jpg",
                        descripcion:"El estilo se asemeja a los collages de arte,"+
                         "se combinan imágenes realistas con manchas,  y "+
                         "diseños cinéticos que generan una apariencia "+
                         " discordante. Piezas de polca solamente se hacen"+ 
                         " en tinta roja o negro. Este estilo es una "+
                         " combinación de realismo y basura; la naturaleza "+
                         " y lo abstracto; la tecnología y la humanidad; "+
                         " pasado presente y futuro."
                        
                    }
                ];
    $scope.mostrarTextoEstilo = function(idEstilo) {
     console.log();

       var alertPopup = $ionicPopup.alert({
         title: $scope.estilos[idEstilo].nombre,
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


     $ionicModal.fromTemplateUrl('./templates/detalleEstilo.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeEstilo = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.openEstilo = function () {
        $scope.modal.show();
    };

   $scope.estiloSeleccionado = {};
    $scope.cargarEstiloSeleccionado = function (id) {
     $scope.openEstilo();
      
      $scope.idEstilo =  id+1;
      
      $scope.estiloSeleccionado.descripcion = $scope.estilos[id].descripcion; 
      $scope.estiloSeleccionado.imagen = $scope.estilos[id].imagen; 
      $scope.estiloSeleccionado.nombre = $scope.estilos[id].nombre; 
      
     
    

       // $window.location.href = '#/app/infoArtista';
         //alert('work   ' + $scope.artistaSeleccionado.especialidad + 'dd' + $scope.artistaSeleccionado.nombre ) ;
        //alert($scope.estiloSeleccionado.nombre);
    };

    




})

.controller('PlaylistCtrl', function($scope, $stateParams) {
$scope.valorfiltro=true;
     
  $scope.otros = [
    { title: 'Realismo,ilustracion ', id: 1 },
    { title: 'Arte japones', id: 2 },
    { title: 'Tradicional', id: 3 },
    { title: 'Nueva escuela', id: 4 },
    { title: 'Neotradicional', id: 5 },
    { title: 'Fine line', id: 6 },
    { title: 'Letras', id: 7 },
    { title: 'Tribales,Maori', id: 8 }
    

  ];
})

.controller('filtroCtrl', function($scope, $ionicModal,$http,Scope) {
  console.log("entra controlador filtro");
  Scopes.store('filtroCtrl', $scope);
   $scope.valorfiltro=true;
      //ventana  fintros
    $ionicModal.fromTemplateUrl('./templates/filtro.html', {
        scope: $scope
    }).then(function (modalFiltro) {
        $scope.modalFiltro = modalFiltro;
    });

    // Triggered in the login modal to close it
    $scope.closeFiltro = function () {
        $scope.modalFiltro.hide();
    };

    // Open the login modal
    $scope.openFiltro = function () {
     // alert("event");
        $scope.modalFiltro.show();
    };

   
})

.controller('editarArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
      Scopes.store('editarArtistaController', $scope);
      console.log("entra controlador editarArtista");
      $scope.loginData = {};
      $scope.loginData.usuario = window.localStorage.getItem("usuario");
      $scope.loginData.clave = window.localStorage.getItem("clave");
      console.log("valor");
      console.log(angular.toJson(window.localStorage.getItem('artistaLogueado')));


     // $scope.artistaLogueado = {};

    
      $scope.artistaLogueado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
     
      
      console.log("artista loguado");
      console.log($scope.artistaLogueado);


        $scope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
         console.log("ir tab editar "  +$scope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else{

           $state.go('app.'+nombre);
         }
     
    }

      $scope.selImagenPerfil= function() {
          

          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 600,
            targetHeight: 600
          };

          $cordovaCamera.getPicture(options).then(function(imageUri) {
            console.log('img', imageUri);
         
            //$scope.images.push(imageUri);
             $scope.artistaLogueado.imagen =  imageUri;
                
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
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      targetHeight: 600
    };

    $cordovaCamera.getPicture(options).then(function(imageUri) {
      console.log('img', imageUri);
   
      //$scope.images.push(imageUri);
       $scope.artistaLogueado.trabajos[index] =  imageUri;
          
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
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth:600,
            targetHeight: 600,
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
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      targetHeight: 600
    };

    $cordovaCamera.getPicture(options).then(function(imageUri) {
      console.log('img', imageUri);
      $scope.images.push(imageUri);
          
    }, function(err) {
    // error
    });

  };


/*******************Mapas  para la  edicion ***********************************/
  var marker  = null;
  $scope.showMap = function (){
        var myLatlng = new google.maps.LatLng(4.627757313781544,-74.08699035644531);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

         marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
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
    console.log("Entra cargar Servicio " + $scope.loginData.usuario);
   
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
    console.log($scope.artistaLogueado);
    //console.log("nombre =>" + $scope.artistaLogueado.nombre);

  }

   $scope.cargaServicio();

})

.controller('indexController', function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$cordovaDevice,$cordovaSocialSharing ,$cordovaScreenshot) {
    Scopes.store('indexController', $scope);
    console.log("entra controlador index");
    $scope.marca = "otro"; 
    $scope.artistaLogueado = {};
    

    document.addEventListener("deviceready", function () {
        var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        var model = $cordovaDevice.getModel();
        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();
        var version = $cordovaDevice.getVersion();



      //  alert("device model =>" +device.model);
        //alert("device manufacturer =>" +device.manufacturer);
        $scope.marca  =  device.manufacturer ; 
      //  alert("device platform =>" +device.platform);
      //  alert("cordova =>" +cordova);
      //  alert("model =>" +model);
      //  alert("platform =>" +platform);
      //  alert("uuid =>" +uuid);
      //  alert("version =>" +version);

        }, false);

 




    $scope.compartir = function(imagen){
    console.log("inicia");
         /*$cordovaSocialSharing
          .shareViaFacebook("Artista", imagen, "link")
          .then(function(result) {          
           
          }, function(err) {
            alert("Se a presentado un error !!!");
            alert(err);
            // An error occurred. Show a message to the user
          });*/
        $cordovaScreenshot.capture()
             .then(function(result) {
              alert("resultado " + result);
                  //on success you get the image url
                    $cordovaSocialSharing
                    .shareViaFacebook("Artista", imagen, "link")
                        .then(function(result) {          
                 
                         }, function(err) {
                          alert("Se a presentado un error !!!");
                          alert(err);
                  // An error occurred. Show a message to the user
                        });
               
             }, function(err) {
                 console.log("there was an error taking a a screenshot!");
        });
    }
  

    $scope.loginData = {};
    $scope.loginData.login = false;
  console.log("valor usuario " + window.localStorage.getItem('usuario'));
    if( window.localStorage.getItem('usuario') === "" || 
         window.localStorage.getItem('clave') === "" 
          ){
            $scope.loginData.login = false;
           
          }
          else{
           $rootScope.artistaLogueado = window.localStorage.getItem('artistaLogueado');
           $scope.loginData.login = true;

          }

    var idUsuarioLog = true ; 


   $scope.abrirLoading = function() {
    $ionicLoading.show({
      template: 'Cargando...'
    });
  };
  $scope.cerrarLoading = function(){
    $ionicLoading.hide();
  };





//eventos  wizard videos
// Called to navigate to the main app
  //$scope.startVideo = function() {
  //  $state.go('app.videos');
 // };

$scope.logueado = 0 ; 

 console.log("valor inicial ==>"  + $scope.loginData.usuarioAutenticado  );
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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


  // Perform the login action when the user submits the login form
  $scope.informacion={};
  $scope.informacion.mostrarLogin =false;
  $scope.autentica = function() {

     
    /*console.log('http://inkgps.ingeniosoft.com.co/Artistas.svc/artistas');
    $http.defaults.useXDomain = true;
    $http.get('http://inkgps.ingeniosoft.com.co/Artistas.svc/artistas')
      .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);
      })
      .error(function(data, status, headers, config){
      //alert("**** Verificar conexion a internet ****");
     // alert(status);
     // alert(angular.toJson(data))
     console.log("No correcto");
      })
      .then(function(response){

        console.log("correcto");
        $scope.ArtistaLogueado = response.data ; 
            console.log(response.data);
      });  */
       $http.defaults.useXDomain = true;

      $http.get('http://8-dot-inkdata-1019.appspot.com/inkdata')
      .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);
      })
      .error(function(data, status, headers, config){
      //alert("**** Verificar conexion a internet ****");
     // alert(status);
     // alert(angular.toJson(data))
      })
      .then(function(response){
      idUsuarioLog =   $stateParams.idParametro ; 
   
       // console.log("llama servicio usuario  id  ==>" + $scope.loginData);
            $scope.resultadoArtistas  =  response.data ; 
            for (var i = 0 ; i < $scope.resultadoArtistas.length; i++) {
             //console.log($scope.resultadoArtistas[i].id);
                if(parseInt($scope.resultadoArtistas[i].id) === parseInt($scope.loginData.usuario)){
                  //if(parseInt($scope.resultadoArtistas[i].id) === parseInt(idUsuarioLog)){
                    $rootScope.artistaLogueado = $scope.resultadoArtistas[i] ; 

                      console.log('Doing login', $scope.loginData);
                      window.localStorage.setItem('usuario' ,  $scope.loginData.usuario);
                      window.localStorage.setItem('clave' ,  $scope.loginData.clave);
                      window.localStorage.setItem('artistaLogueado' ,  JSON.stringify($rootScope.artistaLogueado));
                      $scope.loginData.login = 1;
                      idUsuarioLog = true; 
                      $scope.loginData.login = true;

                      console.log('Doing login', $scope.loginData);

                      $scope.cerrarLogin();
                      return;
                }
            }
            $scope.loginIncorrectoMensaje();
          
      });

  

   
      /*$http.get('http://8-dot-inkdata-1019.appspot.com/inkbocetos')
    .success(function(data, status, headers, config){

    })
    .error(function(data, status, headers, config){
      alert("**** Verificar conexion a internet ****");
  
    })
    .then(function(response){
      $scope.bocetos = response.data;
      $scope.hide();
    })*/

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  
  };

  $scope.cerrarSesion = function (){
       $scope.loginData.login = false;
       window.localStorage.setItem('usuario' , "");
       window.localStorage.setItem('clave' ,  "");
        window.localStorage.setItem('artistaLogueado' ,  "");
       $state.go("app.artistas");
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

    $scope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
         console.log("ir tab index "  +$scope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else{

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


     $scope.cargarSeleccionado = function (id) {
      
      $scope.login();
      
      $scope.idArtista =  id+1;
       $scope.artistaSeleccionado.codigo = $scope.artistas[id].id; 
      $scope.artistaSeleccionado.nombre = $scope.artistas[id].nombre; 
      $scope.artistaSeleccionado.estudio= $scope.artistas[id].estudio;
      $scope.artistaSeleccionado.especialidad = $scope.artistas[id].especialidad; 
      $scope.artistaSeleccionado.descripcion = $scope.artistas[id].descripcion; 
      $scope.artistaSeleccionado.imagen = $scope.artistas[id].imagen; 
      $scope.artistaSeleccionado.direccion = $scope.artistas[id].direccion; 
      $scope.artistaSeleccionado.celular = $scope.artistas[id].celular; 
      $scope.artistaSeleccionado.facebook = $scope.artistas[id].facebook; 
      $scope.artistaSeleccionado.twitter = $scope.artistas[id].twitter; 
      $scope.artistaSeleccionado.instagram = $scope.artistas[id].instagram; 
      $scope.artistaSeleccionado.trabajos = $scope.artistas[id].trabajos;
      $scope.artistaSeleccionado.opcionVideo = $scope.artistas[id].opcionVideo;
      $scope.artistaSeleccionado.videos = $scope.artistas[id].videos;
      $scope.artistaSeleccionado.latitud= $scope.artistas[id].latitud;
      $scope.artistaSeleccionado.longitud = $scope.artistas[id].longitud;
      $scope.artistaSeleccionado.ciudad = $scope.artistas[id].ciudad;
      $scope.allImages = $scope.artistaSeleccionado.trabajos;
      $scope.artistaSeleccionado.usuarioFacebook = $scope.artistas[id].usuarioFacebook;
      $scope.artistaSeleccionado.usuarioTwitter = $scope.artistas[id].usuarioTwitter;
      $scope.mostrarTwitter  = false;
      $scope.artistaSeleccionado.video1 = $scope.artistaSeleccionado.videos[0];
      console.log($scope.artistaSeleccionado.video1);
      if($scope.artistaSeleccionado.usuarioTwitter  === 'false')
      {
        
        $scope.mostrarTwitter  = false;
        //alert( $scope.artistaSeleccionado.mostrarTwitter);

      }else{
        $scope.mostrarTwitter  = true;
        // alert( $scope.artistaSeleccionado.mostrarTwitter);
      }

      $scope.artistaSeleccionado.usuarioInstagram = $scope.artistas[id].usuarioInstagram;
      $scope.mostrarInstagram  = false;
       if($scope.artistaSeleccionado.usuarioInstagram  === 'false')
      {
        
        $scope.mostrarInstagram   = false;
        //alert( $scope.artistaSeleccionado.mostrarTwitter);

      }else{
        $scope.mostrarInstagram   = true;
        // alert( $scope.artistaSeleccionado.mostrarTwitter);
      }

 
    };

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

$scope.getContactList = function() {
    $cordovaContacts.find({filter: ''}).then(function(result) {
        $scope.contacts = result;
    }, function(error) {
        console.log("ERROR: " + error);
    });
}
  
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
      console.log($scope.loginData) ; 
        $scope.loginData.login ="ok";
        console.log($scope.loginData) ; 
             console.log( $scope.filtro.estilo + " --- "+ $scope.filtro.ciudad + "--" + $scope.filtro.mostrarCodigo ) ; 
        if ($scope.filtro.estilo === "Todos" && $scope.filtro.ciudad === "Todos") {
              if ($scope.filtro.mostrarCodigo === "undefined" || !$scope.filtro.mostrarCodigo ) {
                  console.log("no selecciono filtro  ");
                   console.log("no hacer nada" + $scope.siFiltrar);

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
                    console.log("res" + res);
                     
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
         
        console.log($scope.estilos);
      });
          console.log("entra ==" + $scope.estilos);

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
   
  //$scope.artistas ;
    $scope.filtrar = function () {

 
      
   


      $scope.filtro.iniciaFiltro =false;
      $scope.filtro.cargando = true;

      
       //$window.location.reload(true);
      $http.defaults.useXDomain = true;

      $http.get('http://8-dot-inkdata-1019.appspot.com/inkdata')
      .success(function(data, status, headers, config){
      //alert("**** SUCCESS ****");
     // alert(status);
      })
      .error(function(data, status, headers, config){
      //alert("**** Verificar conexion a internet ****");
     // alert(status);
     // alert(angular.toJson(data))
      })
      .then(function(response){
      //alert("**** THEN ****"+ response.data);
       $scope.filtro.cargando = true;
        $scope.artistas = response.data;
        $scope.trabajos = $scope.artistas[1].trabajos;
        $scope.trabajosjson = JSON.stringify($scope.trabajos);
        $scope.resultadoFiltro =[];
     

        //SI BUSCA POR NOMBRE
        if($scope.filtro.nombre != "")
        {
          $scope.siFiltro = false;
          for (var i=0; i<$scope.artistas.length; i++){
        //alert($scope.artistas[i].id + "   " + $scope.filtro.codigo);

              if($scope.artistas[i].nombre === $scope.filtro.nombre)
                {
                 
                  //alert("entra FILTRO nombre . " + $scope.idFiltro);
                  $scope.resultadoFiltro = $scope.artistas[i];
                    $scope.siFiltro = true;
                }
            }  
              if($scope.siFiltro)
                {

                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                 $scope.artistas.length =0;
                 $scope.artistas.push($scope.resultadoFiltro);
               }else
               {
                alert("No hay resultados , se mostraran todos los artistas ");
               }
        }




        //SI BUSCA  POR CODIGO 
        if ($scope.filtro.codigo != "") {
          $scope.filtro.estilo = "Todos";
          $scope.filtro.ciudad = "Todos" 
           $scope.siFiltro  = false;
             for (var i=0; i<$scope.artistas.length; i++){
        //alert($scope.artistas[i].id + "   " + $scope.filtro.codigo);

              if($scope.artistas[i].id === $scope.filtro.codigo)
                {
                 
                  $scope.resultadoFiltro = $scope.artistas[i];
                  $scope.siFiltro = true;
                }
            }  
        //alert("tamaño fin" + $scope.artistas.length);
        if($scope.siFiltro)
        {

         // alert("tamaño filtro" + $scope.resultadoFiltro.length);
        $scope.artistas.length =0;
        $scope.artistas.push($scope.resultadoFiltro);
        }else
               {
              alert("No hay resultados , se mostraran todos los artistas ");
               }
        
       // alert("tamaño" + $scope.artistas.length);

        }

      
        //SI BUSCA POR  ESTILO
        if($scope.filtro.estilo != "Todos" && $scope.filtro.ciudad == "Todos" )
        {
//alert("entra estilo");
          $scope.contador = 0
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistas.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistas[i].especialidad === $scope.filtro.estilo )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistas[i];
                   $scope.contador = $scope.contador +1 ; 

                   $scope.siFiltro = true;
                }

           }
           //alert("tamaño ---" + $scope.artistasFiltro.length);
           if($scope.siFiltro)
                {

                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                 $scope.artistas.length =0;
                  for (var i=0; i<$scope.artistasFiltro.length; i++){

                      $scope.artistas.push($scope.artistasFiltro[i]);

                  }
               }else
               {
              alert("No hay resultados , se mostraran todos los artistas ");
               }
        
       // alert("tamaño" + $scope.artistas.length);

        


        }
        
         //SI BUSCA POR  CIUDAD
        if($scope.filtro.ciudad != "Todos" && $scope.filtro.estilo == "Todos" )
        {
         //    alert("entra ciudad");
          $scope.contador = 0
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistas.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistas[i].ciudad === $scope.filtro.ciudad )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistas[i];
                   $scope.contador = $scope.contador +1 ; 

                   $scope.siFiltro = true;
                }

           }
           //alert("tamaño ---" + $scope.artistasFiltro.length);
           if($scope.siFiltro)
                {

                 //alert("tamaño filtro" + $scope.resultadoFiltro.length);
                 $scope.artistas.length =0;
                  for (var i=0; i<$scope.artistasFiltro.length; i++){

                      $scope.artistas.push($scope.artistasFiltro[i]);

                  }
               }
        }
         //SI BUSCA POR  CIUDAD   Y  POR ESTILO 
        if($scope.filtro.ciudad != "Todos" && $scope.filtro.estilo != "Todos")
        {
          //alert("entra doble");
          $scope.contador = 0;
          $scope.siFiltro = false;
          $scope.artistasFiltro = []; 
           for (var i=0; i<$scope.artistas.length; i++){
              //alert($scope.artistas[i].especialidad +"---"+ $scope.filtro.estilo );
              //||  $scope.artistas[i].especialidad === "Todos"
              if($scope.artistas[i].ciudad === $scope.filtro.ciudad )
                {
                //  alert("entra");
                   $scope.artistasFiltro[$scope.contador] = $scope.artistas[i];
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
                 $scope.artistas.length =0;
                  for (var i=0; i<$scope.artistasFiltro2.length; i++){

                      $scope.artistas.push($scope.artistasFiltro2[i]);

                  }
               }else
               {
              alert("No hay resultados , se mostraran todos los artistas ");
               }
        }



          //$scope.filtro.estilo = "Todos";
          $scope.filtro.codigo = "";
          $scope.filtro.nombre = "";
          $scope.filtro.ciudad = "Todos";
         
        

          //filtros para el analisis  del tipo de tatuaje que se desea realizar
           if($scope.filtro.analisis)
           {
             $scope.filtro.resultadoEnFiltro = true;
              $scope.filtro.analisis = false;
              console.log("entro analisis ==>" +$scope.filtro.zona);
              //veririfica intensidad de dolor
             
              if($scope.filtro.zona == "Cabeza" || $scope.filtro.zona == "Cuello" || $scope.filtro.zona == "Cara" || $scope.filtro.zona == "Abdomen" || $scope.filtro.zona == "Costillas" || $scope.filtro.zona == "Ingle"  || $scope.filtro.zona == "Pie"     ){
                console.log("entra alta");
                $scope.filtro.intensidadDeDolor ="Alta" ;
              }
              if($scope.filtro.zona == "Espalda" || $scope.filtro.zona == "Pecho" || $scope.filtro.zona == "Mano" || $scope.filtro.zona == "Rodilla" || $scope.filtro.zona == "Pantorrilla"  ){
                console.log("entra Media");
                $scope.filtro.intensidadDeDolor ="Media" ;
              }
                if($scope.filtro.zona == "Hombro" || $scope.filtro.zona == "Brazo" || $scope.filtro.zona == "Antebrazo" || $scope.filtro.zona == "Pierna" ){
                console.log("entra Baja");
                $scope.filtro.intensidadDeDolor ="Baja" ;
              }


              //verifica cantidad de sesiones 
              $scope.filtro.totalEnCentimetros = $scope.filtro.ancho * $scope.filtro.alto;
              if($scope.filtro.totalEnCentimetros  <= 256)
              {
                console.log("entra 1 sesion");
                $scope.filtro.cantidadSesiones = 1 ; 
                if($scope.filtro.totalEnCentimetros  <= 16)
                {
                  console.log("entra 1 1 hora");
                   $scope.filtro.tiempoTotalTatuaje = "1 a 2 Horas";

                }
                if($scope.filtro.totalEnCentimetros  >= 17 &&  $scope.filtro.totalEnCentimetros  <= 64 ) 
                {
                   $scope.filtro.tiempoTotalTatuaje = "2 a 4 Horas";

                }
                if($scope.filtro.totalEnCentimetros  >= 65 && $scope.filtro.totalEnCentimetros  <= 126 ) 
                {
                   $scope.filtro.tiempoTotalTatuaje = "4 a 6 Horas";

                }
                if($scope.filtro.totalEnCentimetros  > 127)
                {
                   $scope.filtro.tiempoTotalTatuaje = "6 a 8 Horas";

                }
              }
               if($scope.filtro.totalEnCentimetros  >= 257 &&  $scope.filtro.totalEnCentimetros <= 512)
              {
                $scope.filtro.cantidadSesiones = 2 ; 
                 $scope.filtro.tiempoTotalTatuaje = "1 a 5 Horas";
              }
              
               if($scope.filtro.totalEnCentimetros  >= 513 &&  $scope.filtro.totalEnCentimetros <= 1024)
              {
                $scope.filtro.cantidadSesiones = 3; 
                $scope.filtro.tiempoTotalTatuaje = "1 a 5 Horas";
              }
              
               if($scope.filtro.totalEnCentimetros  >= 1025 &&  $scope.filtro.totalEnCentimetros <= 2024)
              {
                $scope.filtro.cantidadSesiones = 4 ; 
                $scope.filtro.tiempoTotalTatuaje = "1 a 5 Horas";
              }
              
               if($scope.filtro.totalEnCentimetros  >= 2025)
              {
                $scope.filtro.cantidadSesiones = 5 ; 
                $scope.filtro.tiempoTotalTatuaje = "1 a 5 Horas";
              }

            console.log("entra a analisis" + $scope.filtro.totalEnCentimetros);
           }else{
            $scope.filtro.resultadoEnFiltro = false;
           }


     $scope.filtro.cargando = false;
     })
      $scope.closeFiltro(); 
       $scope.filtro.cargando = true;
      
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
 console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
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

$scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
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
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
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
         console.log($scope.valorRegla.val);
         if($scope.filtro.tipoRegla === 1)
         {
            $scope.filtro.ancho = $scope.valorRegla.val;
         }else{
           $scope.filtro.alto = $scope.valorRegla.val;
         }
       console.log("valor "+$scope.valorRegla.val);
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




});








