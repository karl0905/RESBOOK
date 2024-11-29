<?php

function is_res_admin($mySQL, $id, $restaurant_id = null) {
    if ($restaurant_id) {
        // Check if the user is the admin of the specific restaurant
        $stmt = $mySQL->prepare("SELECT ID FROM restaurant_info WHERE admin_id = ? AND ID = ?");
        $stmt->bind_param("ii", $id, $restaurant_id);
    } else {
        // Check if the user is the admin of any restaurant
        $stmt = $mySQL->prepare("SELECT ID FROM restaurant_info WHERE admin_id = ?");
        $stmt->bind_param("i", $id);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}

