<?php
    header("Content-Type: application/json; charset=UTF-8");
    
    $conexion = require 'conexion.php';

    try {
        $sql = "SELECT * FROM lugares ORDER BY id DESC";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        
        $lugares = $stmt->fetchAll();

        // Convertir IDs y coordenadas a tipos numéricos para que React no tenga problemas
        foreach ($lugares as &$lugar) {
            $lugar['id'] = (int)$lugar['id'];
            if ($lugar['latitud'] !== null && $lugar['longitud'] !== null) {
                $lugar['coords'] = [(float)$lugar['latitud'], (float)$lugar['longitud']];
            } else {
                $lugar['coords'] = null;
            }
            // Descartamos campos duplicados de la respuesta si es necesario
            unset($lugar['latitud'], $lugar['longitud']);
        }

        echo json_encode($lugares);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
?>