// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;




angular.module('starter', ['ionic',
  'ngCordova',
  'starter.controllers',
  'ngSanitize',
  'pascalprecht.translate',
  'inkgps.services',
  'firebase','ngCordovaOauth',
  'mdo-angular-cryptography',
  'monospaced.qrcode' ,
  'ion-datetime-picker',
  'inkgps.califica',
  'inkgps.recargaInkPoints',
  'inkgps.bocetos',
  'inkgps.multimedia',
  'inkgps.promociones',
  'inkgps.eventos',
  'inkgps.estudios',
  'inkgps.estilos',
  'inkgps.cambiarInkPoints',
  'inkgps.procedimientosArtista',
  'inkgps.procedimientosCliente',
  'inkgps.solicitudesCliente',
  'inkgps.solicitudesArtista',
  'inkgps.perfilArtista',
  'inkgps.perfilCliente',
  'inkgps.recargaInkPointArtista',
  'inkgps.registro'

  ])


.run(function($ionicPlatform, $cordovaSQLite,$translate,$rootScope) {
  $rootScope.appReady = {status:false};
  $ionicPlatform.ready(function() {
  //  db = $cordovaSQLite.openDB("my.db");

  //  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS artistas (id integer primary key, idArtista text,texto text)");
    
    $ionicPlatform.registerBackButtonAction(function () {
      //alert("evento atras");
       $ionicSideMenuDelegate.toggleLeft();
    }, 100);

   
 //  $ionicUser.identify({
  // Generate GUID
 // user_id: $ionicUser.generateGUID(),
  
  // OR, user the device's UUID
 // user_id: device.uuid
 // });
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log('ionic Ready');
    $rootScope.appReady.status = true;
    $rootScope.$apply();
    console.log('in app.js, appReady is '+$rootScope.appReady.status);
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   //  firebaseData = new Firebase("https://inkgpsapp.firebaseio.com/data");

    if(typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    $translate.use((language.value).split("-")[0]).then(function(data) {
                        console.log("SUCCESS -> " + data);
                    }, function(error) {
                        console.log("ERROR -> " + error);
                    });
            }, null);
      }


/*
      var admobid = {};
        // select the right Ad Id according to platform
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
                banner: 'ca-app-pub-7713231088364165/4786381938',
                interstitial: 'ca-app-pub-7713231088364165/4786381938'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-7713231088364165/8187173532',
                interstitial: 'ca-app-pub-7713231088364165/8187173532'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956'
            };
        }

       if(window.AdMob) AdMob.createBanner( {
         adId:admobid.banner, 
         position:AdMob.AD_POSITION.BOTTOM_CENTER, 
         // isTesting: true,
          autoShow:true} 
       );
 */
                   
                   


  });


})





  .directive('textarea', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr){
        var update = function(){
            element.css("height", "auto");
            var height = element[0].scrollHeight; 
            element.css("height", (element[0].scrollHeight+12 ) + "px");
        };
        scope.$watch(attr.ngModel, function(){
            update();
        });
    }
  };
})



  .service('$cordovaScreenshot', ['$q', function($q) {
    return {
        capture: function(filename, extension, quality) {
            extension = extension || 'jpg';
            quality = quality || '100';

            var defer = $q.defer();

            navigator.screenshot.save(function(error, res) {
                if (error) {
                    console.error(error);
                    defer.reject(error);
                } else {
                    console.log('screenshot saved in: ', res.filePath);
                    defer.resolve(res.filePath);
                }
            }, extension, quality, filename);

            return defer.promise;
        }
    };
}])
//CAMBIAR  TEXTO BOTON ATRAS 
.config(function($ionicConfigProvider) {
     $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
})

.config(['$cryptoProvider', function($cryptoProvider){
    $cryptoProvider.setCryptographyKey('ABCD123');
  }])

 .config(function($stateProvider, $urlRouterProvider, $translateProvider) {
        $translateProvider.translations('en', {
            buscarArtistas: "Find artist",
            buscar: "Find",
            Eventos: "Events",
            estilosTatuaje :"Tattoo style",
            multimedia :"Multimedia & Streaming",
            estudios: "Tattoo shop",
            promociones:"Promotions",
            bocetos:"Sketches",
            procedimientos:"Types of procedure",
            recuperacion:"Recovery",
            dolimetro:"Dolimetro",
            ayuda:"Help",
            denunciar:"Report",
            codigoArtista:"Artist code",
            tatuaje:"Tattoo",
            coverUp:"Cover up",
            remocion:"Removal",
            escarificacion:"Scarification",
            microdermal:"Piercing microdermal",
            bifurcacion:"bifurcation language",
            piercing:"Piercing",
            reconstruccion:"lobe reconstruction",
            filtrar:"Filter",
            textoFiltro1:"Find the best artists and body modifiers , quickly and easily.",
            textoFiltro2:"You can search on any of the following filters , or you can leave blank filters and search all artists.",
            estilo:"Style",
            ciudad:"Country",
            mostrarAnalisis:"Show analysis",
            textoAnalisis:"If you enable the 'Show analysis', we will give a brief overview of average number of hours , number of sessions and intensity of pain based on the information you provide us .",
            ancho:"width CM",
            alto:"high CM",
            regla:"Rule",
            zona:"Zone",
            buscarCodigo:"Find by code",
            escribeCodigo:"Write artist code",
            mostrarResultado:"Show result",
            resultadoAnalisisTexto:"Result analysis for a Tattoo",
            tiempoPorSesion:"Time of session:",
            cantidadSesiones:"Number of sessions:",
            intensidadDolor:"Pain intensity:",
            ubicacion:"Location",
            especialidad:"Specialty:",
            algoSobreMi:"About me",
            portafolio:"portfolio",
            contacto:"Contact",
            loginUsuario:"Artist login",
            editarPerfil :"Edit profile",
            editarFotos :"Edit photos",
            cerrarSesion :"Log out",
            editarUbicacion :"Edit ubication",
            explorar :"Explorar",
            agendarCita: "Agendar cita",
            editarClave :"Editar clave",
            proveedores :"Proveedores",
            loginCliente:"Login cliente",
            perfilCliente:"Perfil cliente",
            recargaInkPoints: "Recarga de InkPoints",
            procedimientosRealizados: "procedimientos realizados"




        });
        $translateProvider.translations('es', {
            buscarArtistas: "Buscar artistas",
            buscar :"Buscar",
            Eventos: "Eventos",
            estilosTatuaje :"Estilos tatuaje",
            multimedia :"Multimedia & Streaming",
            estudios: "Estudios",
            promociones:"Promociones",
            bocetos:"Bocetos",
            procedimientos:"tipos de procedimiento",
            recuperacion:"Recuperación",
            dolimetro:"Dolímetro",
            ayuda:"Ayuda",
            denunciar:"Denunciar",
            codigoArtista:"Código artista",
            tatuaje:"Tatuaje",
            coverUp:"Cover up",
            remocion:"Remoción",
            escarificacion:"Escarificación",
            microdermal:"Piercing microdermal",
            bifurcacion:"Bifurcación de lengua",
            piercing:"Piercing",
            reconstruccion:"Reconstrucción de lobulo",
            filtrar:"Filtrar",
            textoFiltro1:"Encuentra los mejores artistas y modificadores corporales, de forma rápida y sencilla.",
            textoFiltro2:"Puedes realizar la búsqueda por alguno de los siguientes filtros, o puedes dejar los filtros en blanco y buscar todos los artistas.",
            estilo:"Estilo",
            ciudad:"Ciudad",
            mostrarAnalisis:"Mostrar análisis",
            textoAnalisis:"  Si habilitas la opción 'Mostrar análisis', te daremos una breve reseña sobre un promedio de duracion  en horas, cantidad de sesiones e intensidad de dolor en base a la información que nos suministres.",
            ancho:"Ancho CM",
            alto:"Alto CM",
            regla:"Regla",
            zona:"Zona",
            buscarCodigo:"Código de artista",
            escribeCodigo:"Escribe código artista",
            mostrarResultado:"Mostrar resultado",
            resultadoAnalisisTexto:" Resultado análisis para un tatuaje de ",
            tiempoPorSesion:"Tiempo por sesion:",
            cantidadSesiones:"Cantidad de sesiones:",
            intensidadDolor:"Intensidad de dolor:",
            ubicacion:"Ubicación:",
            especialidad:"Especialidad:",
            algoSobreMi:"Algo sobre mi",
             portafolio:"Portafolio",
             contacto:"Contacto",
             loginUsuario:"Ingreso artista",
             editarPerfil :"Editar perfil",
             editarFotos :"Editar fotos",
             cerrarSesion :"Cerrar sesión",
            editarUbicacion :"Editar ubicacion",
            explorar :"Explorar",
            agendarCita: "Agendar cita",
            editarClave :"Editar clave",
            proveedores :"Proveedores",
              loginCliente:"Ingreso clientes",
              perfilCliente:"Perfil cliente",
              recargaInkPoints: "Recarga de InkPoints",
               procedimientosRealizados: "procedimientos realizados"



        });

      $translateProvider.translations('fr', {
            buscarArtistas: "Trouver artistes",
            buscar :"Recherche",
            Eventos: "Evénements",
            estilosTatuaje :"Styles Tattoo",
            multimedia :"Multimedia streaming",
            estudios: "Etudes",
            promociones:"Promotions",
            bocetos:"Esquisses",
            procedimientos:"types de procédures",
            recuperacion:"Recovery",
            dolimetro:"Dolímetro",
            ayuda:"Aide",
            denunciar:"Rapport",
            codigoArtista:"Code de l'artiste",
            tatuaje:"Tattoo",
            coverUp:"Couvrir",
            remocion:"enlèvement",
            escarificacion:"Escarificación",
            microdermal:"Microdermal Piercing",
            bifurcacion:"langue fourche",
            piercing:"Piercing",
            reconstruccion:"Reconstruire lobe",
            filtrar:"Filtre",
            textoFiltro1:"Trouvez les meilleurs artistes et des modificateurs de corps, rapidement et facilement.",
            textoFiltro2:"Vous pouvez effectuer une recherche sur un de ces filtres, ou vous pouvez laisser les filtres vierges et rechercher tous les artistes.",
            estilo:"Style",
            ciudad:"City",
            mostrarAnalisis:"Show analyse",
            textoAnalisis:"Si vous activez le 'Show analyse», nous allons donner un bref aperçu de la durée moyenne en heures, le nombre de sessions et intensité de la douleur basé sur les informations que vous nous fournissez. ",
            ancho:"Wide CM",
            alto:"Alto CM",
            regla:"la règle",
            zona:"Zone",
            buscarCodigo:"Code Artist",
            escribeCodigo:"code artiste Write",
            mostrarResultado:"Afficher le résultat",
            resultadoAnalisisTexto:" Analyse des résultats pour un tatouage",
            tiempoPorSesion:"temps de session:",
            cantidadSesiones:"Nombre de séances:",
            intensidadDolor:"L'intensité de la douleur",
            ubicacion:"Location:",
            especialidad:"Spécialité:",
            algoSobreMi:"Quelque chose de moi",
             portafolio:"portefeuille",
             contacto:"Contact",
             loginUsuario:"Connexion utilisateur",
             editarPerfil :"Edit profile",
             editarFotos :"Editar fotos",
             cerrarSesion :"Log out",
            editarUbicacion :"Edit ubication",
            explorar :"Explorar",
            agendarCita: "Agendar cita",
            editarClave :"Editar clave",
            proveedores :"Proveedores",
              loginCliente:"Login cliente",
              perfilCliente:"Perfil cliente",
              recargaInkPoints: "Recarga de InkPoints",
               procedimientosRealizados: "procedimientos realizados"




        });
        $translateProvider.preferredLanguage("es");
        $translateProvider.fallbackLanguage("es");

    })
/*.config(['$ionicAppProvider', function($ionicAppProvider) {

 
    var io  = Ionic.io();
    var push = new Ionic.Push({
        "onNotification":function(notification){
          alert("COrrecto") ;

        },
        "pluginConfig":{
          "android":{
            "iconColor":"#0000ff"
          }
        }
    });
    var user = Ionic.User.current();
    if(!user.id){
      user.id = Ionic.User.anonymousId();
    }
    user.set('name','steven');
    user.set('bio','sirve');
    user.save();

    var callback = function(){

      push.addTokenToUser(user);
      console.log("device token 1:  " + push._token.token);
      //alert("device token 1:  " + push._token.token);
      user.save();

    }
     //Ionic.User.current(user);
      push.register(callback);
    
/*  $ionicAppProvider.identify({
    app_id: 'dd47acc0',
    api_key: 'AIzaSyA58wrDr0o_p-BLUqimynrR59NtUAnFRCQ',
    // dev_push: true,
    gcm_id: '663041379583'
   
  });*/
/*}])*/


.directive('bg', function() {
  return {
    restrict: 'A',
    require: '^multiBg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, multiBgController) {
      element.on('load', function() {
        multiBgController.animateBg();
      });
    }
  };
})


.directive('showHideContainer', function(){
  return {
    scope: {

    },
    controller: function($scope, $element, $attrs) {
      $scope.show = false;

      $scope.toggleType = function($event){
        $event.stopPropagation();
        $event.preventDefault();

        $scope.show = !$scope.show;

        // Emit event
        $scope.$broadcast("toggle-type", $scope.show);
      };
    },
    templateUrl: 'views/common/show-hide-password.html',
    restrict: 'A',
    replace: false,
    transclude: true
  };
})


.directive('showHideInput', function(){
  return {
    scope: {

    },
    link: function(scope, element, attrs) {
      // listen to event
      scope.$on("toggle-type", function(event, show){
        var password_input = element[0],
            input_type = password_input.getAttribute('type');

        if(!show)
        {
          password_input.setAttribute('type', 'password');
        }

        if(show)
        {
          password_input.setAttribute('type', 'text');
        }
      });
    },
    require: '^showHideContainer',
    restrict: 'A',
    replace: false,
    transclude: false
  };
})
/**
.directive('preImg', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      ratio:'@',
      helperClass: '@'
    },
    controller: function($scope) {
      $scope.loaded = false;

      this.hideSpinner = function(){
        // Think i have to use apply because this function is not called from this controller ($scope)
        $scope.$apply(function () {
          $scope.loaded = true;
        });
      };
    },
    templateUrl: 'views/common/pre-img.html'
  };
})

.directive('spinnerOnLoad', function() {
  return {
    restrict: 'A',
    require: '^preImg',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attr, preImgController) {
      element.on('load', function() {
        preImgController.hideSpinner();
      });
    }
  };
})**/

.config(function($stateProvider, $urlRouterProvider) {

   

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

 

 

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
        
      }
    }
  })
  .state('app.eventos', {
    url: "/eventos",
    views: {
      'menuContent': {
        templateUrl: "templates/eventos.html",
        controller: 'EventosController'
      }
    }
  })
 .state('app.publicidad', {
    url: "/publicidad",
    views: {
      'menuContent': {
        templateUrl: "templates/publicidad.html",
        controller: 'PublicidadController'
      }
    }
  })

  .state('app.push', {
    url: "/push",
    views: {
      'menuContent': {
        templateUrl: "templates/push.html"
      }
    }
  })
   .state('app.promociones', {
    url: "/promociones",
    views: {
      'menuContent': {
        templateUrl: "templates/promociones.html",
        controller: 'PromocionesController'
      }
    }
  })
   
    .state('app.bocetos', {
    url: "/bocetos",
    views: {
      'menuContent': {
        templateUrl: "templates/bocetos.html",
        controller: 'BocetosController'
      }
    }
  })
      .state('app.multimedia', {
    url: "/multimedia",
    views: {
      'menuContent': {
        templateUrl: "templates/multimedia.html",
        controller: 'MultimediaController'
      }
    }
  })
  .state('app.ayuda', {
    url: "/ayuda",
    views: {
      'menuContent': {
        templateUrl: "templates/ayuda.html"
        
      }
    }
  })
  .state('app.recuperacion', {
    url: "/recuperacion",
    views: {
      'menuContent': {
        templateUrl: "templates/recuperacion.html"
        
      }
    }
  })
    .state('app.estilosTatuaje', {
      url: "/estilosTatuaje",
      views: {
        'menuContent': {
          templateUrl: "templates/estilosTatuaje.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
     .state('app.estilos', {
      url: "/estilos",
      views: {
        'menuContent': {
          templateUrl: "templates/estilosInfo.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.tipoProcedimiento', {
      url: "/tipoProcedimiento",
      views: {
        'menuContent': {
          templateUrl: "templates/tipoProcedimiento.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

     .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistsCtrl'
      }
    }
  }) 
     .state('app.opcionesBusqueda', {
      url: "/opcionesBusqueda",
      views: {
        'menuContent': {
          templateUrl: "templates/opcionesBusqueda.html",
          controller: 'indexController'
        }
      }
    })
     .state('app.denunciar', {
      url: "/denunciar",
      views: {
        'menuContent': {
          templateUrl: "templates/denunciar.html",
          controller: 'indexController'
        }
      }
    })
      .state('app.editarArtista', {
      url: "/editarArtista/:usuario/:clave",
      views: {
        'menuContent': {
          templateUrl: "templates/editarArtista.html",
          controller: 'editarArtistaController',
          params: {
                      usuario: null,
                      clave:null
                  }
        }
      }
    })

      .state('app.perfilCliente', {
      url: "/perfilCliente",
      views: {
        'menuContent': {
          templateUrl: "templates/perfilCliente.html",
          controller: 'perfilClienteController'
        }
      }
    })

      .state('app.recargarInkPoints', {
      url: "/recargarInkPoints",
      views: {
        'menuContent': {
          templateUrl: "templates/recargarInkPoints.html",
          controller: 'recargarInkPointsController'
        }
      }
    })

        .state('app.misSolicitudes', {
      url: "/misSolicitudes",
      views: {
        'menuContent': {
          templateUrl: "templates/misSolicitudes.html",
          controller: 'misSolicitudesController'
        }
      }
    })


      .state('app.misSolicitudesArtista', {
      url: "/misSolicitudesArtista",
      views: {
        'menuContent': {
          templateUrl: "templates/misSolicitudesArtista.html",
          controller: 'misSolicitudesArtistaController'
        }
      }
    })  

      .state('app.procedimientosArtista', {
      url: "/procedimientosArtista",
      views: {
        'menuContent': {
          templateUrl: "templates/procedimientosArtista.html",
          controller: 'procedimientosArtistaController'
        }
      }
    })  

      .state('app.procedimientosCliente', {
      url: "/procedimientosCliente",
      views: {
        'menuContent': {
          templateUrl: "templates/procedimientosCliente.html",
          controller: 'procedimientosClienteController'
        }
      }
    })  

      .state('app.recargarInkPointsArtista', {
      url: "/recargarInkPointsArtista",
      views: {
        'menuContent': {
          templateUrl: "templates/recargarInkPointsArtistas.html",
          controller: 'recargarInkPointsArtistaController'
        }
      }
    })

       .state('app.cambiarInkPoints', {
      url: "/cambiarInkPoints",
      views: {
        'menuContent': {
          templateUrl: "templates/cambiarInkPoints.html",
          controller: 'cambiarInkPointsController'
        }
      }
    })
      .state('app.calificar', {
      url: "/calificar",
      views: {
        'menuContent': {
          templateUrl: "templates/calificar.html",
          controller: 'calificarController'
        }
      }
    })  

        .state('app.perfilArtista', {
      url: "/perfilArtista",
      views: {
        'menuContent': {
          templateUrl: "templates/perfilArtista.html",
          controller: 'perfilArtistaController'
        }
      }
    })
     
    .state('app.editarFotos', {
      url: "/editarFotos/:usuario/:clave",
      views: {
        'menuContent': {
          templateUrl: "templates/editarFotos.html",
          controller: 'editarArtistaController',
            params: {
                      usuario: null,
                      clave:null
                  }
        }
      }
    })
    .state('app.editarClave', {
      url: "/editarClave/:usuario/:clave",
      views: {
        'menuContent': {
          templateUrl: "templates/editarClave.html",
          controller: 'editarArtistaController',
            params: {
                      usuario: null,
                      clave:null
                  }
        }
      }
    })
         .state('app.editarUbicacion', {
      url: "/editarUbicacion",
      views: {
        'menuContent': {
          templateUrl: "templates/editarUbicacionArtista.html",
          controller: 'indexController'
        }
      }
    })
     .state('app.artistas', {
      url: "/artistas",
    //  cache : false,
      views: {
        'menuContent': {
          templateUrl: "templates/artistas.html",
          controller: 'indexController'
        }
      }
    })
    
     .state('app.descubrir', {
      url: "/descubrir",
      views: {
        'menuContent': {
          templateUrl: "templates/descubrir.html",
           controller: 'indexController'
        }
      }
    })
   

 

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/descubrir');


});


