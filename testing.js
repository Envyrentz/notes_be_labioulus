const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loomyl',
});

const testing = async () => {
    try {
        const query = 'SELECT * FROM testing';
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
};

// Menggunakan fungsi testing dan mencetak hasilnya
const runTest = async () => {
    try {
        const result = await testing();
        console.log(result);
    } catch (error) {
        console.error('Error during testing', error);
    }
};

runTest();