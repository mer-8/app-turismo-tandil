<?php
// Endpoint para eliminar un lugar por ID
$conexion = require 'conexion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json, true);

if (!$datos || empty($datos['id'])) {
    http_response_code(400);
    echo json_encode([
        "exito" => false,
        "error" => "ID de lugar no proporcionado"
    ]);
    exit();
}

try {
    $sql = "DELETE FROM lugares WHERE id = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([':id' => (int)$datos['id']]);

    echo json_encode([
        "exito" => true,
        "mensaje" => "Lugar eliminado exitosamente"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "exito" => false,
        "error" => "Error al eliminar: " . $e->getMessage()
    ]);
}
?>
