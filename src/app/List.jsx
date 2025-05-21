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

import { useState, useEffect } from 'react';
import { getAllPatients } from './pgl';

export default function PatientTable() {
    const [patients, setPatients] = useState([]);

    const loadPatients = async () => {
        try {
            const data = await getAllPatients();
            setPatients(data.rows);
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        loadPatients()
    }, [])

    return (
        <div>

            {patients.length > 0 ? (
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map(patient => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.firstname}</TableCell>
                                <TableCell>{patient.lastname}</TableCell>
                                <TableCell>{patient.dob.toString()}</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                                <TableCell>{patient.email || ''}</TableCell>
                                <TableCell>{patient.phone || ''}</TableCell>
                                <TableCell>{patient.address || ''}</TableCell>
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