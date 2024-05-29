import {Account} from "@/types/account";
import {User} from "@/types/user";

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

export const getUserByUsername = async (username: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}`, {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as User
    }
};

export const deleteUserByUsername = async (username: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}`, {
            method: 'DELETE',
            headers,
            mode: 'cors'
        })

    return response.status;
};