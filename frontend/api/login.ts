export const fetchLogin = async (email: string, pass: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };

    const response = await fetch('https://codify.philipptrashman.dev/api/login', {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify({
            username: email,
            password: pass
        } )
    })

    if (response.status != 200) {
        return 401
    } else {
        return await response.json();
    }
};