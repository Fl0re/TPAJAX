<?php 
//BddManager va contenir les instances de nos repository
class BddManager {

    private $UserRepository;
    private $PokemonRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->UserRepository = new UserRepository( $this->connection );
        $this->PokemonRepository = new PokemonRepository( $this->connection );
    }

    function getUserRepository(){
        return $this->UserRepository;
    }
    function getPokemonRepository(){
        return $this->PokemonRepository;
    }

}