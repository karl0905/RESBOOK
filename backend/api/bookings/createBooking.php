<?php
include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

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

// include the check_capacity function - this function checks if the capacity for the restaurant has been exceeded for the given date and time and exits with an error if it has
include($_SERVER["DOCUMENT_ROOT"] . "/functions/res_capacity.php");
check_capacity($mySQL, $input);

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
