import { Request, Response, NextFunction } from 'express';
import Snippet from '../models/snippet';


const getSnippetsStatic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Snippet.find({});
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}


interface queryObj {
    artist?: string
    title?: string
    sort?: string
}


const getSnippets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { artist, title, sort } = req.query;
        const query: queryObj = {};

        if (artist && typeof artist === 'string') {
            query.artist = artist.toLowerCase();
        }

        if (title && typeof title === 'string') {
            query.title = title.toLowerCase();
        }

        let result;
        if (sort && typeof sort === 'string') {
            const sortParams = sort.split(',').join(' ');
            result = await Snippet.find(query).sort(sortParams);
        } else {
            result = await Snippet.find(query);
        }

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        console.log(error);
    }
}


export {
    getSnippetsStatic,
    getSnippets
}