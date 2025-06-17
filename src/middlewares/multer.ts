import multer from "multer";

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
// task: restrict the user to .png file type
const upload = multer({ storage: storage });

export default upload;
