import { registerAs } from "@nestjs/config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as fs from 'fs'

const multerConfig: MulterOptions = {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = 'public';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);  // Sets the destination to 'public'
      },
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, filename);  // Creates a filename with a timestamp
      },
    }),
  };

export default registerAs('multer', () => multerConfig)