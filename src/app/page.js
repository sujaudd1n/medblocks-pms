"use client";

import { useState, useEffect } from "react";
import { PGliteProvider } from "@electric-sql/pglite-react";
import { PGliteWorker } from '@electric-sql/pglite/worker'
import { live, PGliteWithLive } from "@electric-sql/pglite/live";
import HomePage from "./HomePage";

let dbGlobal;

export default function Home() {
  const [db, setDb] = useState();

  useEffect(() => {
    async function setupDb() {
      dbGlobal = await PGliteWorker.create(
        new Worker(new URL("./worker-process.js", import.meta.url), {
          type: "module",
        }),
        {
          extensions: {
            live,
          },
        }
      );

      dbGlobal.exec(`
        CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            dob DATE NOT NULL,
            gender VARCHAR(20) NOT NULL,
            email VARCHAR(100),
            phone VARCHAR(20),
            address TEXT
        )`
      )
      setDb(dbGlobal);

    }
    setupDb();
  }, [])

  return (
    <div>
      {
        db ?
          <PGliteProvider db={db}>
            <HomePage />
          </PGliteProvider >
          : <p className="absolute top-[50%] left-[50%] -translate-x-[50%] text-center">Application loading...</p>
      }
    </div>

  )
}

