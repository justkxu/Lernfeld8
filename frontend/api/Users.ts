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

export const updateUserByUsername = async (username: string, payload: {}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/users/${username}`, {
            method: 'PUT',
            headers,
            mode: 'cors',
            body: JSON.stringify(payload)
        })

    return response.status;
};

export const addUser = async (
    payload: {}
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const body = JSON.stringify(payload);
    const response = await fetch('https://codify.philipptrashman.dev/api/users', {
        method: 'POST',
        headers,
        mode: 'cors',
        body: body,
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return await response.json();
    }
};