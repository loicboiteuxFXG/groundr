export const fetchDemo = async () => {
    const res = await fetch('http://localhost:3001');
    return res.json();
}