<?php

header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");
$id = $token->data->id;

//$input = @json_decode(file_get_contents("php://input"));

//$id = 1;
//$input = (object) array("id" => 9);

if($input == null or !isset($input->id) ) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}




try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare('SELECT id, nome, plano, descricao,detalhado from trabalho where id_freelancer = :id_freelancer AND id = :id');
    $stmt->bindValue(':id_freelancer', $id, PDO::PARAM_INT);
    $stmt->bindValue(':id',$input->id,PDO::PARAM_INT);
    $stmt->execute();
    $trab = array();
    $trab['trabalhos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($trab);
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;