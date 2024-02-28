


import multer from 'multer';
const path = require('path');


const currentDirectory =  __dirname;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(currentDirectory, '../uploads/');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
