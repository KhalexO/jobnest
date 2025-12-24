'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createApplication, ApplicationStatus } from '@/services/applications.service';

export function ApplicationForm() {
  const router = useRouter();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('applied');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createApplication({
        company,
        role,
        status,
        notes: notes || undefined,
      });

      setCompany('');
      setRole('');
      setStatus('applied');
      setNotes('');

      router.refresh(); // 🔑 atualiza a lista
    } catch (err: any) {
      setError(err.message || 'Erro ao criar candidatura');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border bg-white p-4 shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold">Nova candidatura</h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        className="w-full rounded border p-2"
        placeholder="Empresa"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Cargo"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select
        className="w-full rounded border p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
      >
        <option value="applied">applied</option>
        <option value="interview">interview</option>
        <option value="offer">offer</option>
        <option value="rejected">rejected</option>
      </select>

      <textarea
        className="w-full rounded border p-2"
        placeholder="Notas (opcional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'A criar...' : 'Criar candidatura'}
      </button>
    </form>
  );
}
