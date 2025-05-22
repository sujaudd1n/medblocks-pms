'use client';
import { Trash2 } from "lucide-react";
import { Table as TableIcon } from "lucide-react";
import { IdCard } from "lucide-react";

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
import { useState } from "react";
import { toast } from "sonner";

export default function PatientsList() {
    const [isTable, setIsTable] = useState(true);
    const db = usePGlite();
    const patients = useLiveQuery(`
        SELECT * FROM patients
        `,
    )

    async function deletePatient(id) {
        try {
            const result = await db.query('DELETE FROM patients where id = $1', [id]);
            toast("Patient deleted successfully.")
            return result;
        } catch (err) {
            toast("Patient deletion failed.")
        }
    }

    if (!patients || patients.rows.length === 0)
        return <>Loading patients. Please wait.</>

    return (
        <div>
            <h2 className="text-xl text-center mb-5">Patients List</h2>
            <div className="mb-5 flex gap-3">
                <Button variant="outline" onClick={() => setIsTable(true)}>
                    <TableIcon /> Table View
                </Button>
                <Button variant="outline" onClick={() => setIsTable(false)}>
                    <IdCard /> Card View
                </Button>
            </div>
            {isTable ? <PatientTable patients={patients} deletePatient={deletePatient} /> : <PatientsCards patients={patients} deletePatient={deletePatient} />}
        </div>
    )


}

function PatientTable({ patients, deletePatient }) {
    return (
        <div>
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
                            <TableCell>{patient.dob.toLocaleDateString()}</TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.email || ''}</TableCell>
                            <TableCell>{patient.phone || ''}</TableCell>
                            <TableCell>{patient.address || ''}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => deletePatient(patient.id)}
                                    variant="outline"
                                    size="icon"
                                    title="Delete"
                                >
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}

function PatientsCards({ patients, deletePatient }) {
    return (
        <div className="flex flex-wrap justify-between gap-5">
            {patients.rows.map((patient, idx) => <PatientCard key={idx} patient={patient} deletePatient={deletePatient} />)}
        </div>
    )

}

function PatientCard({ patient, deletePatient }) {
    return (
        <div className="bg-secondary p-3 rounded-md basis-[250px] grow">
            <h3 className="text-xl font-semibold mb-3">{patient.firstname} {patient.lastname}</h3>
            <p>DOB: {patient.dob.toLocaleDateString()}</p>
            <p>Gender: {patient.gender}</p>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
            <p>Address: {patient.address}</p>
            <Button
                onClick={() => deletePatient(patient.id)}
                variant="outline"
                title="Delete"
            >
                <Trash2 /> Delete
            </Button>
        </div>
    )
}