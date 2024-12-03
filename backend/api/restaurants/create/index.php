<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

header("Content-Type: application/json");

$id = authorize($mySQL);

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['message' => 'Invalid JSON input']);
    exit;
}

if (!isset($data['name'], $data['phone'], $data['address'], $data['rating'], $data['capacity'], $data['description'])) {
    echo json_encode(['message' => 'Missing required parameters']);
    exit;
}

$query1 = "INSERT INTO restaurants (name, phone, address) VALUES (?, ?, ?);";
$query2 = "INSERT INTO restaurant_info (id, rating, capacity, description) VALUES (LAST_INSERT_ID(), ?, ?, ?);";

$stmt1 = $mySQL->prepare($query1);
$stmt1->bind_param('sss', $data['name'], $data['phone'], $data['address']);
$stmt1->execute();
$stmt1->close();

$stmt2 = $mySQL->prepare($query2);
$stmt2->bind_param('sss', $data['rating'], $data['capacity'], $data['description']);
$stmt2->execute();
$stmt2->close();

echo json_encode(['message' => 'Restaurant created successfully']);
?>