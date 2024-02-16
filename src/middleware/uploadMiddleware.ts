import multer from 'multer';
import path from 'path';

// Multer configuration for local file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to save the uploaded images
    const uploadDir = path.join(__dirname, '..', 'uploads'); // Adjust the path based on your project structure
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Set the file name in the local storage
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;


