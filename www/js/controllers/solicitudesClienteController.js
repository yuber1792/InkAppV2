angular.module('inkgps.solicitudesCliente', [])


.controller('misSolicitudesController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
  console.log("mis solicitudes ");
   $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
    var ref =  firebase.database().ref() ;
   // alert($rootScope.dataClienteRegistrado.uid);
   //$scope.mostrarInfo = false ;
   console.log(JSON.stringify($rootScope.dataClienteRegistrado));
    var refSolicitudes = ref.child("SolicitudesCliente");
    var refArtistas= ref.child("ArtistasData");
    var dataCliente = ref.child("PuntosCliente").child($rootScope.dataClienteRegistrado.uid);        
          //  alert(refUser);
    $scope.solicitudesCliente = [];
    
    refSolicitudes.child($rootScope.dataClienteRegistrado.uid).on("value", function(datos){
     
        console.log("Solciitudes cliente");
        $scope.solicitudesCliente  = datos.val();
              
          dataCliente.child("puntos").on("value", function(datos){
            console.log("puntos cliente");
            $rootScope.dataClienteRegistrado.puntos  = datos.val();
           
            console.log( $rootScope.dataClienteRegistrado.puntos );     
          });

          dataCliente.child("puntosEnCanje").on("value", function(datos){
            console.log("puntos en canje  cliente");
          
            $rootScope.dataClienteRegistrado.puntosEnCanje  = datos.val();
            console.log( $rootScope.dataClienteRegistrado.puntosEnCanje );     
          });


        //console.log(  JSON.stringify($scope.solicitudesCliente ));
          angular.forEach($scope.solicitudesCliente, function(user,key) {
           
               refArtistas.child($scope.solicitudesCliente[key].uidArtista).on("value", function(datos){
                  $scope.dataArtista = datos.val();
                  $scope.solicitudesCliente[key].nombreArtista = $scope.dataArtista.Nombre;
                  $scope.solicitudesCliente[key].especialidad = $scope.dataArtista.Especialidad;
                  $scope.solicitudesCliente[key].mostrarInfo = false ;
                  $scope.solicitudesCliente[key].fechaPropuesta = new Date(Date.parse($scope.solicitudesCliente[key].fechaCita));
                  $scope.solicitudesCliente[key].puntosXcita = $scope.dataArtista.puntosXcita;
               });
                 
          });
          
          
        // window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));
    });
   

    $scope.cambiarEstadoSolicitud = function(estadoNuevo,idArtista ,inkPoints){

      console.log("estado  = " + estadoNuevo);
      console.log("uidArtista  = " + idArtista);
     
        var ref =  firebase.database().ref() ;
         var refSolicitudes = ref.child("SolicitudesCliente").child($rootScope.dataClienteRegistrado.uid);
         var refSolicitudesArtista = ref.child("SolicitudesArtista").child(idArtista);
         //refSolicitudes.child(idArtista).on("value", function(datos){
           // console.log(JSON.stringify(datos.val()));
            refSolicitudes.child(idArtista).update({
              estado: estadoNuevo
            });
            refSolicitudesArtista.child($rootScope.dataClienteRegistrado.uid).update({
              estado: estadoNuevo
            });

            $scope.datosArtista = {};
             var dataArtista = ref.child("ArtistasData").child(idArtista);
             dataArtista.child("puntosXcita").on("value", function(datos){
                console.log("puntos por cita  " );
                $scope.datosArtista.puntosXcita  = datos.val();
                console.log(  $scope.datosArtista.puntosXcita );
                 
               });
           
            if(estadoNuevo === 'ConfirmadaCliente'){
               console.log("confirma cita asigna  inkpoints");
             
            
               dataArtista.child("CupoUsado").on("value", function(datos){
                console.log("cupo usado artista " );
                $scope.datosArtista.puntos  = datos.val();
                console.log(  $scope.datosArtista.puntos );
                 $scope.datosArtista.puntos =  $scope.datosArtista.puntos  +  $scope.datosArtista.puntosXcita;
                console.log(  $scope.datosArtista.puntos);
               });

               dataArtista.child("Cupo").on("value", function(datos){
                console.log("cupo artista " );
                $scope.datosArtista.cupo  = datos.val();
                console.log(  $scope.datosArtista.cupo );
                 $scope.datosArtista.cupo =   $scope.datosArtista.cupo  -  $scope.datosArtista.puntosXcita;
                console.log(  $scope.datosArtista.cupo);
               });
              

               dataArtista.update({
                  Cupo:$scope.datosArtista.cupo ,
                  CupoUsado:$scope.datosArtista.puntos
                });

               $rootScope.dataClienteRegistrado.puntos  =  $rootScope.dataClienteRegistrado.puntos  - inkPoints;
                console.log("puntos cliente  : " +  $rootScope.dataClienteRegistrado.puntos);
                console.log("puntos por cita " + $scope.datosArtista.puntosXcita) ; 
                $scope.puntosCanjeSumar = inkPoints -  $scope.datosArtista.puntosXcita;
                console.log( "puntos canje : " +$scope.puntosCanjeSumar) ; 
                $rootScope.dataClienteRegistrado.puntosEnCanje = $rootScope.dataClienteRegistrado.puntosEnCanje +$scope.puntosCanjeSumar ;
                dataCliente.update({
                  puntos:  $rootScope.dataClienteRegistrado.puntos,
                  puntosEnCanje  : $rootScope.dataClienteRegistrado.puntosEnCanje 
                });

            }

            if(estadoNuevo === 'RechazadaClienteDevolucionPuntos'){
              console.log("entra devolucion puntos ");
               
         
                $scope.cantidadDevolver   = inkPoints -  $scope.datosArtista.puntosXcita;
                $rootScope.dataClienteRegistrado.puntos = $rootScope.dataClienteRegistrado.puntos +  $scope.cantidadDevolver 
                $rootScope.dataClienteRegistrado.puntosEnCanje =  $rootScope.dataClienteRegistrado.puntosEnCanje -  $scope.cantidadDevolver ; 
               console.log("puntos nuevos " +   $rootScope.dataClienteRegistrado.puntos );
               console.log("puntos nuevos en canje  " +   $rootScope.dataClienteRegistrado.puntosEnCanje );
                dataCliente.update({
                  puntos:  $rootScope.dataClienteRegistrado.puntos ,
                  puntosEnCanje  : $rootScope.dataClienteRegistrado.puntosEnCanje 
                });

            }
         
    }


  

    $scope.mostrarInfoSolicitud = function(index){
   
      $scope.contadorDatos = 0 ; 
       angular.forEach($scope.solicitudesCliente, function(user,key) {
       // console.log("for" + index + " - " +  $scope.contadorDatos );
                if(index ===  $scope.contadorDatos){
                      if( $scope.solicitudesCliente[key].mostrarInfo){
                          $scope.solicitudesCliente[key].mostrarInfo = false ;
                      }else{
                          $scope.solicitudesCliente[key].mostrarInfo = true ;
                      }
                }
               // console.log(JSON.stringify($scope.solicitudesCliente));  
               $scope.contadorDatos = $scope.contadorDatos  + 1 ; 

        });

   }
   
})