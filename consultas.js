const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "skatepark",
    port: 5432,
});

async function getUsuarios() {
    const result = await pool.query('SELECT * FROM skaters');
    return result.rows;
}

async function nuevoUsuario(email, nombre, password, experiencia, especialidad, foto) {
    const result = await pool.query(
        text, 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values, [email, nombre, password, experiencia, especialidad, foto]

    );
    const usuario = result.rows[0];
    return usuario;
}



async function eliminarUsuario(id) {
    const consulta = {
        text: `DELETE FROM skaters WHERE id = $1`,
        values: [id],
    };

    try {
        const result = await pool.query(consulta);

        return result.rows;
    } catch (error) {
        return error
    }
}

async function editarUsuario(id, usuario) {
    const values = Object.values(usuario);
    values.push(id);
    const consulta = {
        text: `UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5`,
        values: [id, usuario]
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        return error;
    }
}




module.exports = { nuevoUsuario, getUsuarios, editarUsuario, eliminarUsuario }