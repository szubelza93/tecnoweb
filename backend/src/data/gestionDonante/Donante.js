const pool = require('../../shared/config/database');

class Donante {
    // SOLO ACCESO A DATOS - Sin lógica de negocio
    static async findAll(options = {}) {
        const { page = 1, limit = 10, search, sort = 'DESC' } = options;
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT 
                d.*,
                td.vtidDescr as tipo_documento,
                o.vocudescri as ocupacion,
                gi.vgraDescrn as grado_instruccion,
                ln.vlugCiudad as lugar_nacimiento,
                cd.vcluDescri as club_donantes,
                zd.vzonDescr as zona_direccion
            FROM vamDonante d
            LEFT JOIN vamTipoDid td ON d.vtidCodTid = td.vtidCodTid
            LEFT JOIN vamOcupaci o ON d.vocuCodOcu = o.vocuCodOcu
            LEFT JOIN vamGradIns gi ON d.vgraCodGra = gi.vgraCodGra
            LEFT JOIN vamLugNaci ln ON d.vlugCodLug = ln.vlugCodLug
            LEFT JOIN vamClubDon cd ON d.vcluCodClu = cd.vcluCodClu
            LEFT JOIN vamZonaDir zd ON d.vzonCodZon = zd.vzonCodZon
        `;
        
        const params = [];
        
        if (search) {
            query += ` WHERE d.vdonNombre ILIKE $${params.length + 1} 
                       OR d.vdonPatern ILIKE $${params.length + 1} 
                       OR d.vdonMatern ILIKE $${params.length + 1}`;
            params.push(`%${search}%`);
        }
        
        query += ` ORDER BY d.vdonCodDon ${sort} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);
        
        const res = await pool.query(query, params);
        return res.rows;
    }

    static async findById(id) {
        const res = await pool.query(`
            SELECT 
                d.*,
                td.vtidDescr as tipo_documento,
                o.vocudescri as ocupacion,
                gi.vgraDescrn as grado_instruccion,
                ln.vlugCiudad as lugar_nacimiento,
                cd.vcluDescri as club_donantes,
                zd.vzonDescr as zona_direccion
            FROM vamDonante d
            LEFT JOIN vamTipoDid td ON d.vtidCodTid = td.vtidCodTid
            LEFT JOIN vamOcupaci o ON d.vocuCodOcu = o.vocuCodOcu
            LEFT JOIN vamGradIns gi ON d.vgraCodGra = gi.vgraCodGra
            LEFT JOIN vamLugNaci ln ON d.vlugCodLug = ln.vlugCodLug
            LEFT JOIN vamClubDon cd ON d.vcluCodClu = cd.vcluCodClu
            LEFT JOIN vamZonaDir zd ON d.vzonCodZon = zd.vzonCodZon
            WHERE d.vdonCodDon = $1
        `, [id]);
        return res.rows[0];
    }

    static async findByDocument(document) {
        const res = await pool.query(
            'SELECT vdonCodDon FROM vamDonante WHERE vdonDocide = $1',
            [document]
        );
        return res.rows[0];
    }

    static async findByEmail(email) {
        const res = await pool.query(
            'SELECT vdonCodDon FROM vamDonante WHERE vdonEmail = $1',
            [email]
        );
        return res.rows[0];
    }

    static async generateUniqueCode() {
        const res = await pool.query(
            'SELECT COALESCE(MAX(vdonCodDon), 0) + 1 as next_code FROM vamDonante'
        );
        return res.rows[0].next_code;
    }

    static async create(data) {
        const params = [
            data.vdonCodDon, data.vdonPatern, data.vdonMatern, data.vdonNombre, data.vzonCodZon,
            data.vdonDirecc, data.vdonDesDir, data.vtidCodTid, data.vdonDocide, data.vdonFecNac,
            data.vdonEdadDo, data.vdonEstCiv, data.vdonSexoDn, data.vdonTelDom, data.vdonTelOff, data.vdonTelCel,
            data.vdonEmail, data.vdonTrabaj, data.vdonDirTra, data.vdonCarneT, data.vocuCodOcu,
            data.vgraCodGra, data.vlugCodLug, data.vcluCodClu, data.vresCodRes, data.vdonSwCita
        ];
        
        console.log('=== PARÁMETROS PARA LA CONSULTA SQL ===');
        console.log('Parámetros:', params);
        
        const res = await pool.query(`
            INSERT INTO vamDonante (
                vdonCodDon, vdonPatern, vdonMatern, vdonNombre, vzonCodZon,
                vdonDirecc, vdonDesDir, vtidCodTid, vdonDocide, vdonFecNac,
                vdonEdadDo, vdonEstCiv, vdonSexoDn, vdonTelDom, vdonTelOff, vdonTelCel,
                vdonEmail, vdonTrabaj, vdonDirTra, vdonCarneT, vocuCodOcu,
                vgraCodGra, vlugCodLug, vcluCodClu, vresCodRes, vdonSwCita
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
            RETURNING *
        `, params);
        return res.rows[0];
    }

    static async update(id, data) {
        console.log('=== MODELO UPDATE - DATOS RECIBIDOS ===');
        console.log('ID:', id);
        console.log('Datos:', data);
        
        // Preparar parámetros con valores por defecto para campos faltantes
        const params = [
            data.vdonPatern || null, 
            data.vdonMatern || null, 
            data.vdonNombre || null, 
            data.vzonCodZon || null,
            data.vdonDirecc || null, 
            data.vdonDesDir || null, 
            data.vtidCodTid || null, 
            data.vdonDocide || null, 
            data.vdonFecNac || null,
            data.vdonEdadDo || null, 
            data.vdonEstCiv || null, 
            data.vdonSexoDn || null, 
            data.vdonTelDom || null, 
            data.vdonTelOff || null, 
            data.vdonTelCel || null,
            data.vdonEmail || null, 
            data.vdonTrabaj || null, 
            data.vdonDirTra || null, 
            data.vdonCarneT || 0, 
            data.vocuCodOcu || null,
            data.vgraCodGra || null, 
            data.vlugCodLug || null, 
            data.vcluCodClu || null, 
            data.vresCodRes || null, 
            data.vdonSwCita || 0, 
            id
        ];
        
        console.log('=== PARÁMETROS PARA UPDATE ===');
        console.log('Parámetros:', params);
        
        const res = await pool.query(`
            UPDATE vamDonante SET
                vdonPatern = $1, vdonMatern = $2, vdonNombre = $3, vzonCodZon = $4,
                vdonDirecc = $5, vdonDesDir = $6, vtidCodTid = $7, vdonDocide = $8, vdonFecNac = $9,
                vdonEdadDo = $10, vdonEstCiv = $11, vdonSexoDn = $12, vdonTelDom = $13, vdonTelOff = $14, vdonTelCel = $15,
                vdonEmail = $16, vdonTrabaj = $17, vdonDirTra = $18, vdonCarneT = $19, vocuCodOcu = $20,
                vgraCodGra = $21, vlugCodLug = $22, vcluCodClu = $23, vresCodRes = $24, vdonSwCita = $25,
                updated_at = CURRENT_TIMESTAMP
            WHERE vdonCodDon = $26
            RETURNING *
        `, params);
        
        console.log('=== RESULTADO UPDATE ===');
        console.log('Resultado:', res.rows[0]);
        
        return res.rows[0];
    }

    static async delete(id) {
        const res = await pool.query(
            'DELETE FROM vamDonante WHERE vdonCodDon = $1 RETURNING *',
            [id]
        );
        return res.rows[0];
    }

    static async count() {
        const res = await pool.query('SELECT COUNT(*) as total FROM vamDonante');
        return parseInt(res.rows[0].total);
    }

    static async findByNombre(nombre) {
        const res = await pool.query(`
            SELECT 
                d.*,
                td.vtidDescr as tipo_documento,
                o.vocudescri as ocupacion,
                gi.vgraDescrn as grado_instruccion,
                ln.vlugCiudad as lugar_nacimiento,
                cd.vcluDescri as club_donantes,
                zd.vzonDescr as zona_direccion
            FROM vamDonante d
            LEFT JOIN vamTipoDid td ON d.vtidCodTid = td.vtidCodTid
            LEFT JOIN vamOcupaci o ON d.vocuCodOcu = o.vocuCodOcu
            LEFT JOIN vamGradIns gi ON d.vgraCodGra = gi.vgraCodGra
            LEFT JOIN vamLugNaci ln ON d.vlugCodLug = ln.vlugCodLug
            LEFT JOIN vamClubDon cd ON d.vcluCodClu = cd.vcluCodClu
            LEFT JOIN vamZonaDir zd ON d.vzonCodZon = zd.vzonCodZon
            WHERE d.vdonNombre ILIKE $1 OR d.vdonPatern ILIKE $1 OR d.vdonMatern ILIKE $1
            ORDER BY d.vdonCodDon DESC
        `, [`%${nombre}%`]);
        return res.rows;
    }
}

module.exports = Donante; 