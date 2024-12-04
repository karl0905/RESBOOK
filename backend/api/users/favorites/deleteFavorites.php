<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('DELETE');

$userId = authorize($mySQL);

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['restaurant_id']) || empty($data['restaurant_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Restaurant ID is required"]);
    exit;
}

$restaurantId = intval($data['restaurant_id']);

// Delete the favorite restaurant from the user_favorites table
$queryDelete = "
    DELETE FROM user_favorites
    WHERE user_id = ? AND restaurant_id = ?
";

$stmtDelete = $mySQL->prepare($queryDelete);
$stmtDelete->bind_param("ii", $userId, $restaurantId);

if ($stmtDelete->execute()) {
    if ($stmtDelete->affected_rows > 0) {
        echo json_encode(["message" => "Favorite restaurant deleted successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Favorite restaurant not found"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to delete the favorite restaurant"]);
}

$stmtDelete->close();
