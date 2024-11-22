<?php

// Endpoint to refresh the user's token using the refresh token as parameter
include($_SERVER["DOCUMENT_ROOT"] . "/functions/handleApiRequest.php");

handle_api_request('POST');


