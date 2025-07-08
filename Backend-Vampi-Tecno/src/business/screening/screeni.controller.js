import { ScreeniModel } from '../../models/screening/screeni.model.js';

export const getAll = async (req, res) => {
    const registros = await ScreeniModel.getAll();
    res.json(registros);
};

export const getById = async (req, res) => {
    const { vscrNroScr, vcenCodCen } = req.params;
    const registro = await ScreeniModel.getById(vscrNroScr, vcenCodCen);
    if (!registro) {
        return res.status(404).json({ message: "Registro de screening no encontrado" });
    }
    res.json(registro);
};

export const create = async (req, res) => {
    try {
        const registro = req.body;
        const newRegistro = await ScreeniModel.create(registro);
        res.status(201).json(newRegistro);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "El registro de screening ya existe" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const update = async (req, res) => {
    const { vscrNroScr, vcenCodCen } = req.params;
    const registro = req.body;

    try {
        const updatedRegistro = await ScreeniModel.update(vscrNroScr, vcenCodCen, registro);
        if (!updatedRegistro) {
            return res.status(404).json({ message: 'Registro de screening no encontrado' });
        }
        res.json(updatedRegistro);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

export const deleteScreeni = async (req, res) => {
    const { vscrNroScr, vcenCodCen } = req.params;
    try {
        const deletedRegistro = await ScreeniModel.delete(vscrNroScr, vcenCodCen);
        if (!deletedRegistro) {
            return res.status(404).json({ message: "Registro de screening no encontrado" });
        }
        res.json({ message: "Registro de screening eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
