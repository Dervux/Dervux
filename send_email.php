<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Validate form data
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        // Redirect back with error
        header('Location: index.html?status=error');
        exit;
    }
    
    // Email details
    $to = "Dervux@protonmail.com";
    $email_subject = "New Contact Form Submission: " . $subject;
    $email_body = "
    You have received a new message from your website contact form.
    
    Name: $name
    Email: $email
    Subject: $subject
    
    Message:
    $message
    ";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Redirect back with success
        header('Location: index.html?status=success');
    } else {
        // Redirect back with error
        header('Location: index.html?status=error');
    }
} else {
    // Not a POST request, redirect to home
    header('Location: index.html');
}
?>