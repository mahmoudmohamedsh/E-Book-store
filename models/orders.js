const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    address: {type: String, required: true},
    name: {type: String, required: true},
    items: [
        {
            bookId:{
                type : Schema.Types.ObjectId,
                ref : 'Book',
                required:true
                },
            quantity: {type:Number , required:true}
        }
    ]
});



module.exports = mongoose.model('Order', schema);