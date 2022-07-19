const express = require('express');
const usersController = require('../controllers/users');
const {body} = require('express-validator');
const BookModel = require('../models/books');
const BookController = require('../controllers/books');


const router = express.Router();
// GET /book/getAllBooks
router.get('/getAllBooks',BookController.getAllBook);
// GET /book/getBook/1
router.get('/getBook/:bookId',BookController.getBook);
// POST /book/add
router.post('/add',[
    body('title').trim().isLength({min:5}).withMessage("length should be greater than or equal 5"),
    body('description').trim().isLength({min:5}),
    body('imagePath').notEmpty().withMessage('you should add image'),
    body('price').notEmpty().withMessage('you should add the price')
],BookController.addBook);

module.exports = router;