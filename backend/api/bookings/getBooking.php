<?php
include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');

$id = authorize($mySQL);

// include the is_res_admin function
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");
$is_admin = is_res_admin($mySQL, $id);

// if the user is admin, select all bookings from the restaurant
if ($is_admin) {
    $stmt = $mySQL->prepare("
        SELECT bookings.*, restaurants.name, users.first_name, users.last_name, users.email, users.phone
        FROM bookings
        INNER JOIN restaurant_info ON bookings.restaurant_id = restaurant_info.ID
        INNER JOIN restaurants ON restaurant_info.ID = restaurants.ID
        INNER JOIN users ON bookings.user_id = users.ID
        WHERE restaurant_info.admin_id = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode($bookings);
} else {
    // if the user is not admin, select all bookings from the user
    $stmt = $mySQL->prepare("SELECT bookings.*, restaurants.name, restaurant_info.image FROM bookings INNER JOIN restaurant_info ON bookings.restaurant_id = restaurant_info.ID INNER JOIN restaurants ON restaurant_info.ID = restaurants.ID WHERE bookings.user_id = ?");
    /* $stmt = $mySQL->prepare("SELECT bookings.*, restaurants.name, restaurant_info.image FROM bookings INNER JOIN restaurants ON bookings.restaurant_id = restaurants.ID WHERE bookings.user_id = ?"); */
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    // get the image from the file system
    foreach ($bookings as $key => $booking) {
        $image = $booking['image'];
        if ($image) {
            $imagePath = "/images/$image";            
        } else {
            $imagePath = "/images/placeholder-image.webp";
        }
        $bookings[$key]['image'] = $imagePath;
    }

    echo json_encode($bookings);
}
