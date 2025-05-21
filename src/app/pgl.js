'use client';

import { PGliteWorker } from '@electric-sql/pglite/worker'

const db = new PGliteWorker(
  new Worker(new URL('./my-pglite-worker.js', import.meta.url), {
    type: 'module',
  }),
)

await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        address TEXT
    )
`)

export async function registerPatient(patientData) {
    console.log(patientData)
    const formData = patientData;
    try {
            const result = await db.query(
                `INSERT INTO patients (firstname, lastname, dob, gender, email, phone, address)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
                [
                    patientData.firstname,
                    patientData.lastname,
                    patientData.dob,
                    patientData.gender,
                    patientData.email,
                    patientData.phone,
                    patientData.address
                ]
            );
        return result.rows[0].id;
    } catch (err) {
        console.error("registering patient error:", err);
        throw err;
    }
}

export async function getAllPatients() {
    try {
        const result = await db.query('SELECT * FROM patients ORDER BY lastname, firstname');
        console.log(result)
        return result;
    } catch (err) {
        console.error("loading patients error:", err);
        throw err;
    }
}