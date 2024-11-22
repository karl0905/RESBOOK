<?php
function loadEnv($path)
{
    // Check if the file exists
    if (!file_exists($path)) {
        throw new Exception("The .env file does not exist at path: $path");
    }

    // Read the file line by line
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        // Skip the line if it's a comment
        if (strpos(trim($line), '#') === 0) {
            continue;
        }

        // Parse the line
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue; // Skip lines that don't have exactly one '=' character
        }

        $name = trim($parts[0]);
        $value = trim($parts[1]);

        // Set the environment variable
        putenv("$name=$value");
    }
}