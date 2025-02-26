import express, { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { createProduct, getAllProducts, getProductByCatID, getProductByID, } from '../Controllers'
import { get } from 'http';

const router = express.Router();
const imagesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const images = multer({ storage: imagesStorage }).array('images');

router.post('/createProduct', images, createProduct);
router.get('/getProductByCatID/:CatID', getProductByCatID);
router.get('/getProductByID/:id', getProductByID);
router.get('/getAllProducts', getAllProducts);

export { router as ProductRoute };