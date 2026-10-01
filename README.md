# saadhashmani.com

Static site (`index.html`, `site.css`, `site.js`, `assets/`, `uploads/`) plus `submit.php` for the contact form.

## Deploy to Hostinger

1. Upload everything in this repo to `public_html/`.
2. On the server, copy `config.example.php` to `config.php` and fill in the MySQL details from hPanel → Databases.
3. Submissions are stored in the `submissions` table (created automatically); attachments go to `uploads/submissions/`.
