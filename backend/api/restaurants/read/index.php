<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');

// Set response type for JSON
header("Content-Type: application/json");

// Sanitize input for security (ensure $id is properly passed and sanitized)
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing ID"]);
    exit();
}

// Fetch data from the database
$sql = "SELECT id, name, phone, email, address FROM restaurants WHERE id = $id";
$result = $mySQL->query($sql);

if (!$result || $result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "No restaurant found with the given ID"]);
    exit();
}

// Fetch the result as an associative array
$restaurant = $result->fetch_assoc();

// Output the data as JSON
echo json_encode($restaurant);
