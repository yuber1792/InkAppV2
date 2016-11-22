angular.module('inkgps.califica', [])

.controller('calificarController', function($ionicSlideBoxDelegate,$sce,$cordovaSQLite,$state,$ionicLoading, $ionicScrollDelegate,$scope,$ionicModal ,$window,$http ,$rootScope ,$ionicPopup,$timeout ,$compile,$cordovaCamera, $stateParams,Scopes ,$cordovaDevice,$cordovaSocialSharing ,$cordovaScreenshot ,$templateCache,$firebaseObject,$ionicSideMenuDelegate ,$firebaseArray,$firebaseAuth,$cordovaOauth,$cordovaBarcodeScanner,$crypto,TDCardDelegate) {
  Scopes.store('calificarController', $scope);




  $rootScope.dataClienteRegistrado = JSON.parse(window.localStorage.getItem('clienteLogueado'));
  var ref =  firebase.database().ref() ;
  var refDataCliente = ref.child("PuntosCliente");
  $scope.contador =  0 ; 
  $scope.calificacionActiva = false  ;
  $scope.dataFecha = {};
  $scope.mostrarFotos = true ; 
  refDataCliente.child($rootScope.dataClienteRegistrado.uid).update({
	  		fechaIngreso : firebase.database.ServerValue.TIMESTAMP
  });
$scope.puntos = 0 ; 
  	refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("puntos").on("value", function(datosPuntos){

  		$scope.puntos = datosPuntos.val();
  		console.log("puntos " +$scope.puntos  );
  		 
  	});

  refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("fechaUltimaCalificacion").once("value", function(datosFecha){
	  	$scope.fechaObtenida = datosFecha.val();
	  	if($scope.fechaObtenida === "nuevo"){
	  		console.log("Es  usuario nuevo y nunca ha calificado ");
	  		$scope.mostrarFotos = false ; 
	  		$scope.cargarFotosCalificacion();
	  	}else{
	  		console.log("ultima fecha calificacion" + $scope.fechaObtenida);
			$scope.dataFecha.fechaCalificacion = new Date($scope.fechaObtenida);
			$scope.dataFecha.fechaCalificacion.setHours(0);
			$scope.dataFecha.fechaCalificacion.setMinutes(0);
			$scope.dataFecha.fechaCalificacion.setSeconds(0);
			$scope.dataFecha.fechaCalificacion.setMilliseconds(0);
			console.log("ultima fecha calificacion  convertida" + $scope.dataFecha.fechaCalificacion.toLocaleString());
			refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("fechaIngreso").once("value", function(datosFechaIngreso){
				$scope.fechaIngreso = datosFechaIngreso.val();
				$scope.dataFecha.fechaActual = new Date($scope.fechaIngreso);
			    $scope.dataFecha.fechaActual.setHours(0);
			    $scope.dataFecha.fechaActual.setMinutes(0);
			    $scope.dataFecha.fechaActual.setSeconds(0);
			    $scope.dataFecha.fechaActual.setMilliseconds(0);
				console.log(" fecha actual  calificacion  convertida" + $scope.dataFecha.fechaActual.toLocaleString());
				if($scope.dataFecha.fechaActual > $scope.dataFecha.fechaCalificacion ){
					console.log("fecha actual es mayor ");
					$scope.mostrarFotos = false ;
					$scope.cargarFotosCalificacion();

				}else{
					 $scope.mostrarFotos = true ; 
					console.log("fecha actual es menor o igual ");
					 $scope.$apply();
				}
		  	});
	  	}

   });



  $scope.calificar = function(calificacion  , posicion ){

  	console.log("calificacion");
  	console.log("calificacion : " + calificacion);
  	console.log("idCliente  :"+$rootScope.dataClienteRegistrado.uid);
  	console.log("paquete : " + $scope.datosCLiente.paqueteCalificacion);
  	console.log("posicion : " + posicion);
  //	console.log("posicionCalificacion : " +$scope.datosCLiente.posicionCalificacion );
  	$scope.cardTypes[posicion].visible = false ;
  

  
  	
  	refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("posicionCalificacion").once("value", function(datos){
	  	$scope.contador = datos.val();
	  	$scope.contador  = parseInt($scope.contador) + 1 ;  
	  	refDataCliente.child($rootScope.dataClienteRegistrado.uid).update({
	  		posicionCalificacion : parseInt($scope.contador)
	  	});
	  	console.log("contador : " +parseInt($scope.contador));
	  	  console.log("tamaño" +$scope.cardTypes.length);
    //$scope.validador = $scope.cardTypes.length-1;
    if($scope.contador  ===   $scope.cardTypes.length){
    	console.log("finaliza calificacion ");
    	refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("paqueteCalificacion").once("value", function(datos1){
		  	
		  	$scope.paquete = datos1.val();
		  	console.log("paquete" + $scope.paquete);
		  	$scope.paquete  = $scope.paquete + 1 ;  

		  

		  	refDataCliente.child($rootScope.dataClienteRegistrado.uid).child("puntos").once("value", function(datosPuntos){
		  			 $scope.puntos = datosPuntos.val();
		  			 $scope.puntos  = $scope.puntos + 1 ; 

		  			 refDataCliente.child($rootScope.dataClienteRegistrado.uid).update({
				  		fechaUltimaCalificacion :firebase.database.ServerValue.TIMESTAMP,
				    	paqueteCalificacion : $scope.paquete,
				  		posicionCalificacion : 0 ,
				  		puntos :  $scope.puntos 
		  			 });
		  			
		  			 $scope.calificacionActiva = true  ;
		  	         $scope.mostrarFotos = true ; 
		  	         $scope.$apply();

		  	});

		  	
		  	
	    });
	   

    }
    });
  


  }

  $scope.cargarFotosCalificacion = function(){

  	refDataCliente.child($rootScope.dataClienteRegistrado.uid).once("value", function(datos){
  
  
   	console.log(JSON.stringify(datos.val()));
      $scope.datosCLiente = datos.val();
      if($scope.datosCLiente.posicionCalificacion > 0){
  		$scope.contador = $scope.contador + $scope.datosCLiente.posicionCalificacion ; 
  	  }
      $scope.dataFotos = {};
        $scope.cards = {};
      var paquetesDatos    = ref.child("paquetesCalificacion");
     //  var cardTypes =[];
       $scope.cardTypes = [];
    
       paquetesDatos.child($scope.datosCLiente.paqueteCalificacion).on("value", function(datosFotos){
     		console.log(JSON.stringify(datosFotos.val()));
     		$scope.dataFotos = datosFotos.val();
            $scope.contador =  0 ; 
     		 angular.forEach($scope.dataFotos, function(user,key) {
     		 	console.log($scope.dataFotos[key].photoUrl);
     		 		 var storage = firebase.storage();
					    var pathReference = storage.ref('fotosPaquetes/'+$scope.dataFotos[key].photoUrl);
					     pathReference.getDownloadURL().then(function(url) {
					      console.log("descarga archivo "); 
					      console.log(url);
					      if( key >= $scope.datosCLiente.posicionCalificacion  ){
					      	 $scope.cardTypes[key] = {image:url,
					      					uidArtista:$scope.dataFotos[key].uidArtista,
					      				    visible : true ,
					      				    contador  :  $scope.contador};
						   
					      }
					        $scope.contador = $scope.contador + 1 ;
						        console.log("cartas");
					     		 console.log($scope.cardTypes)
					     	  $scope.$apply();
					    
					      
					      
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


     		 }); //end foreach 
     	
			  


     }); //en paquete calificaicon
   

	 /*  var cardTypes = [
	    { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
	    { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
	    { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
	    { image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
	    { image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
	    { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
	    { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' }
	  ];*/


   });  // end  on 
  }
 

 		
  
 


  


$scope.cardDestroyed = function(index) {
			    $scope.cards.active.splice(index, 1);
			      var card = $scope.cards.active[index];
			  };


			  
			  $scope.addCard = function() {
			    var newCard = cardTypes[0];
			    $scope.cards.active.push(angular.extend({}, newCard));
			  }


			  $scope.refreshCards = function() {
			    // Set $scope.cards to null so that directive reloads
			    $scope.cards.active = null;
			    $timeout(function() {
			      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
			    });
			  }

			  $scope.$on('removeCard', function(event, element, card) {
			    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
			    $scope.cards.discards.push(discarded);
			  });
			
			  $scope.cardSwipedLeft = function(index) {
			    console.log('LEFT SWIPE');
			    console.log("no me gusta" + $scope.cards.master.length);
			     if($scope.calificacionActiva){
				    var card = $scope.cards.active[index];
				    $scope.cards.disliked.push(card);
				    //califica
				    $scope.calificar(false, $rootScope.dataClienteRegistrado.uid  ,$scope.datosCLiente.paqueteCalificacion, $scope.contador);
				    $scope.contador  = $scope.contador + 1 ;  
				    if($scope.contador  === $scope.cards.master.length){
				    	console.log("finaliza debe asignar puntos");
				    	$scope.calificacionActiva= false ; 
				    }
				}else{
					console.log("calificaicon finalizada");
				}
			      
			  };
			  $scope.cardSwipedRight = function(index) {
			    console.log('RIGHT SWIPE');
			    console.log("me gusta" + $scope.cards.master.length);
			    if($scope.calificacionActiva){
				    var card = $scope.cards.active[index];
				    $scope.cards.liked.push(card);
				    $scope.calificar(true, $rootScope.dataClienteRegistrado.uid  ,$scope.datosCLiente.paqueteCalificacion, $scope.contador);
				     $scope.contador  = $scope.contador + 1 ; 
				    if($scope.contador  === $scope.cards.master.length){
				    	console.log("finaliza debe asignar puntos");
				    	$scope.calificacionActiva = false ; 
				    }
				}else{
					console.log("calificaicon finalizada");
				}
			      
			  };
  

})