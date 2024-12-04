<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");

$input = handle_api_request('GET');
$id = authorize($mySQL);


$isAdmin = is_res_admin($mySQL, $id);

if (!$isAdmin) {
    // Query to fetch data from both tables and calculate current capacity
    $query = "
    SELECT 
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
    GROUP BY 
        restaurants.id, restaurant_info.id
    ";

    $stmt = $mySQL->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $restaurants = [];
    while ($row = $result->fetch_assoc()) {
        $row['current_capacity'] = (int)$row['current_capacity']; // Cast to integer
        $restaurants[] = $row;
    }

    // Return JSON response
    echo json_encode($restaurants);
} else {
    // Query to fetch restaurants that belong to the user ID
    $query = "
    SELECT 
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
    WHERE 
        restaurant_info.admin_id = ?
    GROUP BY 
        restaurants.id, restaurant_info.id
    ";

    $stmt = $mySQL->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $restaurants = [];
    while ($row = $result->fetch_assoc()) {
        $row['current_capacity'] = (int)$row['current_capacity']; // Cast to integer
        $restaurants[] = $row;
    }

    // Return JSON response
    echo json_encode($restaurants);
}