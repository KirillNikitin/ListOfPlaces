<?php

$mysqli = new mysqli('db4free.net:3306/sql7324007', 'sql7324007', 'ALJiM7jJBc', 'sql7324007') or die(mysqli_error($mysqli));
$action = (isset($_POST['action'])) ? $_POST['action'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$title = (isset($_POST['title'])) ? $_POST['title'] : '';
$description = (isset($_POST['description'])) ? $_POST['description'] : '';
$latitude = (isset($_POST['latitude'])) ? $_POST['latitude'] : '';
$longitude = (isset($_POST['longitude'])) ? $_POST['longitude'] : '';
$opening_hours = (isset($_POST['opening_hours'])) ? $_POST['opening_hours'] : '';
$closing_hours = (isset($_POST['closing_hours'])) ? $_POST['closing_hours'] : '';
$picked = (isset($_POST['picked'])) ? $_POST['picked'] : '';


if($action == 'send'){
    $mysqli->query("INSERT INTO data (title, description, latitude, longitude, opening_hours, closing_hours, picked) VALUES('$title', '$description', '$latitude', '$longitude', '$opening_hours', '$closing_hours', '$picked')") or die($mysqli->error);
}


$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$action = (isset($_POST['action'])) ? $_POST['action'] : '';
if ($id && $action == 'delete'){
    $mysqli->query("DELETE FROM data WHERE id=$id") or die($mysqli->error());
}


if ($id && $action == 'edit'){
    $title = (isset($_POST['title'])) ? $_POST['title'] : '';
    $description = (isset($_POST['description'])) ? $_POST['description'] : '';
    $result = $mysqli->query("UPDATE data SET title='$title', description='$description', latitude='$latitude', longitude='$longitude', opening_hours='$opening_hours', closing_hours='$closing_hours', picked='$picked' WHERE id=$id") or die($mysqli->error());
}

?>

