<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');
$id = authorize($mySQL);

header("Content-Type: application/json");

$sql = "SELECT id, name, phone, email, address FROM restaurants WHERE id = $id";
$result = $mySQL->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to retrieve restaurant details"]);
    exit();
}

echo json_encode($result);
