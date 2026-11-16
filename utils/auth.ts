
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type AuthCheckResult =
  | { authenticated: true }
  | { authenticated: false }
  | { authenticated: null; error: string };

// Share one refresh operation between simultaneous callers.
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/refresh/`,
          {
            method: "POST",
            credentials: "include",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return response.ok;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

async function verifyAccessToken(): Promise<Response> {
  return fetch(`${API_URL}/api/auth/user/`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
}

export async function checkAuth(): Promise<AuthCheckResult> {
  try {
    let response = await verifyAccessToken();

    if (response.ok) {
      return { authenticated: true };
    }

    if (response.status !== 401) {
      return {
        authenticated: null,
        error: `Authentication check failed (${response.status}).`,
      };
    }

    // Access token may have expired. Refresh only once.
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      return { authenticated: false };
    }

    response = await verifyAccessToken();

    if (response.ok) {
      return { authenticated: true };
    }

    if (response.status === 401) {
      return { authenticated: false };
    }

    return {
      authenticated: null,
      error: `Authentication check failed (${response.status}).`,
    };
  } catch {
    return {
      authenticated: null,
      error: "Unable to connect to the authentication server.",
    };
  }
}
