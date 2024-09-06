import { diskStorage } from "multer";
import { extname } from "path";

const customFileName = (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    cb(null, `${name}-${randomName}${fileExtName}`);
};

export const storage = (destination: string) => diskStorage({
    destination: (req, file, cb) => {
        cb(null, destination);
    },
    filename: customFileName,
});