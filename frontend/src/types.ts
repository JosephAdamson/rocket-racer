

export interface Snippet {
    artist: string,
    title: string,
    content_seq: number,
    text: string,
    img: string
}


export interface Results {
    snippet: Snippet;
    timeRemaining: number;
    baseTime: number;
    cursor: number;
}