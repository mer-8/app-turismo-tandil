<?php
    header("Content-Type: application/json; charset=UTF-8");
    
    $conexion = require 'conexion.php';

    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);

    if (!empty($datos['nombre']) && !empty($datos['direccion'])) {
        try {
            $sql = "INSERT INTO lugares (nombre, tipo, subtipo, descripcion, infoAmpliada, direccion, horarios, imagen) 
                    VALUES (:nombre, :tipo, :subtipo, :descripcion, :infoAmpliada, :direccion, :horarios, :imagen)";
            
            $stmt = $conexion->prepare($sql);
            $stmt->execute([
                ':nombre'       => $datos['nombre'],
                ':tipo'         => $datos['tipo'] ?? 'Paseo',
                ':subtipo'      => $datos['subtipo'] ?? '',
                ':descripcion'  => $datos['descripcion'] ?? '',
                ':infoAmpliada' => $datos['infoAmpliada'] ?? $datos['descripcion'] ?? '',
                ':direccion'    => $datos['direccion'],
                ':horarios'     => $datos['horarios'] ?? '',
                ':imagen'       => $datos['imagen'] ?? ''
            ]);

            $idGenerado = (int)$conexion->lastInsertId();
            
            $nuevoLugar = [
                'id'           => $idGenerado,
                'nombre'       => $datos['nombre'],
                'tipo'         => $datos['tipo'] ?? 'Paseo',
                'subtipo'      => $datos['subtipo'] ?? '',
                'descripcion'  => $datos['descripcion'] ?? '',
                'infoAmpliada' => $datos['infoAmpliada'] ?? '',
                'direccion'    => $datos['direccion'],
                'horarios'     => $datos['horarios'] ?? '',
                'imagen'       => $datos['imagen'] ?? ''
            ];

            echo json_encode(['exito' => true, 'lugar' => $nuevoLugar]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['exito' => false, 'error' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['exito' => false, 'error' => 'Datos incompletos']);
    }
?>