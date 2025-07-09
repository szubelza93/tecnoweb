import { Router } from 'express';
import { create, deleteTipoCen, getAll, getById, update } from '../../controllers/screening/tipocen.controller.js';

export const tipoCenRouter = Router();

tipoCenRouter.get('/', getAll);
tipoCenRouter.get('/:viceCodTce', getById);
tipoCenRouter.post('/', create);
tipoCenRouter.put('/:viceCodTce', update);
tipoCenRouter.delete('/:viceCodTce', deleteTipoCen);
