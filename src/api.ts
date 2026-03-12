// src/api.ts or wherever you make API calls
const API_URL = import.meta.env.VITE_API_URL;

export async function detectDeepfake(imageData: string) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageData }),
  });
  return await response.json();
}
