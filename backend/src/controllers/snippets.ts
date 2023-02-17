import { Request, Response, NextFunction } from 'express';
import Snippet from '../models/snippet';
import APIError from '../errors/APIError';

/* 
Test end point (retrieves all available snippets) 
*/
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
    id?: string
}


/*
Get snippet using custom query, allows for sorting. 
*/
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

        // picked 404 over 204 as the latter returns no response body in express.
        if (result.length < 1) {
            throw new APIError("Query returned nothing", 404);
        }

        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error);
    }
}

/*
Get random collection (size of collection specfied by 'limit') 
*/
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
        });

    } catch (error) {
        next(error);
    }
}


/*
End point not used by the app, only used for db maintenance 
with limited query params atm.
*/
const deleteSnippets = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const { artist } = req.query;
        const query: queryObj = {}

        if (artist && typeof artist === 'string') {
            query.artist = artist.toLowerCase();
        }
        console.log(query);

        const result = await Snippet.deleteMany(query);

        // lets just return response
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}


export {
    getSnippetsStatic,
    getSnippets,
    getSnippetsRandom,
    deleteSnippets
}