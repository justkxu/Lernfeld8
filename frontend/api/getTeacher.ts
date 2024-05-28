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