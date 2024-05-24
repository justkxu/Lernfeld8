export const loginUser = async (username: string, password: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };

    const body = JSON.stringify({
        "username": username,
        "password": password
    });

    const response = await fetch('https://codify.philipptrashman.dev/api/login', {
        method: 'POST',
        headers,
        body,
        mode: 'cors'
    });

    if (response.status != 200) {
        response.text().then(content => {
            console.log(content);
        });
    } else {
        const content = await response.json();
        console.log(content);
        return content;
    }
};