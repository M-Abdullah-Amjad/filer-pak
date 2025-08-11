import multer from 'multer';

// Use memory storage to store files in a buffer in the server's memory.
// This prevents the application from trying to create a directory or write to the local file system.
const storage = multer.memoryStorage();

// You can still keep your file type checks and limits.
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only JPEG, PNG, and PDF files are allowed.'), false);
  }
};

export const paymentUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Example: 5MB file size limit
  },
});