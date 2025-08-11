import multer from 'multer';

// Use memory storage to store files in a buffer instead of on the disk.
// This is a crucial change for serverless platforms like Vercel, which have a read-only file system.
const storage = multer.memoryStorage();

// Enhanced file filter for better security.
// This checks the file's MIME type to ensure it's one of the allowed types.
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf'
  ];

  const mimeType = file.mimetype.toLowerCase();

  if (allowedMimeTypes.includes(mimeType)) {
    // If the file type is allowed, accept it.
    cb(null, true);
  } else {
    // If the file type is not allowed, reject it with an error.
    cb(new Error(`Unsupported file type. Only JPEG, PNG, and PDF files are allowed. Received: ${mimeType}`), false);
  }
};

// Export the multer middleware with the updated configuration.
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    files: 5, // Limit to 5 files per request
  },
});