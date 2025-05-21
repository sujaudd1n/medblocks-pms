import { useState, useEffect } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import Page from "./register/Page";
import PatientTable from "./List";
import Link from "next/link";


export default function HomePage() {
    const [patients, setPatients] = useState([]);
    const db = usePGlite();

    const loadPatients = async () => {
        try {
            const data = await getAllPatients(db);
            setPatients(data.rows);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {

        loadPatients()

        console.log(db, db.live)
        
    }, [])

    return (
        <>
            <h1 className="">Patient Management System</h1>
            <Link href="/register">Register</Link>
            <Page callback={loadPatients} />
            {/* <PatientTable patients={patients} callback={loadPatients} /> */}
            <PatientTable key='pgliteItems' />
        </>
    )
}

export async function registerPatient(db, patientData) {
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

export async function getAllPatients(db) {
    try {
        const result = await db.query('SELECT * FROM patients ORDER BY lastname, firstname');
        console.log(result)
        return result;
    } catch (err) {
        console.error("loading patients error:", err);
        throw err;
    }
}

export async function deletePatient(db, id) {
    try {
        const result = await db.query('DELETE FROM patients where id = $1', [id]);
        console.log(result)
        return result;
    } catch (err) {
        console.error("delete patients error:", err);
        throw err;
    }
}