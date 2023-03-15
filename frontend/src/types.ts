

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
    keyStrokes: number;
    errors: number;
    wordCount: number;
}


export interface LinkItem {
    name: string;
    href: string;
}


export interface DataTransfer {
    dataType: string;
    matchMakeSuccess?: boolean;
    content?: string;
}