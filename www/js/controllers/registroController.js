 angular.module('inkgps.registro', [])

 .controller('registroController', function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$cordovaDevice,$cordovaSocialSharing ,$cordovaScreenshot ,$templateCache,$firebaseObject,$ionicSideMenuDelegate ,$firebaseArray,$firebaseAuth,$cordovaOauth,$cordovaBarcodeScanner,$crypto) {


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
});
