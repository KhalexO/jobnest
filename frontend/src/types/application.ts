export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected";

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  link: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
