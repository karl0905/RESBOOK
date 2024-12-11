<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('DELETE');

$id = authorize($mySQL);

if (!isset($input['booking_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required booking id']);
    exit();
}

// include the is_res_admin function
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");

$booking_id = $input['booking_id'];

$stmt = $mySQL->prepare("SELECT * FROM bookings WHERE ID = ?");
$stmt->bind_param("i", $booking_id);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows == 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Booking not found']);
    exit();
}


$booking = $result->fetch_assoc();

$is_admin = is_res_admin($mySQL, $id, $booking['restaurant_id']);

if ($booking == null) {
    http_response_code(404);
    echo json_encode(['error' => 'Booking not found']);
    exit();
}

if (!$is_admin && $booking['user_id'] != $id) {
    http_response_code(403);
    echo json_encode(['error' => 'You are not authorized to delete this booking']);
    exit();
}

// Delete the booking
$stmt = $mySQL->prepare("DELETE FROM bookings WHERE ID = ?");
$stmt->bind_param("i", $booking_id);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => 'Booking deleted']);
