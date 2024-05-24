export const fetchHelloWorld = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    };
    const response = await fetch('https://codify.philipptrashman.dev/api/hello', { headers, mode: 'cors' })

    if (response.status != 200) {
        console.log(response.statusText);
    } else {
        response.text().then(content => {
            console.log(content);
        });
        return response;
    }
};