require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false,  // Permite la conexión SSL sin verificar el certificado
      }
})


module.exports = pool;
