import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req: any, file:any, cb:any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format!" }, false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;