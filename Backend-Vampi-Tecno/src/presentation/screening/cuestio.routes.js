import { Router } from 'express';
import { create, deleteCuestio, getAll, getById, update } from '../../controllers/screening/cuestio.controller.js';

export const cuestioRouter = Router();

cuestioRouter.get('/', getAll);
cuestioRouter.get('/:vcueNroCue/:vcueNroPre', getById);
cuestioRouter.post('/', create);
cuestioRouter.put('/:vcueNroCue/:vcueNroPre', update);
cuestioRouter.delete('/:vcueNroCue/:vcueNroPre', deleteCuestio);
