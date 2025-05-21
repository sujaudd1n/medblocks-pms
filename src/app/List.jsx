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
import { useState, useEffect } from 'react';
import { deletePatient } from "./HomePage";
import { usePGlite } from "@electric-sql/pglite-react";

export default function PatientTable() {
    const patients = useLiveQuery(`
        SELECT * FROM patients
        `,
    )
    console.log(patients)

    const db = usePGlite();
    async function handleDelete(id) {
        await deletePatient(db, id)
        // callback();
    }
    if (!patients || patients.rows.length === 0)
        return <>nothing</>

    return (
        <div>
            {patients.rows.length > 0 ? (
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
                                    <Button>Edit</Button>
                                    <Button onClick={() => handleDelete(patient.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No patients to display. Click "Load All Patients" to fetch records.</p>
            )}
        </div>
    );
}