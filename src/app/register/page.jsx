"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"



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
    function handleSubmit(e) {
        e.preventDefault();

    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input type="text" id="first-name" placeholder="First Name" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input type="text" id="last-name" placeholder="last name" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input type="date" id="dob" placeholder="dob" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <Select id="gender">
                        <SelectTrigger id="gender" className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">phone</Label>
                    <Input type="text" id="phone" placeholder="phone" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" />
                </div>

                <Input type="submit" />
            </form>
        </div>
    )
}