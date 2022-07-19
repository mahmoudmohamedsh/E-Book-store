const {validationResult} = require('express-validator');
const bookModel = require('../models/books');
const router = require('../routes/books');

exports.getAllBook = (req,res,next)=>{
    bookModel.find()
        .then(books=>{
            res.status(200).json({message:"all books fetched",books:books})
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.getBook = (req,res,next)=>{
    const bookId = req.params.bookId;

    bookModel.findById(bookId)
        .then(book => {
            if(!book){
                const error = new Error('could not find post');
                error.statusCode =404;
                throw error; // call it inside then this make it go to catch direct and error pass to catch
            }
            res.status(200).json({message : 'book feched',book:book})
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

}
exports.addBook = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('validation faild');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    // const imagePath = req.body.

    const book = new bookModel({
        title:title,
        description:description,
        price:price,
        imagePath:'/images/respect.png',
    });
    book.save()
        .then(result => {
            res.status(201).json({
                message: "book created successfully",
                book:result
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}