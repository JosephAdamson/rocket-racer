import { getSnippetsStatic, getSnippets } from '../controllers/snippets';
import express from 'express';

const router = express.Router();

router.get('/static/', getSnippetsStatic);
router.get('/', getSnippets);

export default router;