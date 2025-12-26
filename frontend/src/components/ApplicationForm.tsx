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
    } catch {
      alert('Erro ao criar candidatura');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-6"
    >
      <h2 className="text-lg font-semibold">Nova candidatura</h2>

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Empresa"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Cargo"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select
        className="w-full rounded border px-2 py-1"
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
      >
        <option value="applied">applied</option>
        <option value="interview">interview</option>
        <option value="offer">offer</option>
        <option value="rejected">rejected</option>
      </select>

      <textarea
        className="w-full rounded border px-3 py-2"
        placeholder="Notas"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {loading ? 'A criar…' : 'Criar candidatura'}
      </button>
    </form>
  );
}




