<?php
function authorize($mySQL)
{
    // Get headers using getallheaders(), which works more consistently across different server setups
    $headers = getallheaders();

    // Check if the Authorization header is present
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Authorization header missing']);
        exit;
    }

    // Parse the Bearer token
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $bearerToken = $matches[1];
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid authorization format']);
        exit;
    }

    // Query to check if the access token exists and is not expired
    $sql = "SELECT user_login_id, access_token_expiry FROM session WHERE access_token = '$bearerToken'";
    $result = $mySQL->query($sql)->fetch_object();

    if (!$result) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid access token']);
        exit;
    }

    // Check if the access token has expired
    $currentDateTime = new DateTime();
    $accessTokenExpiry = new DateTime($result->access_token_expiry);

    if ($currentDateTime > $accessTokenExpiry) {
        http_response_code(401);
        echo json_encode(['error' => 'Access token expired']);
        exit;
    }

    // If the token is valid and not expired, return the user_login_id
    return $result->user_login_id;
}
