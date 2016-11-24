angular.module('inkgps.cambiarInkPoints', [])
.controller('cambiarInkPointsController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$firebaseArray,$firebaseObject){
   console.log("entra controlador canjear ref ");
   $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
    var ref =  firebase.database().ref() ;
   // alert($rootScope.dataClienteRegistrado.uid);
  
    var refUser = ref.child("PuntosCliente").child($rootScope.dataClienteRegistrado.uid);
          //  alert(refUser);
            $scope.datosClientes  = {};
            refUser.child("puntos").on("value", function(datos){
                console.log("datos actual");
                
              
                $rootScope.dataClienteRegistrado.puntos  = datos.val();
                console.log( $rootScope.dataClienteRegistrado.puntos );
                // window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));
                
                
    });

    $scope.crearSolicitud = function (uidArtista , fechaSolicitud ,puntos){
      console.log("uid artista " +  uidArtista) ; 
      console.log("fecha solicitud" +  fechaSolicitud) ; 
     var refSolicitudesCliente = ref.child("SolicitudesCliente");
     var refSolicitudesArtista= ref.child("SolicitudesArtista");
      var cliente  =  refSolicitudesCliente.child($rootScope.dataClienteRegistrado.uid);
      var  fecha = new Date();
       refSolicitudesCliente.child($rootScope.dataClienteRegistrado.uid).child(uidArtista).set({
                                    estado: 'EnviadaArtista',
                                    fechaCita : fechaSolicitud.toString(), 
                                    fechaCreacion: fecha.toString(),
                                    inkPoints : puntos ,
                                    uidArtista: uidArtista
                                }
                                ).then(function(result){
                                  console.log(result);

                                });
        refSolicitudesArtista.child(uidArtista).child($rootScope.dataClienteRegistrado.uid).set({
                                    estado: 'EnviadaArtista',
                                    fechaCita : fechaSolicitud.toString(), 
                                    fechaCreacion: fecha.toString(),
                                    inkPoints : puntos ,
                                    uidCliente: $rootScope.dataClienteRegistrado.uid
                                }
                                );

       alert("felicidades a creado una solicitud !!!") ; 
        
   /*
estado: 'EnviadaArtista',
 fechaCita : fechaSolicitud , 
    fechaCreacion: new Date(),
 puntosEnCanje : puntos ,
  uidArtista: uidArtista
   */
    


    }  

  
            
   var refD =  firebase.database().ref() ;
   var artistasFirebase = refD.child("ArtistasData");     
   refD.child("ArtistasData").on("value", function(datos){
              console.log("datos artistas 1");
                
              //$scope.dataFirebaseArtistas = JSON.stringify(datos.val());
              $scope.dataFirebaseArtistas =datos.val();
             
              //$rootScope.dataClienteRegistrado.puntos  = datos.val();
              console.log("Asigna imagen");
              angular.forEach($scope.dataFirebaseArtistas, function(user,key) {
                      console.log("nombre"+ $scope.dataFirebaseArtistas[key].Nombre);
                      console.log(JSON.stringify(user));
                      var storage = firebase.storage();
                      var pathReference = storage.ref(user.uid+'/logo.png');
                       pathReference.getDownloadURL().then(function(url) {
                        console.log("descarga archivo "); 
                        console.log(url);
                        $scope.dataFirebaseArtistas[key].photoURL = url ; 
                         $scope.dataFirebaseArtistas[key].mostrarInfo = false ; 
                         console.log(JSON.stringify( $scope.dataFirebaseArtistas[key].photoURL));
                        
                        }).catch(function(error) {
                          switch (error.code) {
                            case 'storage/object_not_found':
                              // File doesn't exist
                              break;

                            case 'storage/unauthorized':
                              // User doesn't have permission to access the object
                              break;

                            case 'storage/canceled':
                              // User canceled the upload
                              break;

                            case 'storage/unknown':
                              // Unknown error occurred, inspect the server response
                              break;
                          }
                        });
              });


                // window.localStorage.setItem('clienteLogueado' ,  JSON.stringify($rootScope.dataClienteRegistrado));         
    });

     $scope.mostrarInfoSolicitud = function(index){
       console.log("entra" + index );
     $scope.contadorDatos = 0 ;
       angular.forEach($scope.dataFirebaseArtistas, function(user,key) {
       // console.log("for" + index + " - " +  $scope.contadorDatos );
                if(index ===  $scope.contadorDatos){
                      if( $scope.dataFirebaseArtistas[key].mostrarInfo){
                          $scope.dataFirebaseArtistas[key].mostrarInfo = false ;
                      }else{
                          $scope.dataFirebaseArtistas[key].mostrarInfo = true ;
                      }
                }
                 $scope.contadorDatos = $scope.contadorDatos  + 1  ;
               // console.log(JSON.stringify($scope.solicitudesCliente));  
        });

   }

  // download the data into a local object
    //$scope.dataFirebaseTest = $firebaseObject(ref); 
   //$scope.dataFirebaseTest = $firebaseArray(artistasFireBase);
  //console.log($scope.dataFirebaseArtistas);




   
})