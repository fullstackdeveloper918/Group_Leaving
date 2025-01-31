"use server";
import { parseCookies } from "nookies";
import { Api } from "../../interfaces/interfaces";

export async function fetchFromServer(api: Api): Promise<any> {
  const { url, method, body = null } = api;
  const cookies = parseCookies();
  console.log(cookies, "Cookies");
  
  const accessToken = cookies.auth_token;
  console.log(accessToken, "Access Token");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate", // Strong cache control
    "Pragma": "no-cache",  // Older HTTP/1.0 caches
    "Expires": "0",        // Expiry set to '0' to disable caching
  };

  // Force cache-busting by appending a unique query parameter (timestamp)
  const cacheBustedUrl = `${url}?t=${new Date().getTime()}`;

  const options: RequestInit = {
    method,
    headers,
    cache: "no-store", // Disable cache for sensitive requests
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(cacheBustedUrl, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}
