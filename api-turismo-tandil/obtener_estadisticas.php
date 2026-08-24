<?php
header("Content-Type: application/json; charset=UTF-8");

$conexion = require 'conexion.php';

try {
    // Cantidad total de visitas
    $sqlTotal = "SELECT COUNT(*) FROM visitas";
    $stmtTotal = $conexion->prepare($sqlTotal);
    $stmtTotal->execute();
    $total = $stmtTotal->fetchColumn();

    // Visitas de hoy
    $sqlHoy = "SELECT COUNT(*) FROM visitas WHERE DATE(fecha) = CURDATE()";
    $stmtHoy = $conexion->prepare($sqlHoy);
    $stmtHoy->execute();
    $hoy = $stmtHoy->fetchColumn();

    // Visitas de esta semana
    $sqlSemana = "SELECT COUNT(*) FROM visitas 
                  WHERE YEARWEEK(fecha, 1) = YEARWEEK(CURDATE(), 1)";
    $stmtSemana = $conexion->prepare($sqlSemana);
    $stmtSemana->execute();
    $semana = $stmtSemana->fetchColumn();

    // Visitas de este mes
    $sqlMes = "SELECT COUNT(*) FROM visitas 
               WHERE YEAR(fecha) = YEAR(CURDATE())
               AND MONTH(fecha) = MONTH(CURDATE())";
    $stmtMes = $conexion->prepare($sqlMes);
    $stmtMes->execute();
    $mes = $stmtMes->fetchColumn();

    echo json_encode([
        "total" => (int)$total,
        "hoy" => (int)$hoy,
        "semana" => (int)$semana,
        "mes" => (int)$mes
    ]);

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        "error" => "Error al obtener estadísticas: " . $e->getMessage()
    ]);
}
?>