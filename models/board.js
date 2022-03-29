const mongoose = require("mongoose")
const autoIdSetter = require("./auto-id")

const board = new mongoose.Schema({

    // userNum: {
    //     type: Number,
    //     required: true
    // },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

autoIdSetter(board, mongoose, 'boards', 'boardId')
module.exports = mongoose.model("Boards", board)