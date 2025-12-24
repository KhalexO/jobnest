type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected';

const statusStyles: Record<ApplicationStatus, string> = {
  applied: 'bg-gray-200 text-gray-800',
  interview: 'bg-blue-200 text-blue-800',
  offer: 'bg-green-200 text-green-800',
  rejected: 'bg-red-200 text-red-800',
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
