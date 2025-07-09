import { CuestioModel } from '../../models/screening/cuestio.model.js';

export const getAll = async (req, res) => {
    const preguntas = await CuestioModel.getAll();
    res.json(preguntas);
};

export const getById = async (req, res) => {
    const { vcueNroCue, vcueNroPre } = req.params;
    const pregunta = await CuestioModel.getById(vcueNroCue, vcueNroPre);
    if (!pregunta) {
        return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    res.json(pregunta);
};

export const create = async (req, res) => {
    try {
        const pregunta = req.body;
        const newPregunta = await CuestioModel.create(pregunta);
        res.status(201).json(newPregunta);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "La pregunta ya existe" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const update = async (req, res) => {
    const { vcueNroCue, vcueNroPre } = req.params;
    const pregunta = req.body;

    try {
        const updatedPregunta = await CuestioModel.update(vcueNroCue, vcueNroPre, pregunta);
        if (!updatedPregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.json(updatedPregunta);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

export const deleteCuestio = async (req, res) => {
    const { vcueNroCue, vcueNroPre } = req.params;
    try {
        const deletedPregunta = await CuestioModel.delete(vcueNroCue, vcueNroPre);
        if (!deletedPregunta) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        res.json({ message: "Pregunta eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
