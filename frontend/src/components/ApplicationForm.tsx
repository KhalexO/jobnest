'use client';

import { useState } from 'react';
import { createApplication } from '@/services/applications.service';
import { Application, ApplicationStatus } from '@/types/application';

export function ApplicationForm({
  onCreated,
}: {
  onCreated: (app: Application) => void;
}) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('applied');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const created = await createApplication({
        company,
        role,
        status,
        notes: notes || undefined,
      });

      onCreated(created);

      setCompany('');
      setRole('');
      setStatus('applied');
      setNotes('');
    } finally {
      setLoading(false);
    }
  }

  const field =
    'w-full rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] px-3 py-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-lg font-semibold">New application</h2>

      <input
        className={field}
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        className={field}
        placeholder="Position"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select
        className={field}
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
      >
        <option value="applied">applied</option>
        <option value="interview">interview</option>
        <option value="offer">offer</option>
        <option value="rejected">rejected</option>
      </select>

      <textarea
        className={field}
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-[var(--fg)] px-4 py-2 text-[var(--bg)]"
      >
        {loading ? 'Creating…' : 'Create application'}
      </button>
    </form>
  );
}






