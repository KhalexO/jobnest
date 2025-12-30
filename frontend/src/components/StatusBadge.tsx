import { ApplicationStatus } from "@/types/application";

const styles: Record<string, string> = {
  all: 'bg-[var(--card)]',
  applied: 'bg-[var(--status-applied)]',
  interview: 'bg-[var(--status-interview)]',
  offer: 'bg-[var(--status-offer)]',
  rejected: 'bg-[var(--status-rejected)]',
};


export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}


