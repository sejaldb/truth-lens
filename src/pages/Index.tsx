// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function detectDeepfake(data: any, type: "image" | "video" | "url") {
  const endpoint = `${API_URL}/predict`; // your backend route
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, type }),
  });
  return response.json();
}
