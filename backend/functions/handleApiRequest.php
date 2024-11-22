<?php

// function to gennerally handle the api request
define("BASE_PATH", dirname(__DIR__, 1)); // Adjust if necessary
include(BASE_PATH . "/mySql.php");

function handle_api_request($method)
{
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit();
    }

  if ($_SERVER["REQUEST_METHOD"] !== $method) {
    http_response_code(405);
    echo json_encode(["error" => 'method must be ' . $method]);
    exit();
  }

  $input = json_decode(file_get_contents("php://input"), true);

  return $input;
}
