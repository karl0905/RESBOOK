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
        restaurant_info.image,
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

    // get the image from the file system
    foreach ($restaurants as $key => $restaurant) {
        $image = $restaurant['image'];
        if ($image) {
            $imagePath = "/images/$image";            
        } else {
            $imagePath = "/images/placeholder-image.webp";
        }
        $restaurants[$key]['image'] = $imagePath;
    }

    // Return JSON response
    echo json_encode($restaurants);
} else {
  // Query to fetch data from both tables and calculate current capacity
    // Get the restaurant ID from the query parameter
    $restaurant_id = isset($_GET['id']) ? intval($_GET['id']) : null;

    // Base query
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
        WHERE 1=1
    ";

    $params = [];
    $types = "";

    // Add restaurant_id condition if present
    if ($restaurant_id !== null) {
        $query .= " AND restaurants.id = ?";
        $params[] = $restaurant_id;
        $types .= "i";
    }

    // Add admin condition if user is admin
    if ($isAdmin) {
        $query .= " AND restaurant_info.admin_id = ?";
        $params[] = $id;
        $types .= "i";
    }

    $query .= " GROUP BY restaurants.id, restaurant_info.id";

    $stmt = $mySQL->prepare($query);

    // Bind parameters if any
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
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
}


