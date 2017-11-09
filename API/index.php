<?php 
require "flight/Flight.php"; 
require "autoload.php";
header('Acces-Control-Allow-Origin: *');
//Enregistrer en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());

Flight::route('POST /user', function(){
    $username = Flight::request()->data["username"];
    $password = Flight::request()->data["password"];
    $status = [
        "success"=>false,
        "id"=> 0
    ];
    if(strlen($username)==0 || strlen($password)==0){
        echo json_encode($status);
    }
    else{
        $user = new User();
        $user->setUsername($username);
        $user->setPassword($password);
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getUserRepository();
        $id = $repo->insertUser($user);
        if($id != 0){
            $status["success"] = true;
            $status["id"] = $id;
        };
        echo json_encode($status);
    };
});

Flight::route("GET /user", function(){
    $username = Flight::request()->query["username"];
    $password = Flight::request()->query["password"];

    $status = [
        "success" => false,
        "user" => false
    ];

    $user = new User();
    $user->setUsername($username);
    $user->setPassword($password);

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getUserRepository();
    $user = $repo->selectUser( $user );
    
    if( $user != false ){
        $status["success"] = true;
        $status["user"] = $user;
    }

    echo json_encode( $status );
    

});

Flight::route('POST /pokemon', function(){
    $id_user = Flight::request()->data["id_user"];
    $Pokemon = Flight::request()->data["pokemon"];
    var_dump($id_user);var_dump($Pokemon);
    $status = [
        "success"=>false,
        "id"=> 0
    ];
    if(strlen($id_user)==0 || strlen($Pokemon)==0){
        echo json_encode($status);
    }
    else{
        $pokemon = new Pokemon();
        $pokemon->setId_user($id_user);
        $pokemon->setPokemon($Pokemon);
        $bddManager = Flight::get("BddManager");
        var_dump($pokemon);
        $repo = $bddManager->getPokemonRepository();
        $id = $repo->insertPokemon($pokemon);
        if($id != 0){
            $status["success"] = true;
            $status["id"] = $id;
        };
        echo json_encode($status);
    };
});

Flight::route("GET /pokemon/@id_user", function( $id_user ){
    
    $Pokemon = Flight::request()->query["pokemon"];
    
$status = [
    "success" => false,
    "pokemon" => false
];

$pokemon = new Pokemon();
$pokemon->setId_user($id_user);
$pokemon->setPokemon($Pokemon);


$bddManager = Flight::get("BddManager");
$repo = $bddManager->getPokemonRepository();
$pokemon = $repo->getPokemonByUser_Id($pokemon);



if( $pokemon != false ){
    $status["success"] = true;
    $status["pokemon"] = $pokemon;
}

echo json_encode( $status );

});
Flight::start();