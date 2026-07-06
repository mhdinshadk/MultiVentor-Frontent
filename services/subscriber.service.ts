import { fetchAPI } from "@/lib/api";

export interface SubscriberInput {
  email: string;
}

export async function createSubscriber(data: SubscriberInput): Promise<any> {
  try {
    const result = await fetchAPI<any>("/subscribers", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return null;
  }
}
