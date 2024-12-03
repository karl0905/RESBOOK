<?php
// Endpoint to sign a user out
// Remove current session, redirect to login page

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('POST');
$id = authorize($mySQL);

try {
  // Remove all current sessions for the user 
  $stmt = $mySQL->prepare("DELETE FROM session WHERE user_id = ?");
  if (!$stmt) {
    throw new Exception("Prepare failed: " . $mySQL->error);
  }

  $stmt->bind_param("i", $id);
  if (!$stmt->execute()) {
    throw new Exception("Execute failed: " . $stmt->error);
  }

  $stmt->close();

  echo json_encode([
    "success" => true,
    "message" => "User signed out successfully"
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "error" => "An error occurred: " . $e->getMessage()
  ]);
} finally {
  if (isset($mySQL) && $mySQL instanceof mysqli) {
    $mySQL->close();
  }
}
