<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>File Management</title>
		<link rel="stylesheet" href="styles.css" />
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="./scripts/files.js" type="text/javascript"></script>
	</head>

	<body>
		<nav class="navbar navbar-default navbar-static-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">Easter Basket</a>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav navbar-left">
						<li class="nav-item"><a href="index.html">Home</a></li>
						<li class="nav-item active"><a href="files.php">Files</a></li>
						<li class="nav-item"><a href="help.html">Help</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container">
			<br />
			<input type="file" name="file" id="file" />
			<button id="upload">Upload</button>
			<br /><br />
			<?php
			error_reporting(E_ALL);
			ini_set('display_errors', 1);

			$path = "server";
			$files = $files = array_diff(scandir($path), array('.', '..'));
			foreach ($files as $filename) {
				$filepath =  $path . "/" . $filename;
				$file = fopen($filepath, "r");
				$preset = fread($file, filesize($filepath));
				echo $filename;
				echo "<br />\n";
				echo "<a href=\"index.html?preset=$preset\">Load</a>\n";
				echo "<a href=\"$filepath\" download>Download</a>\n";
				echo "<br /><br />\n";
			}
			?>
		</div>
	</body>
</html>