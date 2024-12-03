<?php
function check_capacity($mySQL, $input, $booking_id = null) {
    // Function to handle the capacity check for a given restaurant and datetime

    // If booking_id is provided, fetch missing values from the bookings table
    if ($booking_id) {
        $stmt = $mySQL->prepare("SELECT restaurant_id, datetime, guest_count FROM bookings WHERE id = ?");
        $stmt->bind_param("i", $booking_id);
        $stmt->execute();
        $booking = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        // Merge the fetched values with the input values
        $input = array_merge($booking, $input);
    }

    // Ensure all required input values are set
    if (!isset($input['restaurant_id'], $input['date'], $input['time'], $input['guest_count'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required parameters']);
        exit();
    }

    $restaurant_id = $input['restaurant_id'];
    $result = $mySQL->query("SELECT capacity FROM restaurant_info WHERE ID = $restaurant_id")->fetch_object();
    $capacity = $result->capacity;

    // get the number of bookings and the total guest count for the given date and time, and then check if the capacity has been exceeded
    $datetime = $input['date'] . ' ' . $input['time'];

    // Calculate the booking_end based on the booking duration
    $duration_stmt = $mySQL->prepare("SELECT booking_duration FROM restaurant_info WHERE id = ?");
    $duration_stmt->bind_param("i", $restaurant_id);
    $duration_stmt->execute();
    $duration_result = $duration_stmt->get_result()->fetch_object();
    $duration_stmt->close();

    $booking_duration = $duration_result->booking_duration;
    $booking_end = date('Y-m-d H:i:s', strtotime($datetime) + $booking_duration * 60);

    // Prepare the statement to check for overlapping bookings
    $stmt = $mySQL->prepare("
        SELECT COUNT(*) AS booking_count, SUM(guest_count) AS total_guest_count 
        FROM bookings 
        WHERE restaurant_id = ? 
        AND (
            (datetime <= ? AND booking_end > ?) OR 
            (datetime < ? AND booking_end >= ?)
        )
    ");
    $stmt->bind_param("issss", $restaurant_id, $datetime, $datetime, $booking_end, $booking_end);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_object();
    $stmt->close();

    // Adjust the total guest count if updating an existing booking
    if ($booking_id) {
        $result->total_guest_count -= $booking['guest_count'];
    }

    // if the total guest count is greater than the capacity, return an error
    if ($result->total_guest_count + $input['guest_count'] > $capacity) {
        http_response_code(400);
        echo json_encode(['error' => 'Capacity exceeded']);
        exit();
    }
}