import {Account} from "@/types/account";

export const getUsers = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch('https://codify.philipptrashman.dev/api/users', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Account[]
    }
};