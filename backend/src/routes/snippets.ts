import { getSnippetsStatic, getSnippets, getSnippetsRandom } from '../controllers/snippets';
import express from 'express';

const router = express.Router();

router.get('/static/', getSnippetsStatic);
router.get('/rand/', getSnippetsRandom);
router.get('/', getSnippets);

export default router;