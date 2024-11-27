<?php
// Endpoint to sign a user out
// Remove current session, redirect to login page

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('POST');
$id = authorize($mySQL);

if (!$id) {
  http_response_code(401);
  echo json_encode(["error" => "Unauthorized"]);
  exit();
}

// Remove all current sessions for the user 
$sql = "DELETE FROM session WHERE user_id = $id";
$mySQL->query($sql);

echo json_encode([
  "success" => "User signed out successfully"
]);
