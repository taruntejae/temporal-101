export async function greet(name: string): Promise<string> {
    return `Logs have been successfully exported -${name}!`;
}

export async function actGetUserDetails(id: number): Promise<any> {
    const axios = require('axios');
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/' + id)
    return response.data;
}