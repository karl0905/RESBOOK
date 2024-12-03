<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('GET');

$id = authorize($mySQL);

try {
  $stmt = $mySQL->prepare("SELECT * FROM users WHERE ID = ?");
  if (!$stmt) {
    throw new Exception("Prepare failed: " . $mySQL->error);
  }

  $stmt->bind_param("i", $id);
  if (!$stmt->execute()) {
    throw new Exception("Execute failed: " . $stmt->error);
  }

  $result = $stmt->get_result();
  $user = $result->fetch_object();
  $stmt->close();

  if (!$user) {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
    exit();
  }

  echo json_encode($user);
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
