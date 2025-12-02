const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchAPI(endpoint: string) {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
        cache: "no-store", // Ensure fresh data for this portfolio
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return res.json();
}
