import Link from "next/link";
import PatientsTable from "./PatientsTable";
import RegistrationForm from "./register/RegistrationForm";
import { Button } from "@/components/ui/button";


export default function HomePage() {
    return (
        <>
            <header className="bg-secondary p-3">
                <h1 className="text-xl"><span className="mr-3">🩺</span>Patient Management System</h1>
            </header>
            <div className="p-3">
                <div className="flex flex-col gap-5 items-center mb-10">
                    <p className="text-xl">Streamline Patient Care with Our Comprehensive Management System</p>
                    <p className="text-sm">Simplify patient management, improve care coordination, and enhance patient outcomes with our intuitive and user-friendly platform.</p>
                    <Link href="#">
                        <Button>Register Now</Button>
                    </Link>
                </div>
                <RegistrationForm />
                <PatientsTable />
            </div>
        </>
    )
}