import { getApplications } from '@/services/applications.service';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';

export default async function HomePage() {
  const applications = await getApplications();

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Job Applications</h1>

      <ApplicationForm />

      {applications.length === 0 && (
        <p className="text-gray-500">Ainda não tens candidaturas.</p>
      )}

      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </main>
  );
}



