<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);

$conn = new mysqli('johnny.heliohost.org:3306/kennynik_sql7324007', 'kennynik_sql7324007', 'ALJiM7jJBc', 'kennynik_sparedb') or die(mysqli_error($conn));
$stmt = $conn->prepare("SELECT * FROM data");
//$stmt->bind_param("", $obj->table);
$stmt->execute();
$result = $stmt->get_result();
$outp = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($outp);
?>