import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: 'postgresql://root:dhHjLmNnlj2jJALhuQTN0LmR7GtDSrab@dpg-cq7i09bv2p9s73c4u7m0-a.virginia-postgres.render.com/arquiteturadatabase',
    ssl: {
        rejectUnauthorized: false,
    },
});

export default async function upsertProduct(data) {

    console.log('Data received in upsertProduct:', data); // Log dos dados recebidos

    const client = await pool.connect();
    try {
        // Verifica se os dados necessários estão presentes
        const { companyName, cnpj, stateRegistration, address, products, additionalInformation } = data;

        console.log('companyName');
        console.log(companyName);

        if (!address) {
            throw new Error('Address data is missing');
        }

        const { street, number, neighborhood, zipCode, city, state, lat, lng } = address;

        // Inserir ou atualizar supermercado
        const supermarketQuery = `
            INSERT INTO supermarkets (company_name, cnpj, state_registration, address_street, address_number, address_neighborhood, address_zip_code, address_city, address_state, address_lat, address_lng)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (cnpj) DO UPDATE
            SET company_name = EXCLUDED.company_name,
                state_registration = EXCLUDED.state_registration,
                address_street = EXCLUDED.address_street,
                address_number = EXCLUDED.address_number,
                address_neighborhood = EXCLUDED.address_neighborhood,
                address_zip_code = EXCLUDED.address_zip_code,
                address_city = EXCLUDED.address_city,
                address_state = EXCLUDED.address_state,
                address_lat = EXCLUDED.address_lat,
                address_lng = EXCLUDED.address_lng
            RETURNING id;
        `;

        const supermarketValues = [
            companyName,
            cnpj,
            stateRegistration,
            street,
            number,
            neighborhood,
            zipCode,
            city,
            state,
            lat,
            lng
        ];

        const res = await client.query(supermarketQuery, supermarketValues);
        const supermarketId = res.rows[0].id;

        for (const product of products) {
            if (!product.name) {
                throw new Error(`Product name is missing for code ${product.code}`);
            }

            const productQuery = `
                INSERT INTO products (code, name, unit, supermarket_id)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (code, supermarket_id) DO UPDATE
                SET name = EXCLUDED.name,
                    unit = EXCLUDED.unit,
                    last_updated = now()
                RETURNING id;
            `;

            const productValues = [
                product.code,
                product.name,
                product.unit,
                supermarketId
            ];

            const productRes = await client.query(productQuery, productValues);
            const productId = productRes.rows[0].id;

            // Inserir preço do produto na tabela product_prices
            const priceQuery = `
                INSERT INTO productprices (product_id, price, date, code)
                VALUES ($1, $2, now(), $3);
            `;

            const priceValues = [
                productId,
                product.price,
                product.code
            ];

            await client.query(priceQuery, priceValues);
        }

        // Inserir informações adicionais
        const additionalInfoQuery = `
            INSERT INTO additionalinformation (supermarket_id, total_items, total_value, value_paid, payment_method, access_key, other_information, date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;

        const additionalInfoValues = [
            supermarketId,
            additionalInformation.totalItems,
            additionalInformation.totalValue,
            additionalInformation.valuePaid,
            additionalInformation.paymentMethod,
            additionalInformation.accessKey,
            additionalInformation.otherInformation,
            additionalInformation.date
        ];

        await client.query(additionalInfoQuery, additionalInfoValues);
    } catch (error) {
        console.error('Error processing data:', error);
        throw new Error(`Error processing data: ${error.message}`);
    } finally {
        client.release();
    }
}
