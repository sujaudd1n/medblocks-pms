// import PG from "./pg";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="">Patient Management System</h1>
      <Button>Register Patient</Button>
      <Link href="/register">Register</Link>
      {/* <PG /> */}
    </>
  )
}