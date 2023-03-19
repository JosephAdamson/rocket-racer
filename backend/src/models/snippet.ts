import { Schema, model, InferSchemaType } from "mongoose";

interface Snippet {
    artist: string;
    title: string;
    content_seq: number;
    text: string;
    img: string;
}

const snippetSchema = new Schema<Snippet>({
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

//type Snippet = InferSchemaType<typeof snippetSchema>

export default model<Snippet>('Snippet', snippetSchema);