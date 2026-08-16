<?php
header("Content-Type: application/json; charset=UTF-8");

$conexion = require 'conexion.php';

try {
    $sql = "INSERT INTO visitas (fecha) VALUES (NOW())";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    echo json_encode([
        "exito" => true
    ]);

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        "exito" => false,
        "error" => "Error al registrar la visita: " . $e->getMessage()
    ]);
}
?>