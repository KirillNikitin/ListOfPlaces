<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);

$conn = new mysqli('remotemysql.com:3306/ve49riIR08', 've49riIR08', '2X0uE6Eeb8', 've49riIR08') or die(mysqli_error($conn));
$stmt = $conn->prepare("SELECT * FROM data");
//$stmt->bind_param("", $obj->table);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>
