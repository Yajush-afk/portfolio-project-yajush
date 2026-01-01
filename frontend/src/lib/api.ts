export const getAPIUrl = (path: string = "") => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return `${baseUrl}${path}`;
};

export const fetchAPI = async (endpoint: string) => {
    // Prepend /api if it's not already there and not a static file
    const apiEndpoint = endpoint.startsWith("/api") || endpoint.startsWith("/static")
        ? endpoint
        : `/api${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const requestUrl = getAPIUrl(apiEndpoint);

    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`An error occurred while fetching the data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};
