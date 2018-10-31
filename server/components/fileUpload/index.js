import multer from 'multer';
import fs from 'fs';

const uploadsPath = 'uploads';

//multers disk storage settings
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.stat(uploadsPath, err => {
      if (err && err.code === 'ENOENT') {
        // Directory doesn't exist
        fs.mkdir(uploadsPath, () => cb(null, uploadsPath));
      } else {
        // Directory exists
        return cb(null, uploadsPath);
      }
    });
  },
  filename: (req, file, cb) => {
    let datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  }
});

//multer settings
export let upload = multer({storage}).single('file');
