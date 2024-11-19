<?php

// function to gennerally handle the api request
define("BASE_PATH", dirname(__DIR__, 1)); // Adjust if necessary
include(BASE_PATH . "/mySql.php");

function handle_api_request($method, $expected_method)
{

    header("Content-Type: application/json");

    if ($_SERVER["REQUEST_METHOD"] !== $method) {
        http_response_code(405);
        echo json_encode(["error" => 'method must be ' . $expected_method]);
        exit();
    }

    $input = json_decode(file_get_contents("php://input"), true);

    return $input;
}
