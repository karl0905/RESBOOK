<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");

$input = handle_api_request('GET');
$id = authorize($mySQL);
$isAdmin = is_res_admin($mySQL, $id);

// Get the restaurant ID from the query parameter
$restaurant_id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Base query
$query = "
    SELECT 
        restaurants.id,
        restaurants.name,
        restaurants.phone,
        restaurants.address,
        restaurants.email,
        restaurant_info.rating,
        restaurant_info.capacity,
        restaurant_info.description,
        restaurant_info.image,
        restaurant_info.admin_id,
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

$params = [];
$types = "";

if ($restaurant_id !== null) {
  $query .= " WHERE restaurants.id = ?";
  $params[] = $restaurant_id;
  $types .= "i";
} elseif ($isAdmin) {
  $query .= " WHERE restaurant_info.admin_id = ?";
  $params[] = $id;
  $types .= "i";
}

$query .= " GROUP BY restaurants.id, restaurant_info.id";

$stmt = $mySQL->prepare($query);

if (!empty($params)) {
  $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

$restaurants = [];
while ($row = $result->fetch_assoc()) {
  $row['current_capacity'] = (int)$row['current_capacity'];

  // Process image
  $image = $row['image'];
  if ($image) {
    $imagePath = "/images/$image";
  } else {
    $imagePath = "/images/placeholder-image.webp";
  }
  $row['image'] = $imagePath;

  // Check if user is admin for this restaurant
  $row['is_admin'] = ($isAdmin && $row['admin_id'] == $id);

  unset($row['admin_id']); // Remove admin_id from the output

  $restaurants[] = $row;
}

if ($restaurant_id !== null && empty($restaurants)) {
  echo json_encode(['error' => 'Restaurant with ID ' . $restaurant_id . ' not found']);
} else {
  // Return single restaurant or array of restaurants
  echo json_encode($restaurant_id !== null ? $restaurants[0] : $restaurants);
}