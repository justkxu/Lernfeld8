import {Teacher} from "@/types/teacher";

export const getTeachers = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch('https://codify.philipptrashman.dev/api/teachers', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Teacher[]
    }
};

export const updateTeacherByUsername = async (username: string, payload: {abbreviation: string}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}/teacher`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};

export const addTeacherByUsername = async (username: string, payload: {abbreviation: string}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}/teacher`, {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};