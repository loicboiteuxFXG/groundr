export const fetchDemo = async () => {
    const res = await fetch('http://localhost:3001/get');
    return res.json();
}


export const postDemo = async (data) => {
    const serializedBody = JSON.stringify(data); // (2) in notes below
    console.log(serializedBody);
    const fetchOptions = { // (3)
        method: 'POST', // (4)
        body: serializedBody, // (5)
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch('http://localhost:3001/post', fetchOptions); // We pass in the options here to configure our fetch request
}