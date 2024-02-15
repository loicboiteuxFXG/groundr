export const fetchDemo = async () => {
    console.log("Fetching Demo");
    const res = await fetch('https://catfact.ninja/fact');
    return res.json();
}