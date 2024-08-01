import upsertProduct from './src/upsert-product.mjs';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: 'postgresql://root:dhHjLmNnlj2jJALhuQTN0LmR7GtDSrab@dpg-cq7i09bv2p9s73c4u7m0-a.virginia-postgres.render.com/arquiteturadatabase',
    ssl: {
        rejectUnauthorized: false
    }
});

export const lambdaHandler = async (event) => {
    let client;
    try {
        let messageBody;
        const record = event.Records[0];
        if (record) {
            messageBody = JSON.parse(record.body).Message;
        }
        client = await pool.connect();
        await upsertProduct(client, JSON.parse(messageBody));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Dados processados com sucesso!'
            }),
        };
    } catch (err) {
        console.error('Erro ao processar dados:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro ao processar dados',
                error: err.message
            }),
        };
    } finally {
        if (client) {
            client.release();
        }
    }
};