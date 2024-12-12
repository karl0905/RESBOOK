<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

// Expect a POST request
handle_api_request('POST');

$userId = authorize($mySQL);

header("Content-Type: application/json");

// Decode the JSON payload
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['restaurant_id']) || empty($data['restaurant_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Restaurant ID is required"]);
    exit;
}

$restaurantId = intval($data['restaurant_id']);

// Check if the restaurant is already liked
$queryCheck = "
    SELECT COUNT(*) AS liked
    FROM user_favorites
    WHERE user_id = ? AND restaurant_id = ?
";

$stmtCheck = $mySQL->prepare($queryCheck);
$stmtCheck->bind_param("ii", $userId, $restaurantId);
$stmtCheck->execute();
$result = $stmtCheck->get_result()->fetch_assoc();
$stmtCheck->close();

if ($result['liked'] > 0) {
    http_response_code(409); // Conflict status code
    echo json_encode(["message" => "Restaurant already liked"]);
    exit;
}

// Insert the liked restaurant into the user_favorites table
$queryInsert = "
    INSERT INTO user_favorites (user_id, restaurant_id)
    VALUES (?, ?)
";
$stmtInsert = $mySQL->prepare($queryInsert);
$stmtInsert->bind_param("ii", $userId, $restaurantId);

if ($stmtInsert->execute()) {
    echo json_encode(["message" => "Restaurant liked successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to like the restaurant"]);
}

$stmtInsert->close();
