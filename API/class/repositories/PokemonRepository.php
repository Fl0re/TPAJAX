<?php 
class PokemonRepository extends Repository {
    function insertPokemon( Pokemon $pokemon ){
        
                $query = "INSERT INTO pokedex SET id_user=:id_user, Pokemon=:Pokemon";
                $prep = $this->connection->prepare( $query );
                $prep->execute( [
                    "id_user" => $pokemon->getId_user(),
                    "Pokemon" => $pokemon->getPokemon()
                ] );
                return $this->connection->lastInsertId();
        
            }


            public function getPokemonByUser_Id( Pokemon $pokemon){
    
                
        $query="SELECT * FROM pokedex WHERE id_user=:id_user AND Pokemon=:Pokemon";
        $prep = $this->connection->prepare( $query );
        $prep->execute(array(
            "id_user" => $pokemon->getId_user(),
            "Pokemon" => $pokemon->getPokemon()
        ));
        $object = $prep->fetch(PDO::FETCH_ASSOC);
       
        return $object;
    }  
            }

        