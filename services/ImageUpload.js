const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "us-east-2"
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG allowed"), false)
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: "travelrite-project-2021",
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
})

module.exports = upload;