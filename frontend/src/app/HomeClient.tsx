'use client';

import { useState } from 'react';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Application, ApplicationStatus } from '@/types/application';

export default function HomeClient({
  applications: initialApplications,
}: {
  applications: Application[];
}) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [filter, setFilter] =
    useState<ApplicationStatus | 'all'>('all');

  const filtered =
    filter === 'all'
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <main className="h-full px-6 py-4">
      <h1 className="mb-4 text-2xl font-bold">Job Applications</h1>

      <div className="grid h-[calc(100%-3rem)] grid-cols-1 gap-6 md:grid-cols-3">

        <div>
          <ApplicationForm
            onCreated={(app) =>
              setApplications((prev) => [app, ...prev])
            }
          />
        </div>

        <div className="flex h-full flex-col overflow-hidden md:col-span-2">

          <div className="mb-3 flex gap-2">
            {(['all', 'applied', 'interview', 'offer', 'rejected'] as const).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => setFilter(v)}
                  className={`rounded border px-3 py-1 text-sm ${
                    filter === v
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {v}
                </button>
              ),
            )}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {filtered.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onUpdate={(updated) =>
                  setApplications((prev) =>
                    prev.map((a) =>
                      a.id === updated.id ? updated : a,
                    ),
                  )
                }
                onDelete={(id) =>
                  setApplications((prev) =>
                    prev.filter((a) => a.id !== id),
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


