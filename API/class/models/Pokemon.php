<?php
class Pokemon extends Model implements JsonSerializable {

    private $id_user;
    private $Pokemon;

    function getId_user(){
        return $this->id_user;
    }

    function getPokemon(){
        return $this->Pokemon;
    }

    function setId_user( $id_user ){
        $this->id_user = $id_user;
    }

    function setPokemon( $Pokemon ){
        $this->Pokemon = $Pokemon;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "id_user" => $this->id_user,
            "Pokemon" => $this->Pokemon
        ];
    }

}