import BaseUrl from '../BaseUrl';

export default async function getAllUser() {
    try {
        const res = await fetch(`${BaseUrl}/v1/api/user/getAllUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error for the caller to handle
    }
}
