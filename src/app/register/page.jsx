"use client";

import { PGlite } from "@electric-sql/pglite";
import { registerPatient } from "../pgl";
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

console.log("creating table")


export default function Page() {
    return (
        <div>
            <h2>Register Patient</h2>
            <div>
                <RegistrationForm />
            </div>

        </div>
    )
}

function RegistrationForm() {
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
        await registerPatient(formData)
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
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
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
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
                    Submit
                </Button>
            </form>
        </div>
    )
}