<?php
include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('PUT');

$id = authorize($mySQL);

if (!isset($input['restaurant_id']) || !isset($input['booking_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required restaurant or booking id']);
    exit();
} 

// include the is_res_admin function
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");
$is_admin = is_res_admin($mySQL, $id, $input['restaurant_id']);

if (isset($input['guest_count']) && $input['guest_count'] < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Guest count cannot be below 1']);
    exit();
} else if (isset($input['guest_count']) && !$is_admin && $input['guest_count'] > 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Only admins can book for more than 10 guests']);
    exit();
} 

if (isset($input['date']) && strtotime($input['date']) < strtotime('today')) {
    http_response_code(400);
    echo json_encode(['error' => 'Booking date cannot be in the past']);
    exit();
}

if (isset($input['date']) && isset($input['time'])) {
    // Ensure time is in H:i:s format
    if (strlen($input['time']) == 5) {
        $input['time'] .= ':00';
    }
    $input['datetime'] = $input['date'] . ' ' . $input['time'];
    $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $input['datetime']);
    if (!$datetime) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid datetime format']);
        exit();
    }
}

$booking_id = $input['booking_id'];

if (isset($input['date']) && isset($input['time'])) {
    // include the check_capacity function - this function checks if the capacity for the restaurant has been exceeded for the given date and time and exits with an error if it has
    include($_SERVER["DOCUMENT_ROOT"] . "/functions/res_capacity.php");
    check_capacity($mySQL, $input, $booking_id);
}

$stmt = $mySQL->prepare("SELECT * FROM bookings WHERE ID = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $mySQL->error]);
    exit();
}

$stmt->bind_param("i", $booking_id);
$stmt->execute();
$result = $stmt->get_result();
$booking = $result->fetch_assoc();
$stmt->close();

if (!$booking) {
    http_response_code(404);
    echo json_encode(['error' => 'Booking not found']);
    exit();
}

if ($is_admin || $booking['user_id'] == $id) { 
    $stmt = $mySQL->prepare("CALL update_booking(?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "iisss",
        $input['restaurant_id'],
        $input['booking_id'],
        $input['datetime'],
        $input['guest_count'],
        $input['comment']
    );
    if ($stmt->execute()) {
        echo json_encode(['success' => 'Booking updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update booking']);
    }
    $stmt->close();
} else {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized to update booking']);
}
