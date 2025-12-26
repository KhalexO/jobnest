'use client';

import { useEffect, useState } from 'react';
import { getApplications } from '@/services/applications.service';
import { Application } from '@/types/application';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';

export default function HomePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications()
      .then(setApplications)
      .finally(() => setLoading(false));
  }, []);

  function handleCreated(app: Application) {
    setApplications((prev) => [app, ...prev]);
  }

  function handleDeleted(id: string) {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  function handleUpdated(updated: Application) {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Job Applications</h1>

      <ApplicationForm onCreated={handleCreated} />

      {loading && <p>Loading...</p>}

      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          application={app}
          onDelete={handleDeleted}
          onUpdate={handleUpdated}
        />
      ))}
    </main>
  );
}






