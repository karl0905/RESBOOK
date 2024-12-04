<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');
$id = authorize($mySQL);

header("Content-Type: application/json");

$query = "
    SELECT 
        r.id AS restaurant_id,
        r.name AS restaurant_name,
        r.phone,
        r.email,
        r.address,
        ri.rating,
        ri.capacity,
        ri.description,
        ri.booking_duration,
        COUNT(user_favorites.restaurant_id) AS favorite_count
    FROM restaurants r
    INNER JOIN restaurant_info ri ON r.id = ri.admin_id
    LEFT JOIN user_favorites ON r.id = user_favorites.restaurant_id
    GROUP BY r.id, r.name, r.phone, r.email, r.address, ri.rating, ri.capacity, ri.description, ri.booking_duration
    HAVING favorite_count > 3
    LIMIT 100
";

$stmt = $mySQL->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = $row;
}

$stmt->close();

echo json_encode($favorites);
