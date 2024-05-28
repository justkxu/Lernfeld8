'use client'

import { fetchHelloWorld } from '@/api/hello';
import {getStudends} from "@/api/getStudents";

export default function Home() {
  return (
      <div className={"container mt-4"}>
        <h1 className={"text-center mb-4 display-4 fw-bold"}>HomePage</h1>
      </div>
  );
}