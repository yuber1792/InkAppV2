angular.module('inkgps.estilos', [])


.controller('PlaylistsCtrl', function($scope,$ionicModal,$state,$window,$ionicPopup,$rootScope) {
  //console.log("entra controlador play");
    /*$scope.irTab =  function(nombre){
         //$window.location.href = '#/app/'+nombre;
        
         console.log("ir tab index "  +$scope.loginData.usuario ); 
         if(nombre === 'editarArtista' || nombre === 'editarFotos'){

            $state.go('app.'+nombre , {'usuario' : window.localStorage.getItem("usuario") ,'clave' : window.localStorage.getItem("clave")});
         }else if (nombre === 'descubrir'){
            $state.go('app.'+nombre);
             $rootScope.shuffleArray($rootScope.artistas);
          
         }else{

           $state.go('app.'+nombre);
         }
     
    }*/
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
