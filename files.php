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
						<li class="nav-item"><a href="index.php">Home</a></li>
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
			$path = "server";
			$files = $files = array_diff(scandir($path), array('.', '..'));
			foreach ($files as $element) {
				echo $element;
				echo "<br />\n";
				echo "<button>Load</button>\n";
				echo "<button>Download</button>\n";
				echo "<br /><br />\n";
			}
			?>
		</div>
	</body>
</html>