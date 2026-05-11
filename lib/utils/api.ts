export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || 'API request failed',
        success: false,
      };
    }

    return {
      data: data as T,
      success: true,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false,
    };
  }
}

export function buildQueryString(params: Record<string, any>): string {
  const entries = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

  return entries.length > 0 ? '?' + entries.join('&') : '';
}
