<?php
// Endpoint para dar de alta un nuevo atractivo/prestador en MySQL
$conexion = require 'conexion.php';

$json = file_get_contents('php://input');
$datos = json_decode($json, true);

if (!$datos || empty($datos['nombre']) || empty($datos['direccion'])) {
    http_response_code(400);
    echo json_encode([
        "exito" => false,
        "error" => "Nombre y dirección son requeridos"
    ]);
    exit();
}

try {
    $sql = "INSERT INTO lugares (nombre, tipo, subtipo, descripcion, infoAmpliada, direccion, horarios, latitud, longitud, imagen, recomendado) 
            VALUES (:nombre, :tipo, :subtipo, :descripcion, :infoAmpliada, :direccion, :horarios, :latitud, :longitud, :imagen, :recomendado)";

    $lat = null;
    $lng = null;
    if (!empty($datos['coords']) && is_array($datos['coords']) && count($datos['coords']) === 2) {
        $lat = (float)$datos['coords'][0];
        $lng = (float)$datos['coords'][1];
    }

    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ':nombre' => $datos['nombre'],
        ':tipo' => $datos['tipo'] ?? 'Paseo',
        ':subtipo' => $datos['subtipo'] ?? '',
        ':descripcion' => $datos['descripcion'] ?? '',
        ':infoAmpliada' => $datos['infoAmpliada'] ?? ($datos['descripcion'] ?? ''),
        ':direccion' => $datos['direccion'],
        ':horarios' => $datos['horarios'] ?? '',
        ':latitud' => $lat,
        ':longitud' => $lng,
        ':imagen' => $datos['imagen'] ?? '',
        ':recomendado' => !empty($datos['recomendado']) ? 1 : 0
    ]);

    $idGenerado = (int)$conexion->lastInsertId();

    $nuevoLugar = array_merge($datos, [
        'id' => $idGenerado,
        'coords' => ($lat !== null && $lng !== null) ? [$lat, $lng] : null,
        'recomendado' => !empty($datos['recomendado'])
    ]);

    echo json_encode([
        "exito" => true,
        "lugar" => $nuevoLugar
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "exito" => false,
        "error" => "Error al guardar en base de datos: " . $e->getMessage()
    ]);
}
?>
