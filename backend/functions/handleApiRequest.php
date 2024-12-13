<?php

// Define the base path for including files
define("BASE_PATH", dirname(__DIR__, 1)); // Adjust if necessary
include(BASE_PATH . "/mySql.php");

function handle_api_request($method)
{
  // Set Content-Type header for JSON responses
  header("Content-Type: application/json");

  // Define allowed origins for CORS
  $allowed_origins = array("http://localhost:3000", "https://resbook.vercel.app", "https://resbookdev.vercel.app");

  // Get the origin of the incoming request
  $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

  // Check if the origin is in the allowed list and set the Access-Control-Allow-Origin header
  if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
  }

  // Set other CORS headers
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  // Handle preflight OPTIONS request
  if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
  }

  if ($_SERVER["REQUEST_METHOD"] !== $method) {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method must be $method"]);
    exit();
  }

  // Decode JSON input from the request body (if any)
  $input = json_decode(file_get_contents("php://input"), true);

  return $input;
}
