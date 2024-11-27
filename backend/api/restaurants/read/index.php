<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');
$id = authorize($mySQL);

header("Content-Type: application/json");

// Query to fetch data from both tables
$query = "
    SELECT 
        restaurants.name,
        restaurants.phone,
        restaurants.address,
        restaurant_info.rating,
        restaurant_info.capacity,
        restaurant_info.description
    FROM 
        restaurants
    INNER JOIN 
        restaurant_info
    ON 
        restaurants.id = restaurant_info.id
";

$stmt = $mySQL->prepare($query);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

$restaurants = [];
while ($row = $result->fetch_assoc()) {
    $restaurants[] = $row;
}

// Return JSON response
echo json_encode($restaurants);
