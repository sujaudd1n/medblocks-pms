"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { toast } from "sonner";

export default function RegistrationForm({ formRef }) {
    const db = usePGlite();
    async function registerPatient(patientData) {
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
            toast(`Patient ${patientData.firstname} ${patientData.lastname} has been registered.`)
            return result.rows[0].id;
        } catch (err) {
            toast(`Patient registration failed`);
        }
    }
    const [formData, setFormData] = useState({
        firstname: 'first',
        lastname: 'last',
        dob: '2025-02-02',
        gender: 'male',
        email: 'adfs@sadf.com',
        phone: '234',
        address: 'adkl3242'
    });

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
        await registerPatient(formData);
    }

    function handleInputChange(e) {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }

    function handleSelectChange(value, id) {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    }

    return (
        <div className="mb-20">
            <h2 className="text-xl text-center mb-5">Register Patient</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
            >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                        ref={formRef}
                        value={formData.firstname}
                        onChange={handleInputChange}
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                        value={formData.lastname}
                        onChange={handleInputChange}
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        required
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                        value={formData.dob}
                        onChange={handleInputChange}
                        type="date"
                        id="dob"
                        required
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange(value, 'gender')}
                        id="gender"
                        required
                    >
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        id="phone"
                        placeholder="Phone"
                        required
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        value={formData.address}
                        onChange={handleInputChange}
                        id="address"
                        placeholder="Your address"
                        required
                    />
                </div>

                <Button type="submit" className="mt-4">
                    Register
                </Button>
            </form>
        </div>
    )
}