angular.module('inkgps.solicitudesArtista', [])
.controller('misSolicitudesArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$cordovaBarcodeScanner){
  console.log("mis solicitudes artista  ");


  
  // $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
    $rootScope.dataArtistaRegistrado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
    var ref =  firebase.database().ref() ;
    var porcentajeXTattoo =0;
    var regalosPorSesion = 0  ; 
   // alert($rootScope.dataClienteRegistrado.uid);

   ref.child("porcentajeXTattoo").once("value").then(function(snapshot) {
                   console.log("Porcentaje de puntos a asginar es:"+ snapshot.val());
                   porcentajeXTattoo = snapshot.val();
                   console.log(porcentajeXTattoo);
                
                    // ...
    });
  
    var refSolicitudes = ref.child("SolicitudesArtista");
    var refClientes= ref.child("PuntosCliente");
    var dataArtista= ref.child("ArtistasData").child($rootScope.dataArtistaRegistrado.uid);
          //  alert(refUser);
    $scope.solicitudesArtista = {};
    refSolicitudes.child($rootScope.dataArtistaRegistrado.uid).on("value", function(datos){
         dataArtista.child("CupoUsado").on("value", function(datos){
            console.log("cupo usado artista");
            $rootScope.dataArtistaRegistrado.CupoUsado  = datos.val();
            console.log( $rootScope.dataArtistaRegistrado.CupoUsado );     
          });
         dataArtista.child("Cupo").on("value", function(datos){
            console.log("cupo artista");
          
            $rootScope.dataArtistaRegistrado.Cupo  = datos.val();
            console.log( $rootScope.dataArtistaRegistrado.Cupo);     
          });


        console.log("Solciitudes artista");
        $scope.solicitudesArtista  = datos.val();
        console.log(  JSON.stringify($scope.solicitudesArtista ));
          angular.forEach($scope.solicitudesArtista, function(user,key) {
               refClientes.child($scope.solicitudesArtista[key].uidCliente).on("value", function(datos){
                  $scope.dataCliente = datos.val();
                  console.log(JSON.stringify($scope.dataCliente));
                 // $scope.solicitudesArtista[key].tipoUsuario = $scope.dataCliente.tipoUsuario;
                  $scope.solicitudesArtista[key].mostrarInfo = false;
                  $scope.solicitudesArtista[key].fechaPropuesta = new Date(Date.parse($scope.solicitudesArtista[key].fechaCita));
                

               });
                //console.log(JSON.stringify($scope.solicitudesArtista));  


          });
        
        // window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));
    
    });

    $scope.infoCalificacion = {} ; 
    $scope.infoCalificacion.calificacion = 5  ;
    
    $scope.cambiarEstadoSolicitud = function(estadoNuevo,idCliente ,inkPoints , fechaPropuesta){

      $scope.dataPuntosCliente = {};
      $scope.datosArtista = {};
      console.log("estado  = " + estadoNuevo);
      console.log("uidCliente  = " + idCliente);
     
        var ref =  firebase.database().ref() ;
       


        var dataArtista = ref.child("ArtistasData").child($rootScope.dataArtistaRegistrado.uid);
        dataArtista.child("puntosXcita").on("value", function(datos){
          console.log("puntos por cita 1  " );
          $scope.datosArtista.puntosXcita  = datos.val();
          console.log(  $scope.datosArtista.puntosXcita );
           
         });

         var refSolicitudes = ref.child("SolicitudesCliente").child(idCliente);
         var refSolicitudesArtista = ref.child("SolicitudesArtista").child($rootScope.dataArtistaRegistrado.uid);
         //refSolicitudes.child(idArtista).on("value", function(datos){
           // console.log(JSON.stringify(datos.val()));
            refSolicitudes.child($rootScope.dataArtistaRegistrado.uid).update({
              estado: estadoNuevo
            });

            refSolicitudesArtista.child(idCliente).update({
              estado: estadoNuevo
            });
          
             
            if(estadoNuevo === 'TatuajeFinalizado'){

                
                  console.log("calificacion : " +$scope.infoCalificacion.calificacion) ;
                  
                

                dataArtista.child("puntosXcita").on("value", function(datos){
                console.log("puntos por cita  2 " );
                $scope.dataPuntosCliente.puntosXcita  = datos.val();
                console.log(  $scope.dataPuntosCliente.puntosXcita );
                var dataCliente = ref.child("PuntosCliente").child(idCliente);  
                console.log("puntos por cita");
                console.log($scope.datosArtista.puntosXcita );
                $scope.dataPuntosCliente.valorNuevo  = inkPoints - $scope.datosArtista.puntosXcita ; 
                console.log("valor nuevo " +   $scope.dataPuntosCliente.valorNuevo );
               
                    dataCliente.child("puntosEnCanje").on("value", function(datos){
                        console.log("puntos en canje  cliente");
                        $scope.dataPuntosCliente.puntosEnCanje  = datos.val();
                        console.log( $scope.dataPuntosCliente.puntosEnCanje );     
                      });
                      $scope.dataPuntosCliente.puntosEnCanje  =  $scope.dataPuntosCliente.puntosEnCanje - $scope.dataPuntosCliente.valorNuevo ;  
                      dataCliente.update({
                        puntosEnCanje:  $scope.dataPuntosCliente.puntosEnCanje
                      });
                      var dataArtista = ref.child("ArtistasData").child($rootScope.dataArtistaRegistrado.uid);
                       
                       $rootScope.dataArtistaRegistrado.CupoUsado  = $rootScope.dataArtistaRegistrado.CupoUsado  +  $scope.dataPuntosCliente.valorNuevo;
                       $rootScope.dataArtistaRegistrado.Cupo = $rootScope.dataArtistaRegistrado.Cupo - $scope.dataPuntosCliente.valorNuevo ; 
                       dataArtista.update({
                        CupoUsado: $rootScope.dataArtistaRegistrado.CupoUsado,
                        Cupo :  $rootScope.dataArtistaRegistrado.Cupo
                      });
                  //insert  registro tatuajes 
                
              });

                  dataArtista.child("puntosXsesion").on("value", function(datos){
                      console.log("puntos artista" +   datos.val());
                      regalosPorSesion  = (porcentajeXTattoo *   datos.val() ) / 100 ; 
                      console.log("puntos de regalo por sesion" + regalosPorSesion ) ; 
                         var fecha = new Date();
                         console.log("id cliente "  +idCliente) ;
                         console.log("id artista " +$rootScope.dataArtistaRegistrado.uid) ; 
                        ref.child("ProcedimientosCliente").child(idCliente).child($rootScope.dataArtistaRegistrado.uid).push({
                                            estado: 'TatuajeFinalizado',                            
                                            fecha: fecha.toString(),
                                            inkPoints : inkPoints ,
                                            uidArtista: $rootScope.dataArtistaRegistrado.uid,
                                            calificacionArtista : 5 ,
                                            calificacionCliente :  parseInt($scope.infoCalificacion.calificacion) ,
                                            porcentajeInkPoints :  regalosPorSesion
                                    }
                          ).then(function(result){
                            console.log("inserto procedimientos  cliente ");
                            console.log(result);

                          });

                        ref.child("ProcedimientosArtista").child($rootScope.dataArtistaRegistrado.uid).child(idCliente).push({
                                            estado: 'TatuajeFinalizado',                            
                                            fecha: fecha.toString(),
                                            inkPoints : inkPoints ,
                                            uidCliente: idCliente,
                                            calificacionArtista : 5 ,
                                            calificacionCliente : parseInt($scope.infoCalificacion.calificacion),
                                            porcentajeInkPoints : regalosPorSesion
                                    }
                          ).then(function(result){
                            console.log("inserto procedimientos  artista ");
                            console.log(result);

                              $scope.datosClientes  = {};
                              var refUser = ref.child("PuntosCliente").child(idCliente);
                              refUser.child("puntos").on("value", function(datos){
                                  console.log("puntos cliente para cargar ");
                                  $scope.datosClientes.puntos  = datos.val();
                                  console.log(   $scope.datosClientes.puntos  );

                                });
                               
                               $scope.nuevosPuntos = parseInt($scope.datosClientes.puntos) + parseInt(regalosPorSesion);
                                   console.log("nuevos puntos a recargar " + $scope.nuevosPuntos  );
                      
                              
                                refUser.update({
                                    puntos:  $scope.nuevosPuntos 
                                });

                          });

                  });

                 


              



            }
            if(estadoNuevo === 'AceptadaArtistaFechaDiferente'){
              console.log("entra artista fecha diferente ");
               refSolicitudes.child($rootScope.dataArtistaRegistrado.uid).update({
                  fechaCita: fechaPropuesta.toString()
                });

                refSolicitudesArtista.child(idCliente).update({
                  fechaCita: fechaPropuesta.toString()
                });
            }
            if(estadoNuevo === 'RechazadaArtistaDevolucion'){
               var dataCliente = ref.child("PuntosCliente").child(idCliente);  
               dataCliente.child("puntosEnCanje").on("value", function(datos){
                  console.log("puntos en canje  cliente");
                
                  $scope.dataPuntosCliente.puntosEnCanje  = datos.val();
                  console.log( $scope.dataPuntosCliente.puntosEnCanje );     
                });
               dataCliente.child("puntos").on("value", function(datos){
                  console.log("puntos  cliente");
                
                  $scope.dataPuntosCliente.puntos  = datos.val();
                  console.log( $scope.dataPuntosCliente.puntos );     
                });
                $scope.dataPuntosCliente.valorEnCanje = parseInt(inkPoints) -  parseInt($scope.datosArtista.puntosXcita) ; 
                $scope.dataPuntosCliente.nuevoEnCanje  = parseInt($scope.dataPuntosCliente.puntosEnCanje) - parseInt($scope.dataPuntosCliente.valorEnCanje);
                $scope.dataPuntosCliente.puntos =  $scope.dataPuntosCliente.puntos + inkPoints ; 

                console.log("cancelalad  por el artista, se le devuelven todos los puntos");
                console.log("nuevo puntos en canje " +  $scope.dataPuntosCliente.nuevoEnCanje ) ; 
                console.log("nuevos inkpoints " +  $scope.dataPuntosCliente.puntos) ; 
               dataCliente.update({
                  puntos : $scope.dataPuntosCliente.puntos ,
                  puntosEnCanje:   $scope.dataPuntosCliente.nuevoEnCanje 
                });
            
            }
         
    }

     $scope.mostrarInfoSolicitud = function(index){
   
      $scope.contadorDatos = 0 ; 
       angular.forEach($scope.solicitudesArtista, function(user,key) {
       // console.log("for" + index + " - " +  $scope.contadorDatos );
                if(index ===  $scope.contadorDatos){
                      if( $scope.solicitudesArtista[key].mostrarInfo){
                          $scope.solicitudesArtista[key].mostrarInfo = false ;
                      }else{
                          $scope.solicitudesArtista[key].mostrarInfo = true ;
                      }
                }
               // console.log(JSON.stringify($scope.solicitudesCliente));  
               $scope.contadorDatos = $scope.contadorDatos  + 1 ; 

        });

    }

    $scope.scanearCodigoCliente = function (estadoNuevo , idCliente, inkPoints,fechaPropuesta){

        $cordovaBarcodeScanner.scan().then(function(imageData) {

            alert("envio directo");
            $scope.dataCode = imageData.text.split("-");
            console.log($scope.dataCode[0]);
            if($scope.dataCode[1] === $rootScope.dataArtistaRegistrado.uid ){
                //$scope.cambiarEstadoSolicitud("Tatuandome" ,$scope.dataCode[0],inkPoints,fechaPropuesta);


            var refSolicitudes = ref.child("SolicitudesCliente").child(idCliente);
            var refSolicitudesArtista = ref.child("SolicitudesArtista").child($rootScope.dataArtistaRegistrado.uid);
         //refSolicitudes.child(idArtista).on("value", function(datos){
           // console.log(JSON.stringify(datos.val()));
            refSolicitudes.child($rootScope.dataArtistaRegistrado.uid).update({
              estado: estadoNuevo
            });

            refSolicitudesArtista.child(idCliente).update({
              estado: estadoNuevo
            });
            }else{
               alert("Este es un codigo de activacion no pertenece a este artista") ; 
            }
            
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    }
   
})