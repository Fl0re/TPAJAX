class User {
    
        constructor( username, password ) {
    
            this.id = 0;
            this.username = username;
            this.password = password;
            
            this.$dom = null;
        }
    
        display(){
    
            var div = "<div class='username' data-id="+this.id+" >";
          
            div += "<h2>" + this.username +  "</h2>";
           
            div += "</div>";
    
            this.$dom = $(div); //$("<div></div>")
            $("body").append( this.$dom );
        }
    
      
    }