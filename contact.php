<?php
if($_POST["message"]) {
    mail("SperrysFarm@gmail.com", "Website Inquiry", $_POST["message"], $_POST["email"]);
}
?>