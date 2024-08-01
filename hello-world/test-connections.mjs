import pg from 'pg';
const { Pool } = pg;

const connectionString = 'postgresql://root:dhHjLmNnlj2jJALhuQTN0LmR7GtDSrab@dpg-cq7i09bv2p9s73c4u7m0-a.virginia-postgres.render.com/arquiteturadatabase';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    client.release();
  }
}

testConnection();
