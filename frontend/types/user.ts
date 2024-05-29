import {Teacher} from "@/types/teacher";
import {Student} from "@/types/student";

export type User = {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
    username: string;
    email: string;
    password?: string,
    contacts?: Contact[];
    student?: Student;
    parent?: {};
    teacher?: Teacher;
}

export type Contact = {
    id: string;
    contactType: string;
    contact: string;
}