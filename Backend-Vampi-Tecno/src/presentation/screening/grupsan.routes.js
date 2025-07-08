import { Router } from 'express';
import { create, deleteGrupSan, getAll, getById, update } from '../../controllers/screening/grupsan.controller.js';

export const grupSanRouter = Router();

grupSanRouter.get('/', getAll);
grupSanRouter.get('/:vqrsCodGrs', getById);
grupSanRouter.post('/', create);
grupSanRouter.put('/:vqrsCodGrs', update);
grupSanRouter.delete('/:vqrsCodGrs', deleteGrupSan);
