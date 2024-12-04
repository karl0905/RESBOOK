<?php

// Include necessary dependencies
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

// Fetch POST request body
$input = handle_api_request('POST');

// Validate refresh token
$refreshToken = $input['refresh_token'] ?? null;

if (empty($refreshToken)) {
  http_response_code(400);
  echo json_encode(["error" => "Refresh token is required"]);
  exit();
}

// Check if the refresh token is valid and not expired
$stmt = $mySQL->prepare(
  "SELECT user_id FROM session WHERE refresh_token = ? AND refresh_token_expiry > NOW()"
);

if (!$stmt) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to prepare statement: " . $mySQL->error]);
  exit();
}

$stmt->bind_param("s", $refreshToken);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  http_response_code(401);
  echo json_encode(["error" => "Invalid refresh token or token expired. Please log in again."]);
  exit();
}

// Fetch user ID associated with the session
$userResult = $result->fetch_object();
$stmt->close();

$userId = $userResult->user_id;

// Generate new access and refresh tokens
$accessToken = bin2hex(random_bytes(32));

// Set token expiration times
$accessTokenExpiryMinutes = 120; // 2 hours

$accessTokenExpiryTimestamp = time() + ($accessTokenExpiryMinutes * 60);

// Create new session using stored procedure
$stmt = $mySQL->prepare(
  "CALL update_access_token(?, ?, ?)"
);

if (!$stmt) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to prepare statement: " . $mySQL->error]);
  exit();
}

$stmt->bind_param(
  "isi",
  $userId,
  $accessToken,
  $accessTokenExpiryMinutes
);

if (!$stmt->execute()) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to create new session"]);
  exit();
}
$stmt->close();

// Return tokens and user details
echo json_encode([
  "tokens" => [
    "access" => $accessToken,
  ],
  "expires_in" => [
    "access" => $accessTokenExpiryTimestamp,
  ],
]);
