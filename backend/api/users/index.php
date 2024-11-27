<?php

// Determine the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Include the appropriate file based on the method
switch ($method) {
  case 'GET':
    require_once 'getUser.php';
    break;
  case 'PUT':
    require_once 'updateUser.php';
    break;
  case 'DELETE':
    require_once 'deleteUser.php';
    break;
  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}
