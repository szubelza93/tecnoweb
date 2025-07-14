const { Usuario, ROLES } = require('../../data/gestionUsuario');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError, ValidationError } = require('../../shared/middlewares/errorHandler');

class UsuarioController {
    // LÓGICA DE NEGOCIO - Validaciones, reglas, transformaciones

    // Upload profile image
    static async uploadProfileImage(req, res) {
        try {
            if (!req.file) {
                throw new ValidationError('No se ha proporcionado ninguna imagen');
            }

            // Get the user ID from the request parameters
            const { id } = req.params;

            if (!id || isNaN(id)) {
                throw new ValidationError('ID de usuario inválido');
            }

            // Verify that the user exists
            const existingUsuario = await Usuario.findById(id);
            if (!existingUsuario) {
                throw new NotFoundError('Usuario');
            }

            // Generate the relative path to the uploaded file
            const relativePath = `/uploads/profiles/${req.file.filename}`;

            // Update the user's photo_path in the database while preserving other fields
            // Create an update object with all the required fields from the existing user
            const updateData = {
                name: existingUsuario.name,
                email: existingUsuario.email,
                usernick: existingUsuario.usernick,
                photo_path: relativePath
            };

            const usuarioActualizado = await Usuario.update(id, updateData);
            // Transformación para presentación
            const formattedUsuario = {
                id: usuarioActualizado.id,
                nombre: usuarioActualizado.name,
                email: usuarioActualizado.email,
                username: usuarioActualizado.usernick,
                photopath: usuarioActualizado.photo_path,
                role: usuarioActualizado.role || ROLES.USUARIO,
                createdAt: usuarioActualizado.created_at,
                updatedAt: usuarioActualizado.updated_at
            };

            ResponseHelper.updated(res, formattedUsuario, 'Imagen de perfil actualizada exitosamente.');
        } catch (error) {
            // Log the error for debugging
            console.error('Error en uploadProfileImage:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al actualizar imagen de perfil: ${error.message}`);
        }
    }
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
            const usuarios = await Usuario.findAll({
                page: parseInt(page),
                limit: parseInt(limit),
                search,
                sort: sort.toUpperCase()
            });
            console.log(usuarios);

            // Transformación de datos para presentación
            const formattedUsuarios = usuarios.map(usuario => ({
                id: usuario.id,
                nombre: usuario.name,
                email: usuario.email,
                username: usuario.usernick,
                photopath: usuario.photo_path,
                role: usuario.role || ROLES.USUARIO,
                createdAt: usuario.created_at,
                updatedAt: usuario.updated_at
            }));

            // Obtener total de registros para paginación
            const total = await Usuario.count();
            const totalPages = Math.ceil(total / parseInt(limit));

            // Respuesta con información de paginación
            ResponseHelper.success(res, {
                usuarios: formattedUsuarios,
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
            // Log the error for debugging
            console.error('Error en getAll:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    static async getById(req, res) {
        try {
            // Lógica de negocio: validación de ID
            const { id } = req.params;

            if (!id || isNaN(id)) {
                throw new ValidationError('ID de usuario inválido');
            }

            // Llamada a la capa de datos
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                throw new NotFoundError('Usuario');
            }

            // Transformación para presentación
            const formattedUsuario = {
                id: usuario.id,
                nombre: usuario.name,
                email: usuario.email,
                username: usuario.usernick,
                photopath: usuario.photo_path,
                role: usuario.role || ROLES.USUARIO,
                createdAt: usuario.created_at,
                updatedAt: usuario.updated_at
            };

            ResponseHelper.success(res, formattedUsuario);
        } catch (error) {
            // Log the error for debugging
            console.error('Error en getById:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    static async create(req, res) {
        try {
            // Lógica de negocio: validaciones complejas
            const data = req.body;

            // Validar campos obligatorios
            if (!data.name) {
                throw new ValidationError('El nombre del usuario es obligatorio');
            }

            if (!data.email) {
                throw new ValidationError('El email del usuario es obligatorio');
            }

            if (!data.usernick) {
                throw new ValidationError('El nombre de usuario es obligatorio');
            }

            if (!data.password) {
                throw new ValidationError('La contraseña es obligatoria');
            }

            // Validar email único
            const existingEmail = await Usuario.findByEmail(data.email);
            if (existingEmail) {
                throw new ValidationError('Ya existe un usuario con este email');
            }

            // Validar username único
            const existingUsername = await Usuario.findByUsername(data.usernick);
            if (existingUsername) {
                throw new ValidationError('Ya existe un usuario con este nombre de usuario');
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                throw new ValidationError('El formato del email es inválido');
            }

            // Validar complejidad de contraseña
            if (data.password.length < 6) {
                throw new ValidationError('La contraseña debe tener al menos 6 caracteres');
            }

            // Llamada a la capa de datos
            const nuevoUsuario = await Usuario.create(data);

            // Transformación para presentación
            const formattedUsuario = {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.name,
                email: nuevoUsuario.email,
                username: nuevoUsuario.usernick,
                photopath: nuevoUsuario.photo_path,
                role: nuevoUsuario.role || ROLES.USUARIO,
                createdAt: nuevoUsuario.created_at,
                updatedAt: nuevoUsuario.updated_at
            };

            ResponseHelper.created(res, formattedUsuario, 'Usuario creado exitosamente.');
        } catch (error) {
            // Log the error for debugging
            console.error('Error en create:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    static async update(req, res) {
        try {
            // Lógica de negocio: validaciones para actualización
            const { id } = req.params;
            const data = req.body;

            if (!id || isNaN(id)) {
                throw new ValidationError('ID de usuario inválido');
            }

            // Verificar que el usuario existe
            const existingUsuario = await Usuario.findById(id);
            if (!existingUsuario) {
                throw new NotFoundError('Usuario');
            }

            // Validar email único si se está actualizando
            if (data.email && data.email !== existingUsuario.email) {
                const existingEmail = await Usuario.findByEmail(data.email);
                if (existingEmail) {
                    throw new ValidationError('Ya existe un usuario con este email');
                }

                // Validar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    throw new ValidationError('El formato del email es inválido');
                }
            }

            // Validar username único si se está actualizando
            if (data.usernick && data.usernick !== existingUsuario.usernick) {
                const existingUsername = await Usuario.findByUsername(data.usernick);
                if (existingUsername) {
                    throw new ValidationError('Ya existe un usuario con este nombre de usuario');
                }
            }

            // Validar complejidad de contraseña si se está actualizando
            if (data.password && data.password.length < 6) {
                throw new ValidationError('La contraseña debe tener al menos 6 caracteres');
            }

            // Llamada a la capa de datos
            const usuarioActualizado = await Usuario.update(id, data);

            // Transformación para presentación
            const formattedUsuario = {
                id: usuarioActualizado.id,
                nombre: usuarioActualizado.name,
                email: usuarioActualizado.email,
                username: usuarioActualizado.usernick,
                photopath: usuarioActualizado.photo_path,
                role: usuarioActualizado.role || ROLES.USUARIO,
                createdAt: usuarioActualizado.created_at,
                updatedAt: usuarioActualizado.updated_at
            };

            ResponseHelper.updated(res, formattedUsuario, 'Usuario actualizado exitosamente.');
        } catch (error) {
            // Log the error for debugging
            console.error('Error en update:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    static async delete(req, res) {
        try {
            // Lógica de negocio: validaciones para eliminación
            const { id } = req.params;

            if (!id || isNaN(id)) {
                throw new ValidationError('ID de usuario inválido');
            }

            // Verificar que el usuario existe
            const existingUsuario = await Usuario.findById(id);
            if (!existingUsuario) {
                throw new NotFoundError('Usuario');
            }

            // Llamada a la capa de datos
            await Usuario.delete(id);

            ResponseHelper.deleted(res, 'Usuario eliminado exitosamente.');
        } catch (error) {
            // Log the error for debugging
            console.error('Error en delete:', error);

            // If it's already a known error type, rethrow it
            if (error instanceof ValidationError || error instanceof NotFoundError) {
                throw error;
            }

            // Otherwise, wrap it in a generic error
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}

module.exports = UsuarioController;
