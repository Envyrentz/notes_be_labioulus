const mysql = require('mysql2/promise');
require('dotenv').config();
const pool = require('./db');

const createDb = async () => {
    let connection;
    try {
        // Koneksi ke server MySQL tanpa menentukan database
        connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
        });

        // Membuat database baru
        const createDbQuery = `CREATE DATABASE IF NOT EXISTS notes_db;`;
        await connection.query(createDbQuery);
        console.log('Database created or already exists');
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

const createTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS notes (
                id BIGINT auto_increment primary key,
                title TEXT not null,
                datetime DATETIME not null,
                note LONGTEXT not null
            );
        `;
        await pool.query(createTableQuery);
        console.log('Table created or already exists');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        if (pool) {
            await pool.end();
        }
    }
};

const migrate = async () => {
    try {
        await createDb();
        await createTable();
        console.log('Migration successful');
    } catch (error) {
        console.error('Migration failed:', error);
    }
};

migrate();
