export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes?: string | null;
};

const API_URL = "http://localhost:3001";

export async function getApplications(): Promise<Application[]> {
  const res = await fetch(`${API_URL}/applications`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }

  return res.json();
}

export async function createApplication(data: {
  company: string;
  role: string;
  status?: ApplicationStatus;
  notes?: string;
}) {
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}

export async function updateApplication(
  id: string,
  data: Partial<Application>
) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar candidatura");
  }

  return res.json();
}

export async function deleteApplication(id: string) {
  const res = await fetch(`http://localhost:3001/applications/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao apagar candidatura");
  }

  return res.json();
}
