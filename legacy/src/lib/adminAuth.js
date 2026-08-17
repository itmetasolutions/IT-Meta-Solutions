import { API_BASE_URL } from "./api";

const TOKEN_KEY = "itms_admin_token";

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

export async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401) {
    clearAdminToken();
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }
  return res;
}
