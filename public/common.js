const origin = "http://localhost:3000";

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) 
        options.body = JSON.stringify(body);
    
    const response = await fetch(origin + endpoint, options);
    if (!response.ok) 
        throw new Error(response.statusText);

    try 
    {
        return await response.json();
    } catch (err) 
    {
        return null;
    }
}

export {
    apiCall
}