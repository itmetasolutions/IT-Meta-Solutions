// Frontend and backend now deploy together as one Vercel project, so API
// calls are same-origin by default. VITE_API_BASE_URL is only needed if the
// backend is ever split out to a different host again.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
