const Donante = require('../../data/gestionDonante/Donante');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError, ValidationError } = require('../../shared/middlewares/errorHandler');

class DonanteController {
    // LÓGICA DE NEGOCIO - Validaciones, reglas, transformaciones
    static async getAll(req, res) {
        try {
            // Extraer parámetros de consulta
            const { page = 1, limit = 10, search, sort = 'DESC' } = req.query;
            
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
            const donantes = await Donante.findAll({ 
                page: parseInt(page), 
                limit: parseInt(limit), 
                search, 
                sort: sort.toUpperCase() 
            });
            console.log(donantes);
            
            // Transformación de datos para presentación
            const formattedDonantes = donantes.map(donante => ({
                id: donante.vdoncoddon,
                nombreCompleto: `${donante.vdonpatern || ''} ${donante.vdonmatern || ''} ${donante.vdonnombre || ''}`.trim(),
                documento: donante.vdondocide,
                email: donante.vdonemail,
                telefono: donante.vdontelcel,
                ocupacion: donante.ocupacion,
                gradoInstruccion: donante.grado_instruccion,
                lugarNacimiento: donante.lugar_nacimiento,
                clubDonantes: donante.club_donantes,
                zonaDireccion: donante.zona_direccion,
                fechaNacimiento: donante.vdonfecnac,
                direccion: {
                    zona: donante.zona_direccion,
                    direccion: donante.vdondirecc,
                    descripcion: donante.vdondesdir
                },
                contactos: {
                    telefonoDomicilio: donante.vdonteldom,
                    telefonoOficina: donante.vdonteloff,
                    telefonoCelular: donante.vdontelcel,
                    email: donante.vdonemail
                },
                informacionLaboral: {
                    ocupacion: donante.ocupacion,
                    trabajo: donante.vdontrabaj,
                    direccionTrabajo: donante.vdondirtra
                }
            }));
            
            // Obtener total de registros para paginación
            const total = await Donante.count();
            const totalPages = Math.ceil(total / parseInt(limit));
            
            // Respuesta con información de paginación
            ResponseHelper.success(res, {
                donantes: formattedDonantes,
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
                throw new ValidationError('ID de donante inválido');
            }
            
            // Llamada a la capa de datos
            const donante = await Donante.findById(id);
            
            if (!donante) {
                throw new NotFoundError('Donante');
            }
            
            // Transformación para presentación
            const formattedDonante = {
                id: donante.vdonCodDon,
                nombreCompleto: `${donante.vdonPatern || ''} ${donante.vdonMatern || ''} ${donante.vdonNombre || ''}`.trim(),
                documento: donante.vdonDocide,
                email: donante.vdonEmail,
                telefono: donante.vdonTelCel,
                edad: donante.vdonEdadDo,
                estadoCivil: donante.vdonEstCiv,
                sexo: donante.vdonSexoDn,
                direccion: {
                    zona: donante.zona_direccion,
                    direccion: donante.vdonDirecc,
                    descripcion: donante.vdonDesDir
                },
                informacionPersonal: {
                    fechaNacimiento: donante.vdonFecNac,
                    edad: donante.vdonEdadDo,
                    estadoCivil: donante.vdonEstCiv,
                    sexo: donante.vdonSexoDn,
                    tipoDocumento: donante.tipo_documento
                },
                informacionLaboral: {
                    ocupacion: donante.ocupacion,
                    trabajo: donante.vdonTrabaj,
                    direccionTrabajo: donante.vdonDirTra,
                    gradoInstruccion: donante.grado_instruccion
                },
                contactos: {
                    telefonoDomicilio: donante.vdonTelDom,
                    telefonoOficina: donante.vdonTelOff,
                    telefonoCelular: donante.vdonTelCel,
                    email: donante.vdonEmail
                },
                informacionAdicional: {
                    lugarNacimiento: donante.lugar_nacimiento,
                    clubDonantes: donante.club_donantes,
                    zonaDireccion: donante.zona_direccion,
                    carnetTrabajo: donante.vdonCarneT,
                    cita: donante.vdonSwCita
                }
            };
            
            ResponseHelper.success(res, formattedDonante);
        } catch (error) {
            throw error;
        }
    }
    
    static async create(req, res) {
        try {
            // Lógica de negocio: validaciones complejas
            const data = req.body;
            
            // Validar edad mínima
            if (data.vdonEdadDo < 18) {
                throw new ValidationError('El donante debe ser mayor de edad (mínimo 18 años)');
            }
            
            // Validar edad máxima
            if (data.vdonEdadDo > 100) {
                throw new ValidationError('La edad del donante no puede ser mayor a 100 años');
            }
            
            // Validar documento único
            if (data.vdonDocide) {
                const existingDonante = await Donante.findByDocument(data.vdonDocide);
                if (existingDonante) {
                    throw new ValidationError('Ya existe un donante con este documento de identidad');
                }
            }
            
            // Validar email único
            if (data.vdonEmail) {
                const existingEmail = await Donante.findByEmail(data.vdonEmail);
                if (existingEmail) {
                    throw new ValidationError('Ya existe un donante con este email');
                }
            }
            
            // Generar código único si no se proporciona
            if (!data.vdonCodDon) {
                data.vdonCodDon = await Donante.generateUniqueCode();
            }
            
            // Validar que el código no exista
            const existingCode = await Donante.findById(data.vdonCodDon);
            if (existingCode) {
                throw new ValidationError('El código de donante ya existe');
            }
            
            // Validar campos obligatorios
            if (!data.vdonNombre) {
                throw new ValidationError('El nombre del donante es obligatorio');
            }
            
            // Llamada a la capa de datos
            const nuevoDonante = await Donante.create(data);
            
            // Transformación para presentación
            const formattedDonante = {
                id: nuevoDonante.vdonCodDon,
                nombreCompleto: `${nuevoDonante.vdonPatern || ''} ${nuevoDonante.vdonMatern || ''} ${nuevoDonante.vdonNombre || ''}`.trim(),
                documento: nuevoDonante.vdonDocide,
                email: nuevoDonante.vdonEmail,
                telefono: nuevoDonante.vdonTelCel,
                edad: nuevoDonante.vdonEdadDo,
                estadoCivil: nuevoDonante.vdonEstCiv,
                sexo: nuevoDonante.vdonSexoDn
            };
            
            ResponseHelper.created(res, formattedDonante, 'Donante creado exitosamente.');
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
                throw new ValidationError('ID de donante inválido');
            }
            
            // Verificar que el donante existe
            const existingDonante = await Donante.findById(id);
            if (!existingDonante) {
                throw new NotFoundError('Donante');
            }
            
            // Validar edad mínima si se está actualizando
            if (data.vdonEdadDo && data.vdonEdadDo < 18) {
                throw new ValidationError('El donante debe ser mayor de edad (mínimo 18 años)');
            }
            
            // Validar edad máxima si se está actualizando
            if (data.vdonEdadDo && data.vdonEdadDo > 100) {
                throw new ValidationError('La edad del donante no puede ser mayor a 100 años');
            }
            
            // Validar documento único si se está actualizando
            if (data.vdonDocide && data.vdonDocide !== existingDonante.vdonDocide) {
                const existingDocument = await Donante.findByDocument(data.vdonDocide);
                if (existingDocument) {
                    throw new ValidationError('Ya existe un donante con este documento de identidad');
                }
            }
            
            // Validar email único si se está actualizando
            if (data.vdonEmail && data.vdonEmail !== existingDonante.vdonEmail) {
                const existingEmail = await Donante.findByEmail(data.vdonEmail);
                if (existingEmail) {
                    throw new ValidationError('Ya existe un donante con este email');
                }
            }
            
            // Llamada a la capa de datos
            const donanteActualizado = await Donante.update(id, data);
            
            // Transformación para presentación
            const formattedDonante = {
                id: donanteActualizado.vdonCodDon,
                nombreCompleto: `${donanteActualizado.vdonPatern || ''} ${donanteActualizado.vdonMatern || ''} ${donanteActualizado.vdonNombre || ''}`.trim(),
                documento: donanteActualizado.vdonDocide,
                email: donanteActualizado.vdonEmail,
                telefono: donanteActualizado.vdonTelCel,
                edad: donanteActualizado.vdonEdadDo,
                estadoCivil: donanteActualizado.vdonEstCiv,
                sexo: donanteActualizado.vdonSexoDn
            };
            
            ResponseHelper.updated(res, formattedDonante, 'Donante actualizado exitosamente.');
        } catch (error) {
            throw error;
        }
    }

    static async delete(req, res) {
        try {
            // Lógica de negocio: validaciones para eliminación
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                throw new ValidationError('ID de donante inválido');
            }
            
            // Verificar que el donante existe
            const existingDonante = await Donante.findById(id);
            if (!existingDonante) {
                throw new NotFoundError('Donante');
            }
            
            // Aquí podrías agregar validaciones adicionales
            // Por ejemplo, verificar si el donante tiene donaciones asociadas
            // y no permitir la eliminación si las tiene
            
            // Llamada a la capa de datos
            const donanteEliminado = await Donante.delete(id);
            
            ResponseHelper.deleted(res, 'Donante eliminado exitosamente.');
        } catch (error) {
            throw error;
        }
    }

    static async searchByNombre(req, res) {
        try {
            // Lógica de negocio: validación de búsqueda
            const { nombre } = req.query;
            
            if (!nombre || nombre.trim().length < 2) {
                throw new ValidationError('El término de búsqueda debe tener al menos 2 caracteres');
            }
            
            // Llamada a la capa de datos
            const donantes = await Donante.findByNombre(nombre.trim());
            
            // Transformación para presentación
            const formattedDonantes = donantes.map(donante => ({
                id: donante.vdonCodDon,
                nombreCompleto: `${donante.vdonPatern || ''} ${donante.vdonMatern || ''} ${donante.vdonNombre || ''}`.trim(),
                documento: donante.vdonDocide,
                email: donante.vdonEmail,
                telefono: donante.vdonTelCel,
                edad: donante.vdonEdadDo,
                estadoCivil: donante.vdonEstCiv,
                sexo: donante.vdonSexoDn,
                ocupacion: donante.ocupacion,
                lugarNacimiento: donante.lugar_nacimiento
            }));
            
            ResponseHelper.success(res, {
                donantes: formattedDonantes,
                total: formattedDonantes.length,
                termino: nombre.trim()
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DonanteController;