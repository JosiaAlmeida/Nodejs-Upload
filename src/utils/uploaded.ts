import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.match(/\.(jpg|jpeg|png|gif)$/) &&
      "imagem" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


export const upload = multer({ storage });
