<?php
require_once "scripts/upload.php";

if (isset($_GET["up"])) {
	upload();
}
?>
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
			<div class="dropzone">
				<p>
					Drag file here to upload
				</p>
			</div>
			<br />
			<form action="files.php?up=1" method="post" enctype="multipart/form-data">
				Select file to upload:
				<input type="file" name="fileToUpload" id="fileToUpload" />
				<br />
				<input type="submit" value="Upload">
			</form>
			<br /><br />
			<?php
			error_reporting(E_ALL);
			ini_set('display_errors', 1);

			$path = "server";
			$files = $files = array_diff(scandir($path), array('.', '..'));
			foreach ($files as $filename) {
				$filepath = $path . "/" . $filename;
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