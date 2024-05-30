import {Class} from "@/types/class";

export const getClasses = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch('https://codify.philipptrashman.dev/api/school_classes', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Class[]
    }
};

export const addClass = async (payload: {name: string, grade_id: string, head_teacher_id: string}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const body = JSON.stringify(payload);
    const response = await fetch('https://codify.philipptrashman.dev/api/school_classes', {
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

export const updateClassById = async (school_class_id: string, payload: {name: string, grade_id: string, head_teacher_id: string}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/school_classes/${school_class_id}`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};


export const deleteClassById = async (school_class_id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch(`https://codify.philipptrashman.dev/api/school_classes/${school_class_id}`, {
        method: 'DELETE',
        headers,
        mode: 'cors'
    })

    return response.status;
};