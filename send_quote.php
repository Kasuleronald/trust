<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Adjust path if PHPMailer is installed via Composer

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Sanitize inputs
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($_POST['phone'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'] ?? 'No additional notes', FILTER_SANITIZE_STRING);
$quantities = $_POST['quantity'] ?? [];

// Validate required fields
if (empty($name) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Name and email are required']);
    exit;
}

// Build products list
$products = [];
foreach ($quantities as $product => $quantity) {
    $quantity = filter_var($quantity, FILTER_VALIDATE_INT);
    if ($quantity > 0) {
        $products[] = "$product: $quantity";
    }
}

if (empty($products)) {
    echo json_encode(['success' => false, 'message' => 'Please select at least one product with a quantity greater than 0']);
    exit;
}

// Prepare email body
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n\n";
$body .= "Products:\n" . implode("\n", $products) . "\n\n";
$body .= "Additional Notes: $message";

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP configuration (example using Gmail)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@gmail.com'; // Replace with your Gmail address
    $mail->Password = 'your-app-password'; // Replace with your Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Email settings
    $mail->setFrom('no-reply@trustconstruction.rw', 'Trust Construction');
    $mail->addReplyTo($email, $name);
    $mail->addAddress('richmu7@yahoo.fr');
    $mail->addAddress('ronald.t.kasule@gmail.com');
    $mail->Subject = "Quote Request from $name";
    $mail->Body = $body;

    // Send email
    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Failed to send email: {$mail->ErrorInfo}"]);
}
?>
