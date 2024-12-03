api/restaurants/create/index.php<?php

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        include('get_restaurants.php');
        break;
    case 'POST':
        include('create_restaurant.php');
        break;
    case 'PUT':
        include('update_restaurant.php');
        break;
    case 'DELETE':
        include('delete_restaurant.php');
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method Not Allowed']);
        break;
}
?>