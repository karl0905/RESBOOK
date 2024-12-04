<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('PUT');
$id = authorize($mySQL);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['message' => 'Invalid JSON input']);
    exit;
}

if (!isset($input['id'], $input['name'], $input['phone'], $input['email'], $input['address'], $input['rating'], $input['capacity'], $input['description'], $input['booking_duration'])) {
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
        restaurant_info.description = ?, 
        restaurant_info.booking_duration = ?
    WHERE 
        restaurants.id = ?
";

$stmt = $mySQL->prepare($query);
$stmt->bind_param('sssssssii', $input['name'], $input['phone'], $input['email'], $input['address'], $input['rating'], $input['capacity'], $input['description'], $input['booking_duration'], $input['id']);
$stmt->execute();
$stmt->close();

echo json_encode(['message' => 'Restaurant updated successfully']);
?>