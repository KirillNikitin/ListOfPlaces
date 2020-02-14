<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);

$conn = new mysqli('remotemysql.com:3306/1oT74g0Xym', '1oT74g0Xym', '3hDxcA0K6u', '1oT74g0Xym') or die(mysqli_error($conn));
$stmt = $conn->prepare("SELECT * FROM data");
//$stmt->bind_param("", $obj->table);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>