const jwt = require('jsonwebtoken');
const { Usuario, ROLES } = require('../../data/gestionUsuario');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { ValidationError } = require('../../shared/middlewares/errorHandler');

class AuthController {
    static async login(req, res) {
        try {
            const { email, username, password } = req.body;

            // Determinar qué identificador usar (email o username)
            const identifier = email || username;

            // Validar campos obligatorios
            if (!identifier) {
                throw new ValidationError('El email o nombre de usuario es obligatorio');
            }

            if (!password) {
                throw new ValidationError('La contraseña es obligatoria');
            }

            // Validar credenciales
            const user = await Usuario.validateCredentials(identifier, password);
            console.log(user);

            if (!user) {
                throw new ValidationError('Credenciales inválidas');
            }

            // Generar tokens
            const accessToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role || ROLES.USUARIO },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const refreshToken = jwt.sign(
                { id: user.id, role: user.role || ROLES.USUARIO },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Transformación para presentación
            const userData = {
                id: user.id,
                nombre: user.name,
                email: user.email,
                username: user.usernick,
                photopath: user.photo_path,
                role: user.role || ROLES.USUARIO,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            };

            ResponseHelper.success(res, {
                user: userData,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Error en el login de usuario:', error);

            // Manejar errores específicos de la base de datos
            if (error.code) {
                switch (error.code) {
                    case '23505': // Unique violation
                        throw new ValidationError(`Error de duplicidad: ${error.detail}`);
                    case '23503': // Foreign key violation
                        throw new ValidationError(`Error de referencia: ${error.detail}`);
                    case '23502': // Not null violation
                        throw new ValidationError(`El campo ${error.column} no puede ser nulo`);
                    default:
                        throw new ValidationError(`Error de base de datos: ${error.message}`);
                }
            }

            // Manejar otros tipos de errores
            throw error;
        }
    }

    static async register(req, res) {
        try {
            const data = req.body;

            // Validar campos obligatorios
            if (!data.name) {
                throw new ValidationError('El nombre es obligatorio');
            }

            if (!data.email) {
                throw new ValidationError('El email es obligatorio');
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

            // Crear usuario
            const newUser = await Usuario.create(data);

            // Generar tokens
            const accessToken = jwt.sign(
                { id: newUser.id, email: newUser.email, role: newUser.role || ROLES.USUARIO },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const refreshToken = jwt.sign(
                { id: newUser.id, role: newUser.role || ROLES.USUARIO },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Transformación para presentación
            const userData = {
                id: newUser.id,
                nombre: newUser.name,
                email: newUser.email,
                username: newUser.usernick,
                photopath: newUser.photo_path,
                role: newUser.role || ROLES.USUARIO,
                createdAt: newUser.created_at,
                updatedAt: newUser.updated_at
            };

            ResponseHelper.created(res, {
                user: userData,
                accessToken,
                refreshToken
            }, 'Usuario registrado exitosamente');
        } catch (error) {
            console.error('Error en el registro de usuario:', error);

            // Manejar errores específicos de la base de datos
            if (error.code) {
                switch (error.code) {
                    case '23505': // Unique violation
                        if (error.detail.includes('email')) {
                            throw new ValidationError('Ya existe un usuario con este email');
                        } else if (error.detail.includes('usernick')) {
                            throw new ValidationError('Ya existe un usuario con este nombre de usuario');
                        } else {
                            throw new ValidationError(`Error de duplicidad: ${error.detail}`);
                        }
                    case '23503': // Foreign key violation
                        throw new ValidationError(`Error de referencia: ${error.detail}`);
                    case '23502': // Not null violation
                        throw new ValidationError(`El campo ${error.column} no puede ser nulo`);
                    default:
                        throw new ValidationError(`Error de base de datos: ${error.message}`);
                }
            }

            // Manejar otros tipos de errores
            throw error;
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                throw new ValidationError('Refresh token es obligatorio');
            }

            try {
                // Verificar refresh token
                const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

                // Obtener usuario
                const user = await Usuario.findById(decoded.id);

                if (!user) {
                    throw new ValidationError('Usuario no encontrado');
                }

                // Generar nuevo access token
                const accessToken = jwt.sign(
                    { id: user.id, email: user.email, role: user.role || ROLES.USUARIO },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                ResponseHelper.success(res, { accessToken });
            } catch (error) {
                throw new ValidationError('Refresh token inválido o expirado');
            }
        } catch (error) {
            console.error('Error en el refresh token:', error);

            // Manejar errores específicos de la base de datos
            if (error.code) {
                switch (error.code) {
                    case '23505': // Unique violation
                        throw new ValidationError(`Error de duplicidad: ${error.detail}`);
                    case '23503': // Foreign key violation
                        throw new ValidationError(`Error de referencia: ${error.detail}`);
                    case '23502': // Not null violation
                        throw new ValidationError(`El campo ${error.column} no puede ser nulo`);
                    default:
                        throw new ValidationError(`Error de base de datos: ${error.message}`);
                }
            }

            // Si ya es un ValidationError, simplemente lo relanzamos
            if (error.name === 'ValidationError') {
                throw error;
            }

            // Manejar otros tipos de errores
            throw new ValidationError(`Error al refrescar el token: ${error.message}`);
        }
    }

    static async getProfile(req, res) {
        try {
            const userId = req.user.id;

            // Obtener usuario
            const user = await Usuario.findById(userId);

            if (!user) {
                throw new ValidationError('Usuario no encontrado');
            }

            // Transformación para presentación
            const userData = {
                id: user.id,
                nombre: user.name,
                email: user.email,
                username: user.usernick,
                photopath: user.photo_path,
                role: user.role || ROLES.USUARIO,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            };

            ResponseHelper.success(res, userData);
        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);

            // Manejar errores específicos de la base de datos
            if (error.code) {
                switch (error.code) {
                    case '23505': // Unique violation
                        throw new ValidationError(`Error de duplicidad: ${error.detail}`);
                    case '23503': // Foreign key violation
                        throw new ValidationError(`Error de referencia: ${error.detail}`);
                    case '23502': // Not null violation
                        throw new ValidationError(`El campo ${error.column} no puede ser nulo`);
                    default:
                        throw new ValidationError(`Error de base de datos: ${error.message}`);
                }
            }

            // Si ya es un ValidationError, simplemente lo relanzamos
            if (error.name === 'ValidationError') {
                throw error;
            }

            // Manejar otros tipos de errores
            throw new ValidationError(`Error al obtener perfil: ${error.message}`);
        }
    }

    static async logout(req, res) {
        try {
            // En un sistema basado en JWT, el logout es principalmente manejado por el cliente
            // eliminando los tokens almacenados. Sin embargo, podemos proporcionar una respuesta
            // exitosa para confirmar la acción.

            // Nota: Para una implementación más segura, se podría mantener una lista negra de tokens
            // en el servidor, pero eso está fuera del alcance de esta implementación básica.

            ResponseHelper.success(res, null, 'Sesión cerrada exitosamente');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);

            // Si ya es un ValidationError, simplemente lo relanzamos
            if (error.name === 'ValidationError') {
                throw error;
            }

            // Manejar otros tipos de errores
            throw new ValidationError(`Error al cerrar sesión: ${error.message}`);
        }
    }
}

module.exports = AuthController;
