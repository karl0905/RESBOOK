<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');
$id = authorize($mySQL);

if (!isset($input['name'], $input['phone'], $input['email'], $input['address'], $input['rating'], $input['capacity'], $input['description'], $input['booking_duration'], $input['admin_email'])) {
    echo json_encode(['message' => 'Missing required parameters']);
    exit;
}

// Fetch admin_id from users table
$query_admin = "SELECT id FROM users WHERE email = ?";
$stmt_admin = $mySQL->prepare($query_admin);
$stmt_admin->bind_param('s', $input['admin_email']);
$stmt_admin->execute();
$stmt_admin->bind_result($admin_id);
$stmt_admin->fetch();
$stmt_admin->close();

if (!$admin_id) {
    echo json_encode(['message' => 'Admin email not found']);
    exit;
}

// Insert into restaurants table
$query1 = "INSERT INTO restaurants (name, phone, email, address) VALUES (?, ?, ?, ?);";
$stmt1 = $mySQL->prepare($query1);
$stmt1->bind_param('ssss', $input['name'], $input['phone'], $input['email'], $input['address']);
$stmt1->execute();
$restaurant_id = $stmt1->insert_id; // Get the last inserted id
$stmt1->close();

// Insert into restaurant_info table
$query2 = "INSERT INTO restaurant_info (id, rating, capacity, description, booking_duration, admin_id) VALUES (?, ?, ?, ?, ?, ?);";
$stmt2 = $mySQL->prepare($query2);
$stmt2->bind_param('issssi', $restaurant_id, $input['rating'], $input['capacity'], $input['description'], $input['booking_duration'], $admin_id);
$stmt2->execute();
$stmt2->close();

echo json_encode(['message' => 'Restaurant created successfully']);
?>
