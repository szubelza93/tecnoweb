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
                edad: donante.vdonedaddo,
                estadoCivil: donante.vdonestciv,
                sexo: donante.vdonsexodn,
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
                informacionPersonal: {
                    fechaNacimiento: donante.vdonfecnac,
                    edad: donante.vdonedaddo,
                    estadoCivil: donante.vdonestciv,
                    sexo: donante.vdonsexodn,
                    tipoDocumento: donante.tipo_documento
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
                    direccionTrabajo: donante.vdondirtra,
                    gradoInstruccion: donante.grado_instruccion
                },
                informacionAdicional: {
                    lugarNacimiento: donante.lugar_nacimiento,
                    clubDonantes: donante.club_donantes,
                    zonaDireccion: donante.zona_direccion,
                    carnetTrabajo: donante.vdoncarnet,
                    cita: donante.vdonswcita
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
            
            console.log('=== DATOS DEL DONANTE DESDE LA BASE DE DATOS ===');
            console.log('Datos completos:', donante);
            console.log('Campos disponibles:', Object.keys(donante));
            
            // Devolver datos en formato plano para el frontend
            const formattedDonante = {
                vdonCodDon: donante.vdoncoddon,
                vdonPatern: donante.vdonpatern,
                vdonMatern: donante.vdonmatern,
                vdonNombre: donante.vdonnombre,
                vzonCodZon: donante.vzoncodzon,
                vdonDirecc: donante.vdondirecc,
                vdonDesDir: donante.vdondesdir,
                vtidCodTid: donante.vtidcodtid,
                vdonDocide: donante.vdondocide,
                vdonFecNac: donante.vdonfecnac,
                vdonEdadDo: donante.vdonedaddo,
                vdonEstCiv: donante.vdonestciv,
                vdonSexoDn: donante.vdonsexodn,
                vdonTelOfi: donante.vdonteloff,
                vdonTelCel: donante.vdontelcel,
                vdonEmail: donante.vdonemail,
                vdonEmail2: donante.vdonemail2,
                vdonDirTra: donante.vdondirtra,
                vdonCarneT: donante.vdoncarnet,
                vocuCodOcu: donante.vocucodocu,
                vgraCodGra: donante.vgracodgra,
                vlugCodLug: donante.vlugcodlug,
                vcluCodClu: donante.vclucodclu,
                vresCodRes: donante.vrescodres,
                vdonSwCita: donante.vdonswcita,
                created_at: donante.created_at,
                updated_at: donante.updated_at,
                // Incluir datos relacionados si están disponibles
                tipo_documento: donante.tipo_documento,
                ocupacion: donante.ocupacion,
                grado_instruccion: donante.grado_instruccion,
                lugar_nacimiento: donante.lugar_nacimiento,
                club_donantes: donante.club_donantes,
                zona_direccion: donante.zona_direccion
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
            
            console.log('=== DATOS RECIBIDOS EN CREATE ===');
            console.log('Datos originales:', data);
            
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
            
            // Convertir campos de tipo BIT
            // vdonCarneT: convertir string a bit (0 o 1)
            if (data.vdonCarneT !== undefined && data.vdonCarneT !== null) {
                data.vdonCarneT = data.vdonCarneT ? 1 : 0;
            }
            
            // vdonSwCita: convertir boolean a bit (0 o 1)
            if (data.vdonSwCita !== undefined && data.vdonSwCita !== null) {
                data.vdonSwCita = data.vdonSwCita ? 1 : 0;
            }
            
            // Convertir campos numéricos vacíos a NULL
            if (data.vresCodRes === '' || data.vresCodRes === undefined || data.vresCodRes === null) {
                data.vresCodRes = null;
            } else {
                data.vresCodRes = parseInt(data.vresCodRes);
            }
            
            // Convertir otros campos numéricos
            if (data.vcluCodClu === '' || data.vcluCodClu === undefined || data.vcluCodClu === null) {
                data.vcluCodClu = null;
            } else {
                data.vcluCodClu = parseInt(data.vcluCodClu);
            }
            
            // Manejar campos opcionales que pueden ser undefined
            if (data.vdonTelDom === undefined || data.vdonTelDom === null) {
                data.vdonTelDom = null;
            }
            
            if (data.vdonTelOff === undefined || data.vdonTelOff === null) {
                data.vdonTelOff = null;
            }
            
            if (data.vdonTrabaj === undefined || data.vdonTrabaj === null) {
                data.vdonTrabaj = null;
            }
            
            // Truncar teléfonos a 8 dígitos si son más largos
            if (data.vdonTelCel && data.vdonTelCel.length > 8) {
                data.vdonTelCel = data.vdonTelCel.substring(0, 8);
            }
            
            if (data.vdonTelOff && data.vdonTelOff.length > 8) {
                data.vdonTelOff = data.vdonTelOff.substring(0, 8);
            }
            
            console.log('=== DATOS PROCESADOS ANTES DE CREAR ===');
            console.log('Datos finales:', data);
            
            // Llamada a la capa de datos
            const nuevoDonante = await Donante.create(data);
            
            // Devolver datos en formato plano para el frontend
            const formattedDonante = {
                vdonCodDon: nuevoDonante.vdoncoddon,
                vdonPatern: nuevoDonante.vdonpatern,
                vdonMatern: nuevoDonante.vdonmatern,
                vdonNombre: nuevoDonante.vdonnombre,
                vzonCodZon: nuevoDonante.vzoncodzon,
                vdonDirecc: nuevoDonante.vdondirecc,
                vdonDesDir: nuevoDonante.vdondesdir,
                vtidCodTid: nuevoDonante.vtidcodtid,
                vdonDocide: nuevoDonante.vdondocide,
                vdonFecNac: nuevoDonante.vdonfecnac,
                vdonEdadDo: nuevoDonante.vdonedaddo,
                vdonEstCiv: nuevoDonante.vdonestciv,
                vdonSexoDn: nuevoDonante.vdonsexodn,
                vdonTelOfi: nuevoDonante.vdonteloff,
                vdonTelCel: nuevoDonante.vdontelcel,
                vdonEmail: nuevoDonante.vdonemail,
                vdonEmail2: nuevoDonante.vdonemail2,
                vdonDirTra: nuevoDonante.vdondirtra,
                vdonCarneT: nuevoDonante.vdoncarnet,
                vocuCodOcu: nuevoDonante.vocucodocu,
                vgraCodGra: nuevoDonante.vgracodgra,
                vlugCodLug: nuevoDonante.vlugcodlug,
                vcluCodClu: nuevoDonante.vclucodclu,
                vresCodRes: nuevoDonante.vrescodres,
                vdonSwCita: nuevoDonante.vdonswcita,
                created_at: nuevoDonante.created_at,
                updated_at: nuevoDonante.updated_at,
                // Incluir datos relacionados si están disponibles
                tipo_documento: nuevoDonante.tipo_documento,
                ocupacion: nuevoDonante.ocupacion,
                grado_instruccion: nuevoDonante.grado_instruccion,
                lugar_nacimiento: nuevoDonante.lugar_nacimiento,
                club_donantes: nuevoDonante.club_donantes,
                zona_direccion: nuevoDonante.zona_direccion
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
            
            console.log('=== UPDATE DONANTE ===');
            console.log('ID:', id);
            console.log('Datos recibidos:', data);
            
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
            
            // Convertir campos de tipo BIT
            // vdonCarneT: convertir string a bit (0 o 1)
            if (data.vdonCarneT !== undefined && data.vdonCarneT !== null) {
                data.vdonCarneT = data.vdonCarneT ? 1 : 0;
            }
            
            // vdonSwCita: convertir boolean a bit (0 o 1)
            if (data.vdonSwCita !== undefined && data.vdonSwCita !== null) {
                data.vdonSwCita = data.vdonSwCita ? 1 : 0;
            }
            
            // Convertir campos numéricos vacíos a NULL
            if (data.vresCodRes === '' || data.vresCodRes === undefined || data.vresCodRes === null) {
                data.vresCodRes = null;
            } else {
                data.vresCodRes = parseInt(data.vresCodRes);
            }
            
            // Convertir otros campos numéricos
            if (data.vcluCodClu === '' || data.vcluCodClu === undefined || data.vcluCodClu === null) {
                data.vcluCodClu = null;
            } else {
                data.vcluCodClu = parseInt(data.vcluCodClu);
            }
            
            // Manejar campos opcionales que pueden ser undefined
            if (data.vdonTelDom === undefined || data.vdonTelDom === null) {
                data.vdonTelDom = null;
            }
            
            if (data.vdonTelOff === undefined || data.vdonTelOff === null) {
                data.vdonTelOff = null;
            }
            
            if (data.vdonTrabaj === undefined || data.vdonTrabaj === null) {
                data.vdonTrabaj = null;
            }
            
            // Truncar teléfonos a 8 dígitos si son más largos
            if (data.vdonTelCel && data.vdonTelCel.length > 8) {
                data.vdonTelCel = data.vdonTelCel.substring(0, 8);
            }
            
            if (data.vdonTelOff && data.vdonTelOff.length > 8) {
                data.vdonTelOff = data.vdonTelOff.substring(0, 8);
            }
            
            // Llamada a la capa de datos
            const donanteActualizado = await Donante.update(id, data);
            
            // Devolver datos en formato plano para el frontend
            const formattedDonante = {
                vdonCodDon: donanteActualizado.vdoncoddon,
                vdonPatern: donanteActualizado.vdonpatern,
                vdonMatern: donanteActualizado.vdonmatern,
                vdonNombre: donanteActualizado.vdonnombre,
                vzonCodZon: donanteActualizado.vzoncodzon,
                vdonDirecc: donanteActualizado.vdondirecc,
                vdonDesDir: donanteActualizado.vdondesdir,
                vtidCodTid: donanteActualizado.vtidcodtid,
                vdonDocide: donanteActualizado.vdondocide,
                vdonFecNac: donanteActualizado.vdonfecnac,
                vdonEdadDo: donanteActualizado.vdonedaddo,
                vdonEstCiv: donanteActualizado.vdonestciv,
                vdonSexoDn: donanteActualizado.vdonsexodn,
                vdonTelOfi: donanteActualizado.vdonteloff,
                vdonTelCel: donanteActualizado.vdontelcel,
                vdonEmail: donanteActualizado.vdonemail,
                vdonEmail2: donanteActualizado.vdonemail2,
                vdonDirTra: donanteActualizado.vdondirtra,
                vdonCarneT: donanteActualizado.vdoncarnet,
                vocuCodOcu: donanteActualizado.vocucodocu,
                vgraCodGra: donanteActualizado.vgracodgra,
                vlugCodLug: donanteActualizado.vlugcodlug,
                vcluCodClu: donanteActualizado.vclucodclu,
                vresCodRes: donanteActualizado.vrescodres,
                vdonSwCita: donanteActualizado.vdonswcita,
                created_at: donanteActualizado.created_at,
                updated_at: donanteActualizado.updated_at,
                // Incluir datos relacionados si están disponibles
                tipo_documento: donanteActualizado.tipo_documento,
                ocupacion: donanteActualizado.ocupacion,
                grado_instruccion: donanteActualizado.grado_instruccion,
                lugar_nacimiento: donanteActualizado.lugar_nacimiento,
                club_donantes: donanteActualizado.club_donantes,
                zona_direccion: donanteActualizado.zona_direccion
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

    static async getNextCode(req, res) {
        try {
            // Lógica de negocio: obtener el siguiente código disponible
            const nextCode = await Donante.generateUniqueCode();
            
            ResponseHelper.success(res, {
                nextCode: nextCode
            });
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