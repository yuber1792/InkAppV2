angular.module('inkgps.perfilArtista', [])

.controller('perfilArtistaController' ,function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes){
  console.log("entra controlador perfil artista ");
    $rootScope.dataArtistaRegistrado = JSON.parse(window.localStorage.getItem('artistaLogueado'));
    
    var storage = firebase.storage();
    var pathReference = storage.ref($rootScope.dataArtistaRegistrado.uid+'/logo.png');
     pathReference.getDownloadURL().then(function(url) {
      console.log("descarga archivo "); 
      console.log(url);

      $rootScope.dataArtistaRegistrado.photoURL = url ; 
       console.log(JSON.stringify($rootScope.dataArtistaRegistrado));
      
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

   
})