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
import { useEffect, useState } from "react";
import { usePGlite } from "@electric-sql/pglite-react";
import { toast } from "sonner";
import { UserRoundPlus } from "lucide-react";

export default function RegistrationForm({ formRef }) {
    const db = usePGlite();
    const [patientData, setPatientData] = useState(null)

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
    function fillWithRandomData() {
        const maleFirstNames = ['James', 'Liam', 'Noah', 'William', 'Benjamin', 'Michael', 'Elijah', 'Daniel', 'Henry', 'Alexander'];
        const femaleFirstNames = ['Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn'];

        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Taylor'];

        const isMale = Math.random() < 0.5;
        const selectedGender = isMale ? 'male' : 'female';

        const randomFirstName = isMale
            ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
            : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        const startDate = new Date(1950, 0, 1).getTime();
        const endDate = new Date(2005, 11, 31).getTime();
        const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
        const randomDob = randomDate.toISOString().split('T')[0];

        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${randomDomain}`;

        const randomPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString().substring(0, 10);

        const streetNames = ['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm'];
        const randomStreet = streetNames[Math.floor(Math.random() * streetNames.length)];
        const randomAddress = `${Math.floor(Math.random() * 9999) + 1} ${randomStreet} St`;

        const randomPatient = {
            firstname: randomFirstName,
            lastname: randomLastName,
            dob: randomDob,
            gender: selectedGender,
            email: randomEmail,
            phone: randomPhone,
            address: randomAddress
        }
        setPatientData(randomPatient);
    };

    async function handleSubmit(e, formData) {
        e.preventDefault();
        await registerPatient(formData);
        setPatientData(null);
    }

    return (
        <div className="mb-20 max-w-[700px] md:mx-auto">
            <div className="flex flex-col mb-5">
                <h2 className="text-xl text-center mb-5">Register Patient</h2>
                <Button variant="outline" className="ml-auto" onClick={fillWithRandomData}>
                    Fill with Random Data
                </Button>
            </div>
            <PatientForm patientData={patientData} handleSubmit={handleSubmit} handleValue="Register" HandleIcon={UserRoundPlus} formRef={formRef} />
        </div>
    )
}

export function PatientForm({ patientData, handleSubmit, handleValue, HandleIcon, formRef }) {
    console.log(patientData)
    const blankData = {
        firstname: '',
        lastname: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
    }
    const [formData, setFormData] = useState(blankData);

    useEffect(() => {
        if (patientData)
            setFormData(patientData)
    }, [patientData])

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
        <form
            onSubmit={(e) => { handleSubmit(e, formData); setFormData(blankData) }}
            className="flex flex-col gap-5"
        >
            <div className="grid w-full  items-center gap-1.5">
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
            <div className="grid w-full  items-center gap-1.5">
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

            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                    value={formData.dob}
                    onChange={handleInputChange}
                    type="date"
                    id="dob"
                    required
                />
            </div>

            <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="gender">Gender</Label>
                {/* <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange(value, 'gender')}
                    id="gender"
                    required={true}
                >
                    <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select> */}
                <select
                    value={formData.gender}
                    onChange={(e) => handleSelectChange(e.target.value, 'gender')}
                    required
                    id="gender"
                    className="border-1 p-2 rounded-sm"
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="grid w-full  items-center gap-1.5">
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

            <div className="grid w-full  items-center gap-1.5">
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

            <div className="grid w-full  items-center gap-1.5">
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
                <HandleIcon /> {handleValue}
            </Button>
        </form>

    )
}