<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');

$userId = authorize($mySQL);

header("Content-Type: application/json");

$query = "
        SELECT 
            uf.restaurant_id,
            r.name AS restaurant_name,
            r.phone,
            r.email,
            r.address,
            ri.rating,
            ri.capacity,
            ri.description,
            ri.booking_duration
        FROM user_favorites uf
        INNER JOIN restaurant_info ri ON uf.restaurant_id = ri.ID   
        INNER JOIN restaurants r ON uf.restaurant_id = r.id
        WHERE uf.user_id = ?
        ORDER BY r.name ASC
";

$stmt = $mySQL->prepare($query);
$stmt->bind_param("i", $userId);
$stmt->execute();

$result = $stmt->get_result();
$favorites = [];

while ($row = $result->fetch_assoc()) {
    $favorites[] = $row;
}

$stmt->close();

echo json_encode($favorites);
