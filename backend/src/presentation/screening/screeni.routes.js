import { Router } from 'express';
import { create, deleteScreeni, getAll, getById, update } from '../../controllers/screening/screeni.controller.js';

export const screeniRouter = Router();

screeniRouter.get('/', getAll);
screeniRouter.get('/:vscrNroScr/:vcenCodCen', getById);
screeniRouter.post('/', create);
screeniRouter.put('/:vscrNroScr/:vcenCodCen', update);
screeniRouter.delete('/:vscrNroScr/:vcenCodCen', deleteScreeni);
