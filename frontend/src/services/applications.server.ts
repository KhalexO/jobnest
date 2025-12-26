import { Application } from "@/types/application";

const API_URL = "http://localhost:3001";

export async function getApplicationsServer(): Promise<Application[]> {
  const res = await fetch(`${API_URL}/applications`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch applications (server)");
  }

  return res.json();
}
