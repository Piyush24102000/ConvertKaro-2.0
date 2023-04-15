import multer from 'multer';
import util from 'util';
const PDFDocument = require('pdf-lib').PDFDocument;
import { PDFSecurityOptions } from "pdf-lib";
const upload = multer();

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
};

export default async function handler(req, res) {
    switch (req.query.task) {
        case 'lock':
            await docLock(req, res)
            break;
        case 'unlock':
            await docUnlock(req, res)
            break;
    }
}

const docLock = async (req, res) => {
    try {
        const multerMiddleware = util.promisify(upload.single('file'));
        await multerMiddleware(req, res);
        const fileBuffer = req.file.buffer;
        const { password } = req.body;

        // const pdfDoc = await PDFDocument.load(fileBuffer);
        // const securityOptions = new PDFSecurityOptions();
        // securityOptions.setUserPassword(password);
    
        // pdfDoc.setSecurity(securityOptions);
    
        // const lockedPdf = await pdfDoc.save();
    
        // res.setHeader('Content-Disposition', `attachment; filename="locked.pdf"`);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.send(lockedPdf);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("An error occurred while uploading the file.");
    }
}



const docUnlock = async (req, res) => {
    try {
        const multerMiddleware = util.promisify(upload.single('file'));
        await multerMiddleware(req, res);
        const fileBuffer = req.file.buffer;

    } catch (error) {
        console.log(error.message)
        res.status(500).send("An error occurred while uploading the file.");

    }
}
