const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;

    if (file.fieldname === 'cv') {
      folder = path.join(__dirname, '..', 'images', 'cv');
    } 
    else if (file.fieldname === 'flazz') {
      folder = path.join(__dirname, '..', 'images', 'flazz');
    } 
    else if (file.fieldname === 'idCard') {
      folder = path.join(__dirname, '..', 'images', 'idCard');
    } 
    else {
      folder = path.join(__dirname, '..', 'images', 'others');
    }

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});


const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.includes(ext)) {
    return cb(new Error('File harus pdf/jpg/jpeg/png'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
