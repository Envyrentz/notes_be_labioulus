const pool = require('../../db/db');
const ApplicationError = require('../../config/errors/ApplicationError');

const getNotepads = async () => {
    try {
        const query = 'SELECT * FROM notes';
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query', 500);
    }
}

const getNotepadById = async (id) => {
    try {
        const query = `SELECT * FROM notes WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query get notepad by id :', 500);
    }
}

const deleteNotepad = async (id) => {
    try {
        const query = `DELETE FROM notes WHERE id=${id}`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new ApplicationError('Error executing query delete notepad by id :', 500);
    }
}

const createNotepad = async (title, note) => {
    try {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const query = `INSERT INTO notes (title,datetime, note) VALUES ('${title}','${date}', '${note}')`;
        const [result] = await pool.query(query);
        const insertedId = result.insertId;
        const selectQuery = `SELECT * FROM notes WHERE id = ?`;
        const [rows] = await pool.query(selectQuery, [insertedId]);
        
        return rows[0];
    } catch (error) {
        throw new ApplicationError('Error executing query create notepad :', 500);
    }
}

const updateNotepad = async (id, title, note) => {
    try {
        const selectQuery = `SELECT * FROM notes WHERE id = ?`;
        const [rows] = await pool.query(selectQuery, [id]);

        if (!rows.length) {
            throw new ApplicationError('Notes not found', 404);
        }
        const existingNotepad = rows[0];
        const updatedTitle = title || existingNotepad.title;
        const updatedDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ') || existingNotepad.datetime;
        const updatedNote = note || existingNotepad.note;

        const updateQuery = `UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?`;
        await pool.query(updateQuery, [updatedTitle, updatedDatetime, updatedNote, id]);

        const [updatedRows] = await pool.query(selectQuery, [id]);
        return updatedRows[0];
    } catch (error) {
        throw new ApplicationError('Error executing query update notepad :', 500);
    }
}

module.exports = {
    getNotepads,
    getNotepadById,
    deleteNotepad,
    createNotepad,
    updateNotepad
}
