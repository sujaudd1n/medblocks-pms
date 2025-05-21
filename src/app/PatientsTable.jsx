'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { usePGlite } from "@electric-sql/pglite-react";

export default function PatientsTable() {
    const db = usePGlite();
    const patients = useLiveQuery(`
        SELECT * FROM patients
        `,
    )
    async function deletePatient(id) {
        try {
            const result = await db.query('DELETE FROM patients where id = $1', [id]);
            return result;
        } catch (err) {
            console.error("delete patients error:", err);
            throw err;
        }
    }

    if (!patients || patients.rows.length === 0)
        return <>Loading patients. Please wait.</>

    return (
        <div>
            <h2 className="text-xl text-center mb-5">Patients List</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>DOB</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.rows.map(patient => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.id}</TableCell>
                            <TableCell>{patient.firstname}</TableCell>
                            <TableCell>{patient.lastname}</TableCell>
                            <TableCell>{patient.dob.toString()}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.email || ''}</TableCell>
                            <TableCell>{patient.phone || ''}</TableCell>
                            <TableCell>{patient.address || ''}</TableCell>
                            <TableCell>
                                <Button onClick={() => deletePatient(patient.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}