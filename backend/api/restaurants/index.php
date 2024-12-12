<?php

// Determine the HTTP method
$method = $_SERVER['REQUEST_METHOD'];
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request($method);

// Include the appropriate file based on the method
switch ($method) {
  case 'GET':
    require_once 'getRestaurants.php';
    break;
  case 'POST':
    require_once 'createRestaurant.php';
    break;
  case 'PUT':
    require_once 'updateRestaurant.php';
    break;
  case 'DELETE':
    require_once 'deleteRestaurant.php';
    break;
  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}
