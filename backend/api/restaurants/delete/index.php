<?php

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

header("Content-Type: application/json");

$id = authorize($mySQL);

$data = json_decode(file_get_contents('php://input'), true);
$query = "DELETE FROM restaurants WHERE id = ?";

$stmt = $mySQL->prepare($query);
$stmt->bind_param('i', $data['id']);
$stmt->execute();
$stmt->close();

echo json_encode(['message' => 'Restaurant deleted successfully']);
?>