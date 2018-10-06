const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dmfmtwa9h',
    api_key: '757319526818661',
    api_secret: '3e1rPRgiYlcXEZp8HpAtI4qMses'
})

let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: '/ironhack',
    allowedFormats: ['jpg', 'png'],
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadCloud = multer({ storage : storage });

module.exports = uploadCloud;