import {Student} from "@/types/student";

export const getStudents = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch('https://codify.philipptrashman.dev/api/students', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Student[]
    }
};

export const updateStudentByUsername = async (username: string, payload: {}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}/student`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};

export const addStudentByUsername = async (username: string, payload: {}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}/student`, {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};