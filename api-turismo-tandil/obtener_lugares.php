<?php
// Endpoint para obtener el catálogo completo de prestadores y puntos turísticos
$conexion = require 'conexion.php';

try {
    $sql = "SELECT id, nombre, tipo, subtipo, descripcion, infoAmpliada, direccion, horarios, latitud, longitud, imagen, recomendado FROM lugares ORDER BY id ASC";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $filas = $stmt->fetchAll();

    $lugares = array_map(function($fila) {
        $coords = null;
        if (!empty($fila['latitud']) && !empty($fila['longitud'])) {
            $coords = [(float)$fila['latitud'], (float)$fila['longitud']];
        }
        return [
            'id' => (int)$fila['id'],
            'nombre' => $fila['nombre'],
            'tipo' => $fila['tipo'],
            'subtipo' => $fila['subtipo'],
            'descripcion' => $fila['descripcion'],
            'infoAmpliada' => $fila['infoAmpliada'],
            'direccion' => $fila['direccion'],
            'horarios' => $fila['horarios'],
            'imagen' => $fila['imagen'],
            'coords' => $coords,
            'recomendado' => (bool)$fila['recomendado']
        ];
    }, $filas);

    echo json_encode($lugares, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error al obtener lugares: " . $e->getMessage()
    ]);
}
?>
