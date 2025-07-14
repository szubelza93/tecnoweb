const pool = require('../../shared/config/database');
const bcrypt = require('bcryptjs');

// Roles predefinidos
const ROLES = {
    ADMIN: 'admin',
    MEDICO: 'medico',
    LABORATORIO: 'laboratorio',
    RECEPCION: 'recepcion',
    USUARIO: 'usuario'
};

class Usuario {
    // SOLO ACCESO A DATOS - Sin lógica de negocio
    static async findAll(options = {}) {
        const { page = 1, limit = 10, search, sort = 'DESC' } = options;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                id, name, email, usernick, photo_path, role, created_at, updated_at
            FROM vamusuario
        `;

        const params = [];

        if (search) {
            query += ` WHERE name ILIKE $${params.length + 1} 
                       OR email ILIKE $${params.length + 1} 
                       OR usernick ILIKE $${params.length + 1}`;
            params.push(`%${search}%`);
        }

        query += ` ORDER BY id ${sort} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        const res = await pool.query(query, params);
        return res.rows;
    }

    static async findById(id) {
        const res = await pool.query(`
            SELECT 
                id, name, email, usernick, photo_path, role, created_at, updated_at
            FROM vamusuario
            WHERE id = $1
        `, [id]);
        return res.rows[0];
    }

    static async findByEmail(email) {
        const res = await pool.query(
            'SELECT * FROM vamusuario WHERE email = $1',
            [email]
        );
        return res.rows[0];
    }

    static async findByUsername(usernick) {
        const res = await pool.query(
            'SELECT * FROM vamusuario WHERE usernick = $1',
            [usernick]
        );
        return res.rows[0];
    }

    static async create(data) {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const res = await pool.query(`
            INSERT INTO vamusuario (
                name, email, usernick, password, photo_path, role
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, email, usernick, photo_path, role, created_at, updated_at
        `, [
            data.name, 
            data.email, 
            data.usernick, 
            hashedPassword, 
            data.photo_path || null,
            data.role || ROLES.USUARIO // Default role if not specified
        ]);
        return res.rows[0];
    }

    static async update(id, data) {
        let query = `
            UPDATE vamusuario SET
                name = $1, 
                email = $2, 
                usernick = $3,
                photo_path = $4,
                updated_at = CURRENT_TIMESTAMP
        `;

        const params = [
            data.name, 
            data.email, 
            data.usernick, 
            data.photo_path || null
        ];

        // If role is provided, update it
        if (data.role) {
            query += `, role = $${params.length + 1}`;
            params.push(data.role);
        }

        // If password is provided, hash it and update
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            query += `, password = $${params.length + 1}`;
            params.push(hashedPassword);
        }

        query += ` WHERE id = $${params.length + 1} RETURNING id, name, email, usernick, photo_path, role, created_at, updated_at`;
        params.push(id);

        const res = await pool.query(query, params);
        return res.rows[0];
    }

    static async delete(id) {
        const res = await pool.query(
            'DELETE FROM vamusuario WHERE id = $1 RETURNING id',
            [id]
        );
        return res.rows[0];
    }

    static async count() {
        const res = await pool.query('SELECT COUNT(*) as total FROM vamusuario');
        return parseInt(res.rows[0].total);
    }

    static async validateCredentials(identifier, password) {
        // Get user with password for validation - check if identifier is email or username
        const isEmail = identifier.includes('@');

        const res = await pool.query(
            `SELECT * FROM vamusuario WHERE ${isEmail ? 'email' : 'usernick'} = $1`,
            [identifier]
        );

        const user = res.rows[0];

        if (!user) {
            return null;
        }

        // Compare provided password with stored hash
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return null;
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

// Exportar los roles junto con la clase Usuario
module.exports = { 
    Usuario,
    ROLES
};
