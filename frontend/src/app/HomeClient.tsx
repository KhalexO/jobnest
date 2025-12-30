'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationForm } from '@/components/ApplicationForm';
import { Application, ApplicationStatus } from '@/types/application';

type Filter = ApplicationStatus | 'all';

export default function HomeClient({
  applications: initialApplications,
}: {
  applications: Application[];
}) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const router = useRouter();
  const searchParams = useSearchParams();

  const filter =
    (searchParams.get('status') as Filter) || 'all';

  const search = searchParams.get('search') || '';

  function updateQuery(
    params: Partial<{ status: Filter; search: string }>
  ) {
    const current = new URLSearchParams(searchParams.toString());

    if (params.status !== undefined) {
      params.status === 'all'
        ? current.delete('status')
        : current.set('status', params.status);
    }

    if (params.search !== undefined) {
      params.search
        ? current.set('search', params.search)
        : current.delete('search');
    }

    const query = current.toString();
    router.replace(query ? `?${query}` : '?');
  }

  const filtered = applications
    .filter((a) => (filter === 'all' ? true : a.status === filter))
    .filter((a) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
      );
    });

  const stats = applications.reduce(
    (acc, app) => {
      acc.all += 1;
      acc[app.status] += 1;
      return acc;
    },
    {
      all: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    },
  );

  return (
    <main className="h-full px-6 py-4">
      <h1 className="mb-3 text-2xl font-bold">Job Applications</h1>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {(['all', 'applied', 'interview', 'offer', 'rejected'] as const).map(
          (v) => (
            <Stat
              key={v}
              label={v}
              value={stats[v]}
              active={filter === v}
              onClick={() => updateQuery({ status: v })}
            />
          ),
        )}
      </div>

      <div className="grid h-[calc(100%-6rem)] grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <ApplicationForm
            onCreated={(app) =>
              setApplications((prev) => [app, ...prev])
            }
          />
        </div>

        <div className="flex h-full flex-col overflow-hidden md:col-span-2">
          <input
            type="text"
            placeholder="Search by company or role…"
            value={search}
            onChange={(e) =>
              updateQuery({ search: e.target.value })
            }
            className="mb-3 w-full rounded border px-3 py-2 text-sm"
          />

          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            {filtered.length === 0 && (
              <p className="text-sm opacity-60">
                No applications found.
              </p>
            )}

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

function Stat({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  const base =
    'rounded-lg border border-[var(--border)] px-4 py-2 text-sm transition flex flex-col items-start';

  const activeStyle = 'ring-2 ring-[var(--fg)]';

  const styles: Record<string, string> = {
    all: 'bg-[var(--status-all)]',
    applied: 'bg-[var(--status-applied)]',
    interview: 'bg-[var(--status-interview)]',
    offer: 'bg-[var(--status-offer)]',
    rejected: 'bg-[var(--status-rejected)]',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[label]} ${
        active ? activeStyle : 'hover:opacity-90'
      }`}
    >
      <span className="text-xs text-[var(--muted)] capitalize">
        {label}
      </span>
      <span className="text-lg font-bold">{value}</span>
    </button>
  );
}










