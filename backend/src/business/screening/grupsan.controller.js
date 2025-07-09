import { GrupSanModel } from "../../models/screening/grupsan.model.js";

export const getAll = async (req, res) => {
    const grupos = await GrupSanModel.getAll();
    res.json(grupos);
};

export const getById = async (req, res) => {
    const { vqrsCodGrs } = req.params;
    const grupo = await GrupSanModel.getById(vqrsCodGrs);
    if (!grupo) {
        return res.status(404).json({ message: "Grupo sanguíneo no encontrado" });
    }
    res.json(grupo);
};

export const create = async (req, res) => {
    try {
        const grupo = req.body;
        const newGrupo = await GrupSanModel.create(grupo);
        res.status(201).json(newGrupo);
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(409).json({ message: "El grupo sanguíneo ya existe" });
        }
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const update = async (req, res) => {
    const { vqrsCodGrs } = req.params;
    const { vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax } = req.body;

    if (!vqrsGruABO || !vqrsTipoRH || !vprgCodPrg || !vprgEstMin || !vprgEstMax) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const grupo = await GrupSanModel.update(vqrsCodGrs, { vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax });
        if (!grupo) {
            return res.status(404).json({ message: 'Grupo sanguíneo no encontrado' });
        }
        res.json(grupo);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

export const deleteGrupSan = async (req, res) => {
    const { vqrsCodGrs } = req.params;
    try {
        const grupo = await GrupSanModel.delete(vqrsCodGrs);
        if (!grupo) {
            return res.status(404).json({ message: "Grupo sanguíneo no encontrado" });
        }
        res.json({ message: "Grupo sanguíneo eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};
