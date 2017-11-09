class App{
    constructor(){
        //Pokemon
        this.flag =false;
        this.$form=$("#form");
        this.$eau = $("#eau");
        this.$feu = $("#feu");
        this.$electrik = $("#electrik");
        this.$type = $("#type");
        this.$checkboxes = $("input[type=checkbox]");
        this.$pokemon=$("#pokemon");
        this.$pokattrape=$("#pokattrape");
        this.$Pokedex=$("#Pokedex");
        this.$map=$("#maps");
        this.$info=$("#inf")
        this.$user=$("#user")
        this.$submit=$(".submit")
        this.$username=$("#username")
        this.$password=$("#password")
        this.$usernames=$("#usernames")
        this.$passwords=$("#passwords")
        this.$insc=$("#insc")
        this.$conn=$("#conn")
        this.map=null;
        this.main = null
        this.pokemons=[];
        this.event = null;
        this.pokeball= null;
        this.spawnInterval=0;
        this.markers=[];
        this.id = 0;
        this.pokedex=[];
        this.spawnInterval=0;
        this.users = [];
        this.user = null;
        this.reinit();

    //Evenement
    
        this.$date_debut = $("#date_debut");
        this.$date_fin = $("#date_fin");
        this.initPickers();
    }
    reinit() {
        this.$form.slideUp(300);
        this.$username.val("");
        this.$password.val("");
    }

    addUser( user ){
        this.users.push( user );
    }
    
    //Pokemon
    initMap(){
       
        this.map = new google.maps.Map(document.getElementById('maps'), {
            center: {lat: 42.6990297, lng: 2.8344617},
            zoom: 11,
            scrollwheel: false,
            streetViewControl: false,
            zoomControl: false,
            draggable:false,
            keyboardShortcuts : true
          });
		
		 this.centerOnGeolocation(); //Ici !
         this.main();
    }
    centerOnGeolocation(){
        
        
        var that = this;
        navigator.geolocation.getCurrentPosition(function (position){
              var pos ={
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              }
              that.map.setCenter(pos);
          })
        }

        displayPokedex(){
            console.log("2")
            var div = document.getElementById("pokemon")
            while(div.firstChild){
                div.removeChild(div.firstChild)
            }
            for(var pokede of this.pokedex ){
            
               this.$pokemon.append(pokede.toHtml());
       
            }
        }

        
   
    filter(dresseur){
    
            var posDresseur =new google.maps.LatLng(dresseur.getPosition().lat(), dresseur.getPosition().lng());
        
            for( var mark of this.markers){
                var distance = google.maps.geometry.spherical.computeDistanceBetween( posDresseur,mark.position);
                console.log(mark, distance, this.event);
                if(distance<8000 && ( this.event == mark.type || this.event == null )  ){
                    mark.marker.setVisible(true);
                }
                else{
                    mark.marker.setVisible(false);
                }
            }
    
        }
    
        initPickers(){
            
                    var options = {
                        dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                        dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
                        monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                        monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
                        firstDay : 1,
                        minDate : new Date( 2017, 9, 19 ),
                        maxDate : new Date( 2017, 9, 19 ),
                        beforeShowDay : $.proxy(this.closedDay, this), //Pour ne pas perdre le "this" en tant que mon App
                        dateFormat : "dd/mm/yy"
                    };
            
                    this.$date_debut.datepicker( options );
                    this.$date_fin.datepicker( options );
            
                }
        
    saveUser( user ){

                var that = this;
                var username=this.$username.val();
                var password=this.$password.val();
                $.ajax({
                    url : "http://localhost:8888/cours/TPAjax/API/user",
                    method : "POST",
                    data : {
                        username : username,
                        password : password
                    },
                    dataType : "json",
                    success : function( data ){
                        console.log(data);
                        
                        if( data.success == true ){
                            
                            that.addUser( user );
                        }
                        else {
                            alert( "Une erreur est survenue lors de l'enregistrement !" );
                        }
        
                    },
                    error : function( error ){
                        console.log( error );
                    }
                })
        
            }

     readUser(){
        var that = this;
        var username=this.$usernames.val();
        var password=this.$passwords.val();
                $.ajax({
                    url: "http://localhost:8888/cours/TPAjax/API/user",
                    method: "GET",
                    data : {
                        username : username,
                        password : password
                    },
                    dataType: "json",
                    success : function( data ){ 
        
                        if( data.success == true ){
                            
                            that.user = new User(data.user.username, data.user.password);
                            that.user.id = data.user.id;
                            that.user.display();
                            
                            console.log(username)
                        this.username= username;
                        }
                        
        
                    },
                    error : function( error ){
                        console.log(error);
                        alert("error");
                    }
                });
    }

    savePokemon(pokemon){
             
                        var that = this;
                        var username= this.username;
                       
                        console.log(pokemon);
                        $.ajax({
                            url : "http://localhost:8888/cours/TPAjax/API/pokemon/",
                            method : "POST",
                            data : {
                                pokemon : pokemon,
                                id_user : that.user.id
                            },
                            dataType : "json",
                            success : function( data ){
                                console.log(data);
                                
                                if( data.success == true ){
                                    
                                   alert("reussi");
                                }
                                else {
                                    alert( "Une erreur est survenue lors de l'enregistrement !" );
                                }
                
                            },
                            error : function( error ){
                                console.log( error );
                            }
                        })
                
                    }
}