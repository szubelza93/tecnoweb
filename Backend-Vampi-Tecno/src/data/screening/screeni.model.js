import { pool } from '../../shared/config/db.js';

export class ScreeniModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vamScreeni');
        return rows;
    }

    static async getById(vscrNroScr, vcenCodCen) {
        const { rows } = await pool.query(
            'SELECT * FROM vamScreeni WHERE vscrNroScr = $1 AND vcenCodCen = $2',
            [vscrNroScr, vcenCodCen]
        );
        return rows[0];
    }

    static async create(screeni) {
        const {
            vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt,
            vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
            vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent, vscrAparie,
            vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed, vscrResMed, vscrResScr,
            vscrResTra, vscrFecMed, vscrFecLab
        } = screeni;

        const { rows } = await pool.query(
            `INSERT INTO vamScreeni (
                vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt,
                vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
                vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent, vscrAparie,
                vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed, vscrResMed, vscrResScr,
                vscrResTra, vscrFecMed, vscrFecLab
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
                $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31
            ) RETURNING *`,
            [
                vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt,
                vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
                vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent, vscrAparie,
                vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed, vscrResMed, vscrResScr,
                vscrResTra, vscrFecMed, vscrFecLab
            ]
        );

        return rows[0];
    }

    static async update(vscrNroScr, vcenCodCen, screeni) {
        const {
            vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt,
            vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
            vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent, vscrAparie,
            vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed, vscrResMed, vscrResScr,
            vscrResTra, vscrFecMed, vscrFecLab
        } = screeni;

        const { rows } = await pool.query(
            `UPDATE vamScreeni SET
                vdonCodDon = $1, vtdnCodTdn = $2, vscrDonAnt = $3, vscrDonBsr = $4, vscrFecAnt = $5,
                vscrPesodo = $6, vscrTemped = $7, vscrPulsod = $8, vscrPreMax = $9, vscrPreMin = $10,
                vscrFechas = $11, vscrGhemog = $12, vscrHemato = $13, vscrSulcob = $14, vgrsCodGrs = $15,
                vscrResDud = $16, vscrGrsCon = $17, vscrComent = $18, vscrAparie = $19, vscrInsBra = $20,
                vscrActivg = $21, vscrPreSer = $22, vscrNroEti = $23, vscrLabMed = $24, vscrResMed = $25,
                vscrResScr = $26, vscrResTra = $27, vscrFecMed = $28, vscrFecLab = $29
            WHERE vscrNroScr = $30 AND vcenCodCen = $31
            RETURNING *`,
            [
                vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt,
                vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
                vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent, vscrAparie,
                vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed, vscrResMed, vscrResScr,
                vscrResTra, vscrFecMed, vscrFecLab, vscrNroScr, vcenCodCen
            ]
        );

        return rows[0];
    }

    static async delete(vscrNroScr, vcenCodCen) {
        const { rows } = await pool.query(
            'DELETE FROM vamScreeni WHERE vscrNroScr = $1 AND vcenCodCen = $2 RETURNING *',
            [vscrNroScr, vcenCodCen]
        );
        return rows[0];
    }
}
