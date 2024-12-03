<?php
include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');

$id = authorize($mySQL);

if (!isset($input['restaurant_id']) || !isset($input['date']) || !isset($input['time']) || !isset($input['guest_count'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// include the is_res_admin function
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");
$is_admin = is_res_admin($mySQL, $id, $input['restaurant_id']);

// if guest count is below 1, return an error
if ($input['guest_count'] < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Guest count must be at least 1']);
    exit();
} else if ($input['guest_count'] > 10 && !$is_admin) {
    http_response_code(400);
    echo json_encode(['error' => 'Only restaurant admins can create bookings for more than 10 guests']);
    exit();
}

//If date is in the past, return an error
if (strtotime($input['date']) < strtotime(date('Y-m-d'))) {
    http_response_code(400);
    echo json_encode(['error' => 'Date cannot be in the past']);
    exit();
}

// Check if the capacity for the restaurant has been exceeded for the given date and time
$restaurant_id = $input['restaurant_id'];
$result = $mySQL->query("SELECT capacity FROM restaurant_info WHERE ID = $restaurant_id")->fetch_object();
$capacity = $result->capacity;

// get the number of bookings and the total guest count for the given date and time, and then check if the capacity has been exceeded
$datetime = $input['date'] . ' ' . $input['time'];

// Calculate the booking_end based on the booking duration
$restaurant_id = $input['restaurant_id'];

// Fetch the booking duration from the restaurant_info table
$duration_stmt = $mySQL->prepare("SELECT booking_duration FROM restaurant_info WHERE id = ?");
$duration_stmt->bind_param("i", $restaurant_id);
$duration_stmt->execute();
$duration_result = $duration_stmt->get_result()->fetch_object();
$duration_stmt->close();

$booking_duration = $duration_result->booking_duration;
$booking_end = date('Y-m-d H:i:s', strtotime($datetime) + $booking_duration * 60);

// Prepare the statement to check for overlapping bookings
$stmt = $mySQL->prepare("
    SELECT COUNT(*) AS booking_count, SUM(guest_count) AS total_guest_count 
    FROM bookings 
    WHERE restaurant_id = ? 
    AND (
        (datetime <= ? AND booking_end > ?) OR 
        (datetime < ? AND booking_end >= ?)
    )
");
$stmt->bind_param("issss", $restaurant_id, $datetime, $datetime, $booking_end, $booking_end);
$stmt->execute();
$result = $stmt->get_result()->fetch_object();
$stmt->close();

// if the total guest count is greater than the capacity, return an error
if ($result->total_guest_count + $input['guest_count'] > $capacity) {
    http_response_code(400);
    echo json_encode(['error' => 'Capacity exceeded']);
    exit();
}

if ($is_admin) {
    if(!isset($input['booking_email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing booking email (ADMIN)']);
        exit();
    }

    $stmt = $mySQL->prepare("CALL create_booking(?, ?, ?, ?, ?, NULL, ?)");
    $stmt->bind_param("ississ", $input['restaurant_id'], $input['date'], $input['time'], $input['guest_count'], $input['booking_email'], $input['comment']);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => 'Booking created']);
} else {

    $stmt = $mySQL->prepare("CALL create_booking(?, ?, ?, ?, NULL, ?, ?)");
    $stmt->bind_param("ississ", $input['restaurant_id'], $input['date'], $input['time'], $input['guest_count'], $id, $input['comment']);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => 'Booking created']);
}
?>