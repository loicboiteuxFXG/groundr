export const fetchDemo = async () => {
    const res = await fetch('http://localhost:3001/get');
    return res.json();
}

export const fetchUser = async (id) => {
    const res = await fetch(`http://localhost:3001/user/get/${id}`);
    return res.json();
}


export const fetchUsers = async () => {}

export const postCreateUser = async (user) => {
    const serializedBody = JSON.stringify(user);
    const fetchOptions = {
        method: 'POST',
        body: serializedBody,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch('http://localhost:3001/user/create', fetchOptions);
}