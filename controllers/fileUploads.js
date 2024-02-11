const db  = require('../models');
const fileUploads = db.fileUpload;
// Upload File to S3
exports.uploadFiles = async (req, res) => {
    try {
        res.status(200).send( { message: "Image Uploaded" } );
    } catch (Error) {
        res.status(503).send({ error : Error.message });
    }
}

// Get all File Paths
exports.getFiles = async (req, res) => {
    res.contentType('json');
    try {
        const uploads = await fileUploads.findAll();
        if (!uploads) {
            res.status(200).send( { files: [] } );
        }
        res.status(200).send( { files: uploads } );
    } catch (Error) {
        res.status(503).send({ error : Error.message });
    }
}

// Get File By ID


// Remove file from S3


