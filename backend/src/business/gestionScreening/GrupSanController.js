const GrupSan = require('../../data/gestionScreening/GrupSan');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError, ValidationError } = require('../../shared/middlewares/errorHandler');

class GrupSanController {
    // LÓGICA DE NEGOCIO - Validaciones, reglas, transformaciones
    static async getAll(req, res) {
        try {
            // Extraer parámetros de consulta
            const { page = 1, limit = 10, sort = 'ASC' } = req.query;
            
            // Validaciones de negocio
            if (page < 1) {
                throw new ValidationError('Página debe ser mayor a 0');
            }
            if (limit > 100) {
                throw new ValidationError('Límite máximo es 100 registros por página');
            }
            if (!['ASC', 'DESC'].includes(sort.toUpperCase())) {
                throw new ValidationError('Orden debe ser ASC o DESC');
            }
            
            // Llamada a la capa de datos
            const grupos = await GrupSan.findAll({ 
                page: parseInt(page), 
                limit: parseInt(limit), 
                sort: sort.toUpperCase() 
            });
            console.log(grupos);
            
            // Transformación de datos para presentación
            const formattedGrupos = grupos.map(grupo => ({
                id: grupo.vqrscodgrs,
                grupoABO: grupo.vqrsgruabo,
                tipoRH: grupo.vqrstiporh,
                programa: {
                    codigo: grupo.vprgcodprg,
                    estaturaMinima: grupo.vprgestmin,
                    estaturaMaxima: grupo.vprgestmax
                },
                informacionCompleta: `${grupo.vqrsgruabo}${grupo.vqrstiporh}`,
                rangoEstatura: `${grupo.vprgestmin} - ${grupo.vprgestmax} cm`
            }));
            
            // Obtener total de registros para paginación
            const total = await GrupSan.count();
            const totalPages = Math.ceil(total / parseInt(limit));
            
            // Respuesta con información de paginación
            ResponseHelper.success(res, {
                grupos: formattedGrupos,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages,
                    hasNext: parseInt(page) < totalPages,
                    hasPrev: parseInt(page) > 1
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async getById(req, res) {
        try {
            // Lógica de negocio: validación de ID
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                throw new ValidationError('ID de grupo sanguíneo inválido');
            }
            
            // Llamada a la capa de datos
            const grupo = await GrupSan.findById(id);
            
            if (!grupo) {
                throw new NotFoundError('Grupo Sanguíneo');
            }
            
            // Transformación para presentación
            const formattedGrupo = {
                id: grupo.vqrsCodGrs,
                grupoABO: grupo.vqrsGruABO,
                tipoRH: grupo.vqrsTipoRH,
                programa: {
                    codigo: grupo.vprgCodPrg,
                    estaturaMinima: grupo.vprgEstMin,
                    estaturaMaxima: grupo.vprgEstMax
                },
                informacionCompleta: `${grupo.vqrsGruABO}${grupo.vqrsTipoRH}`,
                rangoEstatura: `${grupo.vprgEstMin} - ${grupo.vprgEstMax} cm`,
                estadisticas: {
                    estaturaPromedio: Math.round((grupo.vprgEstMin + grupo.vprgEstMax) / 2),
                    rangoTotal: grupo.vprgEstMax - grupo.vprgEstMin
                }
            };
            
            ResponseHelper.success(res, formattedGrupo);
        } catch (error) {
            throw error;
        }
    }
    
    static async create(req, res) {
        try {
            // Lógica de negocio: validaciones complejas
            const data = req.body;
            
            // Validar grupo ABO válido
            const gruposABOValidos = ['A', 'B', 'AB', 'O'];
            if (!gruposABOValidos.includes(data.vqrsGruABO)) {
                throw new ValidationError('Grupo ABO debe ser A, B, AB u O');
            }
            
            // Validar tipo RH válido
            const tiposRHValidos = ['+', '-'];
            if (!tiposRHValidos.includes(data.vqrsTipoRH)) {
                throw new ValidationError('Tipo RH debe ser + o -');
            }
            
            // Validar estatura mínima
            if (data.vprgEstMin < 1 || data.vprgEstMin > 250) {
                throw new ValidationError('Estatura mínima debe estar entre 100 y 250 cm');
            }
            
            // Validar estatura máxima
            if (data.vprgEstMax < 1 || data.vprgEstMax > 250) {
                throw new ValidationError('Estatura máxima debe estar entre 100 y 250 cm');
            }
            
            // Validar que estatura máxima sea mayor que mínima
            if (data.vprgEstMax <= data.vprgEstMin) {
                throw new ValidationError('Estatura máxima debe ser mayor que estatura mínima');
            }
            
            // Validar que no exista un grupo con la misma combinación
            const existingGrupo = await GrupSan.findByGrupoAndRH(data.vqrsGruABO, data.vqrsTipoRH);
            if (existingGrupo) {
                throw new ValidationError(`Ya existe un grupo sanguíneo ${data.vqrsGruABO}${data.vqrsTipoRH}`);
            }
            
            // Generar código único si no se proporciona
            if (!data.vqrsCodGrs) {
                data.vqrsCodGrs = await GrupSan.generateUniqueCode();
            }
            
            // Validar que el código no exista
            const existingCode = await GrupSan.findById(data.vqrsCodGrs);
            if (existingCode) {
                throw new ValidationError('El código de grupo sanguíneo ya existe');
            }
            
            // Llamada a la capa de datos
            const nuevoGrupo = await GrupSan.create(data);
            
            // Transformación para presentación
            const formattedGrupo = {
                id: nuevoGrupo.vqrsCodGrs,
                grupoABO: nuevoGrupo.vqrsGruABO,
                tipoRH: nuevoGrupo.vqrsTipoRH,
                programa: {
                    codigo: nuevoGrupo.vprgCodPrg,
                    estaturaMinima: nuevoGrupo.vprgEstMin,
                    estaturaMaxima: nuevoGrupo.vprgEstMax
                },
                informacionCompleta: `${nuevoGrupo.vqrsGruABO}${nuevoGrupo.vqrsTipoRH}`,
                rangoEstatura: `${nuevoGrupo.vprgEstMin} - ${nuevoGrupo.vprgEstMax} cm`
            };
            
            ResponseHelper.created(res, formattedGrupo, 'Grupo sanguíneo creado exitosamente.');
        } catch (error) {
            throw error;
        }
    }

    static async update(req, res) {
        try {
            // Lógica de negocio: validaciones para actualización
            const { id } = req.params;
            const data = req.body;
            
            if (!id || isNaN(id)) {
                throw new ValidationError('ID de grupo sanguíneo inválido');
            }
            
            // Verificar que el grupo existe
            const existingGrupo = await GrupSan.findById(id);
            if (!existingGrupo) {
                throw new NotFoundError('Grupo Sanguíneo');
            }
            
            // Validar grupo ABO válido si se está actualizando
            if (data.vqrsGruABO) {
                const gruposABOValidos = ['A', 'B', 'AB', 'O'];
                if (!gruposABOValidos.includes(data.vqrsGruABO)) {
                    throw new ValidationError('Grupo ABO debe ser A, B, AB u O');
                }
            }
            
            // Validar tipo RH válido si se está actualizando
            if (data.vqrsTipoRH) {
                const tiposRHValidos = ['+', '-'];
                if (!tiposRHValidos.includes(data.vqrsTipoRH)) {
                    throw new ValidationError('Tipo RH debe ser + o -');
                }
            }
            
            // Validar estaturas si se están actualizando
            if (data.vprgEstMin && data.vprgEstMax) {
                if (data.vprgEstMin < 1 || data.vprgEstMin > 250) {
                    throw new ValidationError('Estatura mínima debe estar entre 100 y 250 cm');
                }
                if (data.vprgEstMax < 1 || data.vprgEstMax > 250) {
                    throw new ValidationError('Estatura máxima debe estar entre 100 y 250 cm');
                }
                if (data.vprgEstMax <= data.vprgEstMin) {
                    throw new ValidationError('Estatura máxima debe ser mayor que estatura mínima');
                }
            }
            
            // Validar que no exista conflicto con otro grupo
            const grupoABO = data.vqrsGruABO || existingGrupo.vqrsGruABO;
            const tipoRH = data.vqrsTipoRH || existingGrupo.vqrsTipoRH;
            
            if (data.vqrsGruABO || data.vqrsTipoRH) {
                const conflictingGrupo = await GrupSan.findByGrupoAndRH(grupoABO, tipoRH);
                if (conflictingGrupo && conflictingGrupo.vqrsCodGrs !== parseInt(id)) {
                    throw new ValidationError(`Ya existe un grupo sanguíneo ${grupoABO}${tipoRH}`);
                }
            }
            
            // Llamada a la capa de datos
            const grupoActualizado = await GrupSan.update(id, data);
            
            // Transformación para presentación
            const formattedGrupo = {
                id: grupoActualizado.vqrsCodGrs,
                grupoABO: grupoActualizado.vqrsGruABO,
                tipoRH: grupoActualizado.vqrsTipoRH,
                programa: {
                    codigo: grupoActualizado.vprgCodPrg,
                    estaturaMinima: grupoActualizado.vprgEstMin,
                    estaturaMaxima: grupoActualizado.vprgEstMax
                },
                informacionCompleta: `${grupoActualizado.vqrsGruABO}${grupoActualizado.vqrsTipoRH}`,
                rangoEstatura: `${grupoActualizado.vprgEstMin} - ${grupoActualizado.vprgEstMax} cm`
            };
            
            ResponseHelper.updated(res, formattedGrupo, 'Grupo sanguíneo actualizado exitosamente.');
        } catch (error) {
            throw error;
        }
    }

    static async delete(req, res) {
        try {
            // Lógica de negocio: validaciones para eliminación
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                throw new ValidationError('ID de grupo sanguíneo inválido');
            }
            
            // Verificar que el grupo existe
            const existingGrupo = await GrupSan.findById(id);
            if (!existingGrupo) {
                throw new NotFoundError('Grupo Sanguíneo');
            }
            
            // Aquí podrías agregar validaciones adicionales
            // Por ejemplo, verificar si el grupo está siendo usado en screenings
            // y no permitir la eliminación si está en uso
            
            // Llamada a la capa de datos
            const grupoEliminado = await GrupSan.delete(id);
            
            ResponseHelper.deleted(res, 'Grupo sanguíneo eliminado exitosamente.');
        } catch (error) {
            throw error;
        }
    }

    static async searchByGrupoABO(req, res) {
        try {
            // Lógica de negocio: validación de búsqueda
            const { grupoABO } = req.query;
            
            if (!grupoABO) {
                throw new ValidationError('El parámetro grupoABO es requerido');
            }
            
            // Validar grupo ABO válido
            const gruposABOValidos = ['A', 'B', 'AB', 'O'];
            if (!gruposABOValidos.includes(grupoABO.toUpperCase())) {
                throw new ValidationError('Grupo ABO debe ser A, B, AB u O');
            }
            
            // Llamada a la capa de datos
            const grupos = await GrupSan.findByGrupoABO(grupoABO.toUpperCase());
            
            // Transformación para presentación
            const formattedGrupos = grupos.map(grupo => ({
                id: grupo.vqrsCodGrs,
                grupoABO: grupo.vqrsGruABO,
                tipoRH: grupo.vqrsTipoRH,
                programa: {
                    codigo: grupo.vprgCodPrg,
                    estaturaMinima: grupo.vprgEstMin,
                    estaturaMaxima: grupo.vprgEstMax
                },
                informacionCompleta: `${grupo.vqrsGruABO}${grupo.vqrsTipoRH}`,
                rangoEstatura: `${grupo.vprgEstMin} - ${grupo.vprgEstMax} cm`
            }));
            
            ResponseHelper.success(res, {
                grupos: formattedGrupos,
                total: formattedGrupos.length,
                grupoABO: grupoABO.toUpperCase()
            });
        } catch (error) {
            throw error;
        }
    }

    static async searchByTipoRH(req, res) {
        try {
            // Lógica de negocio: validación de búsqueda
            const { tipoRH } = req.query;
            
            if (!tipoRH) {
                throw new ValidationError('El parámetro tipoRH es requerido');
            }
            
            // Validar tipo RH válido
            const tiposRHValidos = ['+', '-'];
            if (!tiposRHValidos.includes(tipoRH)) {
                throw new ValidationError('Tipo RH debe ser + o -');
            }
            
            // Llamada a la capa de datos
            const grupos = await GrupSan.findByTipoRH(tipoRH);
            
            // Transformación para presentación
            const formattedGrupos = grupos.map(grupo => ({
                id: grupo.vqrsCodGrs,
                grupoABO: grupo.vqrsGruABO,
                tipoRH: grupo.vqrsTipoRH,
                programa: {
                    codigo: grupo.vprgCodPrg,
                    estaturaMinima: grupo.vprgEstMin,
                    estaturaMaxima: grupo.vprgEstMax
                },
                informacionCompleta: `${grupo.vqrsGruABO}${grupo.vqrsTipoRH}`,
                rangoEstatura: `${grupo.vprgEstMin} - ${grupo.vprgEstMax} cm`
            }));
            
            ResponseHelper.success(res, {
                grupos: formattedGrupos,
                total: formattedGrupos.length,
                tipoRH
            });
        } catch (error) {
            throw error;
        }
    }

    static async searchByRangoEstatura(req, res) {
        try {
            // Lógica de negocio: validación de búsqueda
            const { minEstatura, maxEstatura } = req.query;
            
            if (!minEstatura || !maxEstatura) {
                throw new ValidationError('Los parámetros minEstatura y maxEstatura son requeridos');
            }
            
            // Validar que sean números
            if (isNaN(minEstatura) || isNaN(maxEstatura)) {
                throw new ValidationError('Las estaturas deben ser números válidos');
            }
            
            // Validar rango de estaturas
            if (parseInt(minEstatura) < 1 || parseInt(maxEstatura) > 250) {
                throw new ValidationError('Las estaturas deben estar entre 100 y 250 cm');
            }
            
            if (parseInt(minEstatura) >= parseInt(maxEstatura)) {
                throw new ValidationError('Estatura mínima debe ser menor que estatura máxima');
            }
            
            // Llamada a la capa de datos
            const grupos = await GrupSan.findByRangoEstatura(parseInt(minEstatura), parseInt(maxEstatura));
            
            // Transformación para presentación
            const formattedGrupos = grupos.map(grupo => ({
                id: grupo.vqrsCodGrs,
                grupoABO: grupo.vqrsGruABO,
                tipoRH: grupo.vqrsTipoRH,
                programa: {
                    codigo: grupo.vprgCodPrg,
                    estaturaMinima: grupo.vprgEstMin,
                    estaturaMaxima: grupo.vprgEstMax
                },
                informacionCompleta: `${grupo.vqrsGruABO}${grupo.vqrsTipoRH}`,
                rangoEstatura: `${grupo.vprgEstMin} - ${grupo.vprgEstMax} cm`,
                compatibilidad: {
                    estaturaMinima: grupo.vprgEstMin,
                    estaturaMaxima: grupo.vprgEstMax,
                    rangoSolicitado: `${minEstatura} - ${maxEstatura} cm`
                }
            }));
            
            ResponseHelper.success(res, {
                grupos: formattedGrupos,
                total: formattedGrupos.length,
                rangoEstatura: {
                    minima: parseInt(minEstatura),
                    maxima: parseInt(maxEstatura)
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GrupSanController; 