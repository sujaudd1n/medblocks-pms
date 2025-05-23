'use client';
import { LoaderCircle, Trash2, UserRoundPen } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useLiveQuery } from "@electric-sql/pglite-react";
import { usePGlite } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PatientForm } from "./RegistrationForm";



export default function PatientsList() {
    const [isTable, setIsTable] = useState(true);
    const db = usePGlite();

    const patients = useLiveQuery(`
    SELECT * FROM patients ORDER BY id;
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

    return (
        <div className="mb-10">
            <h2 className="text-xl text-center mb-5">Patients List</h2>
            <GetPatientsIfExists patients={patients} deletePatient={deletePatient} isTable={isTable} setIsTable={setIsTable} />
        </div>
    )
}

function GetPatientsIfExists({ patients, deletePatient, isTable, setIsTable }) {
    const [q, setQ] = useState('');
    function filterPatients(patient) {
        const fullName = patient.firstname + ' ' + patient.lastname;
        return fullName.toLowerCase().includes(q.toLowerCase());
    }
    if (!patients)
        return (
            <div className="flex flex-col items-center gap-3">
                <LoaderCircle className="animate-spin" />
                <p>Loading patients. Please wait.</p>
            </div>
        )
    if (patients.rows.length === 0)
        return <p>There are no patients. Please register one.</p>
    return (
        <div>
            <Input className="mb-5 max-w-[400px]" placeholder="Search by name" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="mb-5 flex gap-3">
                <Button variant="outline" onClick={() => setIsTable(true)}>
                    <TableIcon /> Table View
                </Button>
                <Button variant="outline" onClick={() => setIsTable(false)}>
                    <IdCard /> Card View
                </Button>
            </div>
            {isTable ? <PatientTable patients={patients.rows.filter(filterPatients)} deletePatient={deletePatient} /> : <PatientsCards patients={patients.rows.filter(filterPatients)} deletePatient={deletePatient} />}
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
                    {patients.map(patient => (
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
                                <div className="mt-auto pt-3">
                                    <EditPatient patient={patient} />
                                    <Button
                                        onClick={() => deletePatient(patient.id)}
                                        variant="outline"
                                        size="icon"
                                        title="Delete"
                                        className="ml-1"
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}

function EditPatient({ patient }) {
    const [open, setOpen] = useState(false)
    const db = usePGlite();
    async function edit(e, patientData) {
        e.preventDefault();
        try {
            const result = await db.query(
                `UPDATE patients SET
                firstname = $1, lastname = $2, dob = $3, gender = $4, email = $5, phone = $6, address = $7
                WHERE id = $8`,
                [
                    patientData.firstname,
                    patientData.lastname,
                    patientData.dob,
                    patientData.gender,
                    patientData.email,
                    patientData.phone,
                    patientData.address,
                    patientData.id
                ]
            );
            toast(`Patient ${patientData.firstname} ${patientData.lastname} has been edited.`)
            setOpen(false)
        } catch (err) {
            toast(`Patient edit failed`);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    title="Edit"
                >
                    <UserRoundPen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <PatientForm patientData={{ ...patient, gender: patient.gender, dob: patient.dob.toISOString().split('T')[0] }} handleSubmit={edit} handleValue={'Edit'} HandleIcon={UserRoundPen} />
            </DialogContent>
        </Dialog>
    )
}


function PatientsCards({ patients, deletePatient }) {
    return (
        <div className="flex flex-wrap justify-between gap-5">
            {patients.map((patient, idx) => <PatientCard key={idx} patient={patient} deletePatient={deletePatient} />)}
        </div>
    )

}

function PatientCard({ patient, deletePatient }) {
    return (
        <div className="bg-secondary p-3 rounded-md basis-[250px] grow flex flex-col">
            <h3 className="text-xl font-semibold mb-3">{patient.firstname} {patient.lastname}</h3>
            <p>DOB: {patient.dob.toLocaleDateString()}</p>
            <p>Gender: {patient.gender}</p>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
            <p>Address: {patient.address}</p>
            <div className="mt-auto pt-3">
                <EditPatient patient={patient} />
                <Button
                    onClick={() => deletePatient(patient.id)}
                    variant="outline"
                    size="icon"
                    title="Delete"
                    className="ml-1"
                >
                    <Trash2 />
                </Button>
            </div>
        </div>
    )
}
