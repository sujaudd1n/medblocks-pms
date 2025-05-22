import Link from "next/link";
import PatientsList from "./PatientsList";
import RegistrationForm from "./register/RegistrationForm";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { UserRoundPlus } from "lucide-react";


export default function HomePage() {
    const formRef = useRef(null);

    function focusOnInput() {
        formRef.current.focus()
    }

    return (
        <>
            <header className="bg-secondary p-3">
                <h1 className="text-xl"><span className="mr-3">🩺</span>Patient Management System</h1>
            </header>
            <div className="p-3 max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-5 items-center mb-10 md:gap-10">
                    <p className="text-xl bg-linear-to-b from-emerald-400 to-sky-400 font-bold text-transparent font bg-clip-text md:text-3xl md:mt-10 lg:text-5xl lg:leading-[60px]">
                        Streamline Patient Care with Our Comprehensive Management System
                    </p>
                    <p className="text-sm md:max-w-[60%] self-start">Simplify patient management, improve care coordination, and enhance patient outcomes with our intuitive and user-friendly platform.</p>
                    <Link href="#">
                        <Button
                            onClick={focusOnInput}
                        >
                            <UserRoundPlus /> Register Now
                        </Button>
                    </Link>
                </div>
                <RegistrationForm formRef={formRef} />
                <PatientsList />
            </div>
            <Footer />
        </>
    )
}

function Footer() {
    return (
        <footer className="p-3 bg-secondary">
            <p className="text-xs">&copy; {new Date().getFullYear()} Patient System</p>
        </footer>
    )
}