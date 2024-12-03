<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');

if (!isset($input["email"]) || !isset($input["password"])) {
  http_response_code(400);
  echo json_encode(["error" => "Please provide email and password"]);
  exit();
}

$email = $input["email"];
$password = $input["password"];

// Query to get the hashed password for the user
$sql = "SELECT users.ID, user_logins.password FROM user_logins JOIN users ON user_logins.user_id = users.ID WHERE users.email = '$email'";

$userResult = $mySQL->query($sql)->fetch_object();

if (!$userResult || !password_verify($password, $userResult->password)) {
  http_response_code(401);
  echo json_encode(["error" => "Invalid email or password"]);
  exit();
}

// Generate access and refresh tokens
$accessToken = bin2hex(random_bytes(32));
$refreshToken = bin2hex(random_bytes(64));

// Set token expiration times in minutes (optional parameters for procedure)
$accessTokenExpiry = 120; // two hours in minutes
$refreshTokenExpiry = 86400; // 60 days in minutes

// Remove all current sessions for the user 
$sql = "DELETE FROM session WHERE user_id = {$userResult->ID}";
$mySQL->query($sql);
// Call the `new_session` stored procedure to insert the session with tokens and expiration times
$sql = "CALL new_session('$userResult->ID', '$accessToken', '$refreshToken', '$accessTokenExpiry', '$refreshTokenExpiry')";
$mySQL->query($sql);

// Retrieve the last inserted session ID
$sessionResult = $mySQL->query("SELECT LAST_INSERT_ID() AS session_id")->fetch_object();
$session_id = $sessionResult->session_id;

// Calculate Unix timestamps for expiration times
$accessTokenExpiryTimestamp = time() + ($accessTokenExpiry * 60);
$refreshTokenExpiryTimestamp = time() + ($refreshTokenExpiry * 60);

// Retrieve user details from the view
$sql = "SELECT * FROM users WHERE ID = {$userResult->ID}";
$userDetails = $mySQL->query($sql)->fetch_object();

if (!$userDetails) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to retrieve user details"]);
  exit();
}

// Return the access and refresh tokens along with user details and session_id

echo json_encode([
  "tokens" => [
    "access" => $accessToken,
    "refresh" => $refreshToken,
  ],
  "expires_in" => [
    "access" => $accessTokenExpiryTimestamp,
    "refresh" => $refreshTokenExpiryTimestamp,
  ],
]);
