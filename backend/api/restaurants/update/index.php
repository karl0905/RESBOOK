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

if (!isset($data['id'], $data['name'], $data['phone'], $data['email'], $data['address'], $data['rating'], $data['capacity'], $data['description'])) {
    echo json_encode(['message' => 'Missing required parameters']);
    exit;
}

$query = "
    UPDATE restaurants 
    INNER JOIN restaurant_info ON restaurants.id = restaurant_info.id
    SET 
        restaurants.name = ?, 
        restaurants.phone = ?, 
        restaurants.email = ?, 
        restaurants.address = ?, 
        restaurant_info.rating = ?, 
        restaurant_info.capacity = ?, 
        restaurant_info.description = ?
    WHERE 
        restaurants.id = ?
";

$stmt = $mySQL->prepare($query);
$stmt->bind_param('sssssssi', $data['name'], $data['phone'], $data['email'], $data['address'], $data['rating'], $data['capacity'], $data['description'], $data['id']);
$stmt->execute();
$stmt->close();

echo json_encode(['message' => 'Restaurant updated successfully']);
?>