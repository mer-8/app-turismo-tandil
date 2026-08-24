<?php
// Endpoint para agregar un evento municipal
$conexion = require 'conexion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json, true);

if (!$datos || empty($datos['nombre']) || empty($datos['fecha'])) {
    http_response_code(400);
    echo json_encode([
        "exito" => false,
        "error" => "Nombre y fecha del evento son requeridos"
    ]);
    exit();
}

try {
    $sql = "INSERT INTO eventos (nombre, descripcion, fecha, horario, lugar, imagen) 
            VALUES (:nombre, :descripcion, :fecha, :horario, :lugar, :imagen)";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ':nombre' => $datos['nombre'],
        ':descripcion' => $datos['descripcion'] ?? '',
        ':fecha' => $datos['fecha'],
        ':horario' => $datos['horario'] ?? '',
        ':lugar' => $datos['lugar'] ?? 'Tandil',
        ':imagen' => $datos['imagen'] ?? ''
    ]);

    $idGenerado = (int)$conexion->lastInsertId();

    echo json_encode([
        "exito" => true,
        "evento" => array_merge($datos, ['id' => $idGenerado])
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "exito" => false,
        "error" => "Error al guardar evento: " . $e->getMessage()
    ]);
}
?>
