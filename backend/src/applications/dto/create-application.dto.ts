export class CreateApplicationDto {
  company: string;
  role: string;
  status?: string;  // opcional, default no DB = "applied"
  link?: string;
  notes?: string;
}
