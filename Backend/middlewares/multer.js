// This middleware sets up Multer for handling file uploads in Express routes.
// It uses disk storage with default settings, allowing files to be saved to disk.
// Exported as 'upload' for use in routes that require file upload functionality.

import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({})
})