<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

header("Content-Type: application/json");

$id = authorize($mySQL);

$data = json_decode(file_get_contents('php://input'), true);
$query = "
    UPDATE restaurants 
    INNER JOIN restaurant_info ON restaurants.id = restaurant_info.id
    SET 
        restaurants.name = ?, 
        restaurants.phone = ?, 
        restaurants.address = ?, 
        restaurant_info.rating = ?, 
        restaurant_info.capacity = ?, 
        restaurant_info.description = ?
    WHERE 
        restaurants.id = ?
";

$stmt = $mySQL->prepare($query);
$stmt->bind_param('ssssssi', $data['name'], $data['phone'], $data['address'], $data['rating'], $data['capacity'], $data['description'], $data['id']);
$stmt->execute();
$stmt->close();

echo json_encode(['message' => 'Restaurant updated successfully']);
?>