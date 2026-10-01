<?php
// submit.php — receives the contact-form chat submissions and stores them in MySQL.
// Attachments (if any) are saved to uploads/submissions/ and only the file's
// public path is stored in the database.

header('Content-Type: application/json');

// Credentials live in config.php (gitignored). Copy config.example.php to config.php on the server.
$cfg = __DIR__ . '/config.php';
if (!is_file($cfg)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server not configured']);
    exit;
}
require $cfg;

$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database unavailable']);
    exit;
}

// Create the table on first run only.
$mysqli->query("
    CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submitted_date DATE NOT NULL,
        submitted_time TIME NOT NULL,
        type VARCHAR(64) NOT NULL,
        name VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL,
        message TEXT NOT NULL,
        attachment_url VARCHAR(512) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$type    = trim($_POST['type'] ?? '');
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

$attachmentUrl = null;
if (!empty($_FILES['attachment']['name']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/uploads/submissions/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
    // Never execute anything in the upload folder.
    if (!is_file($uploadDir . '.htaccess')) {
        file_put_contents($uploadDir . '.htaccess', <<<'HT'
Options -ExecCGI
RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .phar
<FilesMatch "\.(php|phtml|phar|pl|py|cgi|sh)$">
  Require all denied
</FilesMatch>

HT);
    }

    // Only documents/images, max 10 MB; anything else is rejected.
    $allowed = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'jpg', 'jpeg', 'png', 'webp'];
    $ext = strtolower(pathinfo($_FILES['attachment']['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed, true) || $_FILES['attachment']['size'] > 10 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Attachment must be a PDF, Office doc, text or image under 10 MB']);
        exit;
    }
    $origName = basename($_FILES['attachment']['name']);
    $safeName = preg_replace('/[^A-Za-z0-9_-]/', '_', pathinfo($origName, PATHINFO_FILENAME)) . '.' . $ext;
    $unique   = date('Ymd_His') . '_' . substr(md5(uniqid('', true)), 0, 8) . '_' . $safeName;
    $destPath = $uploadDir . $unique;

    if (move_uploaded_file($_FILES['attachment']['tmp_name'], $destPath)) {
        $attachmentUrl = 'uploads/submissions/' . $unique;
    }
}

$now = new DateTime();
$date = $now->format('Y-m-d');
$time = $now->format('H:i:s');

$stmt = $mysqli->prepare(
    "INSERT INTO submissions (submitted_date, submitted_time, type, name, email, message, attachment_url) VALUES (?, ?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param('sssssss', $date, $time, $type, $name, $email, $message, $attachmentUrl);

if ($stmt->execute()) {
    echo json_encode(['ok' => true, 'id' => $stmt->insert_id, 'attachment_url' => $attachmentUrl]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not save submission']);
}

$stmt->close();
$mysqli->close();
