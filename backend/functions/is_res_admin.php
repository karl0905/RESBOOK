<?php

function is_res_admin($mySQL, $id) {
    // select the restaurant_id from the restaturant where id is equal to admin_id
    $stmt = $mySQL->prepare("SELECT ID FROM restaurant_info WHERE admin_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}

