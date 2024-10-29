const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
}, { timestamps: true }) // сохраняем пост в DB

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
