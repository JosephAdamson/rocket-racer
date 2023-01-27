import { Schema, model, InferSchemaType } from "mongoose";

const snippetSchema = new Schema({
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

type Snippet = InferSchemaType<typeof snippetSchema>

export default model('Snippet', snippetSchema);