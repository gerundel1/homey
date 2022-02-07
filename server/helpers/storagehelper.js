const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads/images'));
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cd) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cd(null, true);
    }
    else{
        cd(new Error(`Only jpeg and png extensions are accepted. The format you have tried to upload: ${file.mimetype}`), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter});

module.exports = {upload}