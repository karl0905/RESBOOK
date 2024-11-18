<?php
require_once __DIR__ . "/functions/loadEnv.php";

loadEnv(__DIR__ . '/.env');

$server = getenv('SERVER');
$username = getenv('USERNAME');
$password = getenv('PASSWORD');
$database = getenv('DATABASE');

$mySQL = new mysqli($server, $username, $password, $database);
if (!$mySQL) {
    die("Could not connect to the MySQL server: " . mysqli_connect_error());
}
