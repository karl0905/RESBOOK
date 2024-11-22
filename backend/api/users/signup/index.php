<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');

$email = $input['email'];
$password = $input['password'];
$confirmPassword = $input['confirmPassword'];
$first_name = $input['first_name'];
$last_name = $input['last_name'];
$phone = $input['phone'];

// Check if all fields are filled
if (empty($email) || empty($password) || empty($confirmPassword) || empty($first_name) || empty($last_name) || empty($phone)) {
  http_response_code(400);
  echo json_encode(["error" => "All fields are required"]);
  exit();
}

if ($password !== $confirmPassword) {
  http_response_code(400);
  echo json_encode(["error" => "Passwords do not match"]);
  exit();
}

// Hash the password
$password = password_hash($password, PASSWORD_DEFAULT);

// Call the create user procedure
$sql = "CALL create_user('$email', '$password', '$first_name', '$last_name', '$phone')";

$result = $mySQL->query($sql);

if (!$result) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to create user"]);
  exit();
}

echo json_encode(["success" => "User created successfully"]);
