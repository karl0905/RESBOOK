<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

header("Content-Type: application/json");

$id = authorize($mySQL);

$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['message' => 'Invalid JSON input']);
    exit;
}

if (!isset($data['id'])) {
    echo json_encode(['message' => 'Missing required parameter: id']);
    exit;
}

// Start transaction
$mySQL->begin_transaction();

try {
    // Delete from restaurant_info table
    $query1 = "DELETE FROM restaurant_info WHERE id = ?";
    $stmt1 = $mySQL->prepare($query1);
    $stmt1->bind_param('i', $data['id']);
    $stmt1->execute();
    $stmt1->close();

    // Delete from restaurants table
    $query2 = "DELETE FROM restaurants WHERE id = ?";
    $stmt2 = $mySQL->prepare($query2);
    $stmt2->bind_param('i', $data['id']);
    $stmt2->execute();
    $stmt2->close();

    // Commit transaction
    $mySQL->commit();

    echo json_encode(['message' => 'Restaurant deleted successfully']);
} catch (Exception $e) {
    // Rollback transaction in case of error
    $mySQL->rollback();
    echo json_encode(['message' => 'Failed to delete restaurant', 'error' => $e->getMessage()]);
}
?>
