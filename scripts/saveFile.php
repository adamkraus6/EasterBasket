<?php
$file = fopen("../server/test.txt", "w");
$data = $_POST["preset"];
fwrite($file, $data);
?>