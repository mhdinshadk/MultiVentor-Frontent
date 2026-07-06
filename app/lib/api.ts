const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}