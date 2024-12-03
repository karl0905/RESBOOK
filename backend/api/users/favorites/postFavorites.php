<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('POST');

$userId = authorize($mySQL);

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['restaurant_id']) || empty($data['restaurant_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Restaurant ID is required"]);
    exit;
}

$restaurantId = intval($data['restaurant_id']);

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
