const mongoose = require('mongoose');

const Playerchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Player = mongoose.model('Player', Playerchema);

module.exports = Player;