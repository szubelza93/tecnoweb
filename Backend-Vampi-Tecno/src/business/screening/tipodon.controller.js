import { TipoDonModel } from '../../models/screening/tipodon.model.js';

export const getAll = async (req, res) => {
    const tipos = await TipoDonModel.getAll();
    res.json(tipos);
};

export const getById = async (req, res) => {
    const { vtdnCodTdn } = req.params;
    const tipo = await TipoDonModel.getById(vtdnCodTdn);
    if (!tipo) {
        return res.status(404).json({ message: "Tipo de donación no encontrado" });
    }
    res.json(tipo);
};

export const create = async (req, res) => {
    try {
        const tipo = req.body;
        const newTipo = await TipoDonModel.create(tipo);
        res.status(201).json(newTipo);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "El tipo de donación ya existe" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const update = async (req, res) => {
    const { vtdnCodTdn } = req.params;
    const { vtdnDescn } = req.body;

    if (!vtdnDescn) {
        return res.status(400).json({ message: "El campo descripción es obligatorio." });
    }

    try {
        const tipo = await TipoDonModel.update(vtdnCodTdn, { vtdnDescn });
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de donación no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

export const deleteTipoDon = async (req, res) => {
    const { vtdnCodTdn } = req.params;
    try {
        const tipo = await TipoDonModel.delete(vtdnCodTdn);
        if (!tipo) {
            return res.status(404).json({ message: "Tipo de donación no encontrado" });
        }
        res.json({ message: "Tipo de donación eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
