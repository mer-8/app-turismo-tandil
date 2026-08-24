<?php
// Endpoint para obtener la agenda oficial de eventos
$conexion = require 'conexion.php';

try {
    $sql = "SELECT id, nombre, descripcion, fecha, horario, lugar, imagen FROM eventos ORDER BY fecha ASC";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $eventos = $stmt->fetchAll();

    echo json_encode($eventos, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error al obtener eventos: " . $e->getMessage()
    ]);
}
?>
