export const API_URL = 'http://localhost:5000';

export async function request<Type>(request:()=> Promise<Type>) : Promise<{data: Type | null, error: string | null}> {
    try {
        const data = await request();
        return { data, error: null };
    } catch (error: any) {
        return { data: null, error: error.response.data.error };
    }
}
