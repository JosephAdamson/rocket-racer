import { getSnippetsStatic, getSnippets, getSnippetsRandom, deleteSnippets } from '../controllers/snippets';
import express from 'express';

const router = express.Router();

router.get('/static/', getSnippetsStatic);
router.get('/rand/', getSnippetsRandom);
router.get('/', getSnippets);
//router.delete('/', deleteSnippets);

export default router;