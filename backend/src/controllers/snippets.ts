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
        next(error);
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
            result = await Snippet.find(query).sort(sortParams)
        } else {
            result = await Snippet.find(query)
        }

        if (result.length < 1) {
            throw new Error("Sorry, no result matched your query");
        }

        res.status(200).json({
            success: true,
            data: result,
        })

    } catch (error) {
        next(error);
    }
}


const getSnippetsRandom = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limit = req.query.limit && typeof req.query.limit === 'string'? 
            parseInt(req.query.limit) : 10

        const result = await Snippet.aggregate([
            {$sample: {size: limit}},
        ]);

        res.status(200).json({
            success: true,
            data: result,
            items: limit
        })

    } catch (error) {
        next(error);
    }
}


export {
    getSnippetsStatic,
    getSnippets,
    getSnippetsRandom
}