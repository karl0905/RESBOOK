<?php
// Endpoint to delete a user account
// Remove all sessions for the user, delete the user from the database

include($_SERVER["DOCUMENT_ROOT"] . "/functions/authorize.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");
include($_SERVER["DOCUMENT_ROOT"] . "/functions/is_res_admin.php");

handle_api_request('DELETE');
$id = authorize($mySQL);

// Check if user is admin on any restaurant
// if true abort deletion
if (is_res_admin($mySQL, $id)) {
  http_response_code(403);
  echo json_encode([
    "success" => false,
    "error" => "User is an admin of a restaurant and cannot be deleted"
  ]);
  exit();
}

try {

  // Start transaction
  $mySQL->begin_transaction();

  try {
    // Remove all current sessions for the user 
    $stmt = $mySQL->prepare("DELETE FROM session WHERE user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    // Remove the users login from the database
    $stmt = $mySQL->prepare("DELETE FROM user_logins WHERE user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    // Remove the user from the database
    $stmt = $mySQL->prepare("DELETE FROM users WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    // Commit the transaction
    $mySQL->commit();

    echo json_encode([
      "success" => true,
      "message" => "User account deleted successfully"
    ]);
  } catch (mysqli_sql_exception $e) {
    // Rollback the transaction in case of any SQL errors
    $mySQL->rollback();
    throw $e; // Re-throw the exception to be caught by the outer catch block
  }
} catch (Exception $e) {
  // Handle any exceptions (including SQL exceptions)
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "error" => "An error occurred: " . $e->getMessage()
  ]);
} finally {
  // Close the database connection if it's open
  if (isset($mySQL) && $mySQL instanceof mysqli) {
    $mySQL->close();
  }
}
