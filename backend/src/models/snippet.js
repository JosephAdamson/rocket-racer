"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var snippetSchema = new mongoose_1.Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content_seq: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});
exports["default"] = (0, mongoose_1.model)('Snippet', snippetSchema);
