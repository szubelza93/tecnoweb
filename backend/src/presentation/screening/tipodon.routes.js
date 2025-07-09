import { Router } from 'express';
import { create, deleteTipoDon, getAll, getById, update } from '../../controllers/screening/tipodon.controller.js';

export const tipoDonRouter = Router();

tipoDonRouter.get('/', getAll);
tipoDonRouter.get('/:vtdnCodTdn', getById);
tipoDonRouter.post('/', create);
tipoDonRouter.put('/:vtdnCodTdn', update);
tipoDonRouter.delete('/:vtdnCodTdn', deleteTipoDon);
