<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function upload() {
	//keep uploads separate for security. uploads MUST allow public write, which is VERY unsafe if allowed in general
    $target_dir = "./server/";
    $message = '';

    //only one file will be permitted to be saved. If you want to permit multiple saves (e.g. one for each user). This:
    // $target_file = $target_dir . $_FILES["fileToUpload"]["tmp_name"]
    //would be better as it names it the same as what the user uploaded.
    //or best yet, use a unique id (uniqid())
    $file = $_FILES["fileToUpload"];
    $target_file = $target_dir . $file["name"];

    //how to check for file type
    $fileType =
        strtolower(pathinfo($file["name"],PATHINFO_EXTENSION));

    if($fileType != "basket") {
         echo  "Only basket file types are supported. Please, try a different file.";
         return;
    }

    // Check file size which should be MUCH smaller than the server limit
    if ($file["size"] > 5000) {
        echo  "Ack, the file is too large for me!";
        return;
    }

    // Check if file already exists, and delete it if it does so we can overwrite it
    if (file_exists($target_file)) {
        unlink($target_file);
    }

    //check other errors
    $message .= 'Error uploading file';
    switch ($_FILES['fileToUpload']['error']) {
        case UPLOAD_ERR_OK:
            $message = false;
            break;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            $message .= ' - file too large.';
            break;
        case UPLOAD_ERR_PARTIAL:
            $message .= ' - file upload was not completed.';
            break;
        case UPLOAD_ERR_NO_FILE:
            $message .= ' - zero-length file uploaded.';
            break;
        default:
            $message .= ' - internal error #' . $_FILES['fileToUpload']['error'];
            break;
    }

    //if OK thus far, try to save
    if (!$message) {
        if (!is_uploaded_file($file['tmp_name'])) {
            $message = 'Error uploading file - unknown error.';
        } else {
            // Let's see if we can move the file.
            if (!move_uploaded_file($file["tmp_name"], $target_file)) { // No error suppression so we can see the underlying error.
                $message = 'Error uploading file - could not save upload 
                (this will probably be a permissions problem in ' . $target_dir . ')';
            }
        }
    }

    //final check, and copy and force download for confirmation
    if ($message != '') {
        echo $message;
    }
}
?>