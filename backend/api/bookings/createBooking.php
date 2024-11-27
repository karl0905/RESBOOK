<?php
include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');

$id = authorize($mySQL);

// include the is_res_admin function
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");
$is_admin = is_res_admin($mySQL, $id);

if ($is_admin) {
    if(!isset($input['restaurant_id']) || !isset($input['date']) || !isset($input['time']) || !isset($input['guest_count']) || !isset($input['booking_email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields (ADMIN)']);
        exit();
    }

    $stmt = $mySQL->prepare("CALL create_booking(?, ?, ?, ?, ?, NULL, ?)");
    $stmt->bind_param("ississ", $input['restaurant_id'], $input['date'], $input['time'], $input['guest_count'], $input['booking_email'], $input['comment']);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => 'Booking created']);
} else {
    if(!isset($input['restaurant_id']) || !isset($input['date']) || !isset($input['time']) || !isset($input['guest_count']) || !isset($input['comment'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields (USER)']);
        exit();
    }

    $stmt = $mySQL->prepare("CALL create_booking(?, ?, ?, ?, NULL, ?, ?)");
    $stmt->bind_param("ississ", $input['restaurant_id'], $input['date'], $input['time'], $input['guest_count'], $id, $input['comment']);
    $stmt->execute();
    $stmt->close();

    echo json_encode(['success' => 'Booking created']);
}
?>