import { InferSchemaType, Schema, model } from "mongoose";

const snippetSchema = new Schema({
    artist: String,
    title: String,
    content_seq: Number,
    text: String,
    img: String
});

type Snippet = InferSchemaType<typeof snippetSchema>;

export default model<Snippet>('Snippet', snippetSchema);