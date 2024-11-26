<?php 

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');

$id = authorize($mySQL);

// Set response type for JSON
header("Content-Type: application/json");

// Fetch data from the database
$sql = "SELECT * FROM users WHERE ID = $id";
$result = $mySQL->query($sql)->fetch_object();

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve user details"]);
    exit();
}

// Output the data as JSON
echo json_encode($result);

