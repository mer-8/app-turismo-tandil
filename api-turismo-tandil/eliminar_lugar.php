<?php
    header("Content-Type: application/json; charset=UTF-8");
    
    $conexion = require 'conexion.php';

    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

    if ($id > 0) {
        try {
            $sql = "DELETE FROM lugares WHERE id = :id";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([':id' => $id]);

            echo json_encode(['exito' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['exito' => false, 'error' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['exito' => false, 'error' => 'ID no válido']);
}
?>