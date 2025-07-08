import { TipoCenModel } from '../../models/screening/tipocen.model.js';

export const getAll = async (req, res) => {
    const tipos = await TipoCenModel.getAll();
    res.json(tipos);
};

export const getById = async (req, res) => {
    const { viceCodTce } = req.params;
    const tipo = await TipoCenModel.getById(viceCodTce);
    if (!tipo) {
        return res.status(404).json({ message: "Tipo de centro no encontrado" });
    }
    res.json(tipo);
};

export const create = async (req, res) => {
    try {
        const tipo = req.body;
        const newTipo = await TipoCenModel.create(tipo);
        res.status(201).json(newTipo);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "El tipo de centro ya existe" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const update = async (req, res) => {
    const { viceCodTce } = req.params;
    const { viceDescri } = req.body;

    if (!viceDescri) {
        return res.status(400).json({ message: "El campo descripción es obligatorio." });
    }

    try {
        const tipo = await TipoCenModel.update(viceCodTce, { viceDescri });
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de centro no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

export const deleteTipoCen = async (req, res) => {
    const { viceCodTce } = req.params;
    try {
        const tipo = await TipoCenModel.delete(viceCodTce);
        if (!tipo) {
            return res.status(404).json({ message: "Tipo de centro no encontrado" });
        }
        res.json({ message: "Tipo de centro eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
