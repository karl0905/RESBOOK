<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

$input = handle_api_request('POST');

$email = $input['email'];
$password = $input['password'];
$confirm_password = $input['confirm_password'];
$first_name = $input['first_name'];
$last_name = $input['last_name'];
$phone = $input['phone'];

// Check if all fields are filled
if (empty($email) || empty($password) || empty($confirm_password) || empty($first_name) || empty($last_name) || empty($phone)) {
  http_response_code(400);
  echo json_encode(["error" => "All fields are required"]);
  exit();
}

if ($password !== $confirm_password) {
  http_response_code(400);
  echo json_encode(["error" => "Passwords do not match"]);
  exit();
}

// Hash the password
$password = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$sql = "SELECT COUNT(*) FROM users WHERE email = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($email_exists);
$stmt->fetch();
$stmt->close();

if ($email_exists > 0) {
  http_response_code(400);
  echo json_encode(["error" => "Email is already taken"]);
  exit();
}

// Check if phone already exists
$sql = "SELECT COUNT(*) FROM users WHERE phone = ?";
$stmt = $mySQL->prepare($sql);
$stmt->bind_param("s", $phone);
$stmt->execute();
$stmt->bind_result($phone_exists);
$stmt->fetch();
$stmt->close();

if ($phone_exists > 0) {
  http_response_code(400);
  echo json_encode(["error" => "Phone number is already taken"]);
  exit();
}

// Call the create user procedure
$sql = "CALL create_user('$email', '$password', '$first_name', '$last_name', '$phone')";

$result = $mySQL->query($sql);

if (!$result) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to create user"]);
  exit();
}

echo json_encode(["success" => "User created successfully"]);
