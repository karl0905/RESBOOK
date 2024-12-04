<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('GET');
$id = authorize($mySQL);

// Get the restaurant ID from the query parameter
$restaurant_id = isset($_GET['id']) ? intval($_GET['id']) : null;

$query = "
    SELECT
        restaurants.id, 
        restaurants.name,
        restaurants.phone,
        restaurants.address,
        restaurant_info.rating,
        restaurant_info.capacity,
        restaurant_info.description,
        restaurant_info.capacity - COALESCE(SUM(CASE 
            WHEN bookings.datetime <= NOW() AND bookings.booking_end >= NOW() 
            THEN 1 ELSE 0 END), 0) AS current_capacity
    FROM 
        restaurants
    INNER JOIN 
        restaurant_info 
    ON 
        restaurants.id = restaurant_info.id
    LEFT JOIN 
        bookings
    ON 
        restaurants.id = bookings.restaurant_id
";

// Only add the WHERE clause if a specific restaurant ID is provided in the query
if ($restaurant_id !== null) {
  $query .= " WHERE restaurants.id = ?";
}

$query .= " GROUP BY restaurants.id, restaurant_info.id";

$stmt = $mySQL->prepare($query);

// Bind the parameter only if a specific restaurant ID is provided
if ($restaurant_id !== null) {
  $stmt->bind_param("i", $restaurant_id);
}

$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

$restaurants = [];
while ($row = $result->fetch_assoc()) {
  $row['current_capacity'] = (int)$row['current_capacity'];
  $restaurants[] = $row;
}

// Check if a specific ID was requested and if no results were found
if ($restaurant_id !== null && empty($restaurants)) {
  echo json_encode(['error' => 'Restaurant with ID ' . $restaurant_id . ' not found']);
} else {
  // Return the results as JSON
  echo json_encode($restaurants);
}
