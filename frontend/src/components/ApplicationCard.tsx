'use client';

import { useState } from 'react';
import { Application, ApplicationStatus } from '@/types/application';
import {
  updateApplication,
  deleteApplication,
} from '@/services/applications.service';

export function ApplicationCard({
  application,
  onDelete,
  onUpdate,
}: {
  application: Application;
  onDelete: (id: string) => void;
  onUpdate: (app: Application) => void;
}) {
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [loading, setLoading] = useState(false);

  async function handleChange(newStatus: ApplicationStatus) {
    if (newStatus === status) return;

    try {
      setLoading(true);
      setStatus(newStatus);

      const updated = await updateApplication(application.id, {
        status: newStatus,
      });

      onUpdate(updated);
    } catch {
      setStatus(application.status);
      alert('Erro ao atualizar estado');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const ok = confirm('Tens a certeza que queres apagar?');
    if (!ok) return;

    try {
      await deleteApplication(application.id);
      onDelete(application.id);
    } catch {
      alert('Erro ao apagar candidatura');
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <h2 className="text-lg font-semibold">{application.company}</h2>
        <p className="text-sm opacity-70">{application.role}</p>
      </div>

      <div className="flex gap-2">
        <select
          value={status}
          disabled={loading}
          onChange={(e) =>
            handleChange(e.target.value as ApplicationStatus)
          }
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>

        <button
          onClick={handleDelete}
          className="rounded border px-2 py-1 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}







