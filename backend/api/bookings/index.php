<?php
// Determine the HTTP method
$method = $_SERVER['REQUEST_METHOD'];
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request($method);

// Include the appropriate file based on the method
switch ($method) {
  case 'GET':
    require_once 'getBooking.php';
    break;
  case 'POST':
    require_once 'createBooking.php';
    break;
  case 'PUT':
    require_once 'updateBooking.php';
    break;
  case 'DELETE':
    require_once 'deleteBooking.php';
    break;
  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

