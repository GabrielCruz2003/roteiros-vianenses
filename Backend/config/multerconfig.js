import multer from "multer";
import path from "path";


export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});