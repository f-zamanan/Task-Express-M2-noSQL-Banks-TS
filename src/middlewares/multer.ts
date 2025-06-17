import { Request } from "express";
import multer from "multer";
import path from "path";

// this middleware is router lever, why? because i only need image/files upload in certain endpoints
// this will store the uploaded files in the /tmp/my-uploads directory
// diskstorage, will store files on my local machine as files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads"); // this is the directory where the files will be stored;
  },
  filename: function (req, file, cb) {
    // this will make sure that the file name is unique, to avoid naming clashes
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
// const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted

//   // To accept only .png files
//   if (file.mimetype === "image/png") {
//     cb(null, true); // this will accept the file?
//   } else {
//     cb(Error("only .PNG files accepted"), false);
//   }
// };
// task: restrict the user to .png file type
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg/;
    const extValid = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeValid = allowedTypes.test(file.mimetype);

    if (extValid && mimeValid) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only .jpg files are allowed!") as any, false); // Reject the file
    }
  },
});

export default upload;
