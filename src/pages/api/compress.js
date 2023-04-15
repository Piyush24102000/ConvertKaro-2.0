import multer from 'multer';
import sharp from 'sharp'
const util = require('util');
const upload = multer();
import { compress, compressAccurately } from 'image-conversion';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,

  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await bufferImage(req, res)
      break;
  }
}

async function compressImage(buffer, desiredSize) {
  const compressedBlob = await compressAccurately(Buffer.from(buffer), { size: desiredSize });
  return compressedBlob;
}

const bufferImage = async (req, res) => {
  try {
    const multerMiddleware = util.promisify(upload.single('image'));
    await multerMiddleware(req, res);
    const fileBuffer = req.file.buffer;
    const desiredSize = parseInt(req.query.size) || 750; // Get the desired file size from the request parameters
    
   
    const compressedBlob = await compressImage(fileBuffer, desiredSize);
    const compressedBuffer = Buffer.from(await compressedBlob.arrayBuffer());
    console.log(compressedBuffer);

  } catch (error) {
    console.log(error.message)
    res.status(500).send("An error occurred while uploading the file.");
  }
}
