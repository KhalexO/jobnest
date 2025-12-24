import { StatusBadge } from './StatusBadge';

type Application = {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
};

export function ApplicationCard({ application }: { application: Application }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">{application.company}</h2>
        <p className="text-sm text-gray-600">{application.role}</p>
      </div>

      <StatusBadge status={application.status} />
    </div>
  );
}
