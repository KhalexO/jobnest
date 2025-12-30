'use client';

import { useState } from 'react';
import { Application, ApplicationStatus } from '@/types/application';
import {
  updateApplication,
  deleteApplication,
} from '@/services/applications.service';

type SaveState = 'idle' | 'saving' | 'saved';

export function ApplicationCard({
  application,
  onUpdate,
  onDelete,
}: {
  application: Application;
  onUpdate: (app: Application) => void;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(application.notes ?? '');
  const [saveState, setSaveState] = useState<SaveState>('idle');

  async function handleStatusChange(newStatus: ApplicationStatus) {
    if (newStatus === application.status) return;

    try {
      setLoading(true);
      setSaveState('saving');

      const updated = await updateApplication(application.id, {
        status: newStatus,
      });

      onUpdate(updated);
      flashSaved();
    } catch {
      alert('Failed to update status');
      setSaveState('idle');
    } finally {
      setLoading(false);
    }
  }

  async function saveNotes() {
    if (notes === (application.notes ?? '')) {
      setEditingNotes(false);
      return;
    }

    try {
      setLoading(true);
      setSaveState('saving');

      const updated = await updateApplication(application.id, {
        notes: notes.trim() || null,
      });

      onUpdate(updated);
      flashSaved();
    } catch {
      alert('Failed to save notes');
      setNotes(application.notes ?? '');
      setSaveState('idle');
    } finally {
      setEditingNotes(false);
      setLoading(false);
    }
  }

  function flashSaved() {
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 1200);
  }

  async function handleDelete() {
    const ok = confirm(
      'This action is permanent.\n\nOnce deleted, this application cannot be recovered.\n\nDo you want to continue?'
    );

    if (!ok) return;

    try {
      await deleteApplication(application.id);
      onDelete(application.id);
    } catch {
      alert('Failed to delete application');
    }
  }

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{application.company}</h2>
          <p className="text-sm opacity-70">{application.role}</p>
        </div>

        <div className="flex gap-2">
          <select
            value={application.status}
            disabled={loading}
            onChange={(e) =>
              handleStatusChange(e.target.value as ApplicationStatus)
            }
            className="rounded border px-2 py-1 text-sm disabled:opacity-60"
          >
            <option value="applied">applied</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="rejected">rejected</option>
          </select>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded border px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      <div>
        {editingNotes ? (
          <textarea
            autoFocus
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={saveNotes}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveNotes();
              }
              if (e.key === 'Escape') {
                setNotes(application.notes ?? '');
                setEditingNotes(false);
              }
            }}
            placeholder="Add notes…"
            className="w-full rounded border px-2 py-1 text-sm"
            rows={2}
          />
        ) : (
          <p
            onClick={() => setEditingNotes(true)}
            className="cursor-pointer text-sm opacity-80 hover:opacity-100"
          >
            {application.notes || '➕ Add notes'}
          </p>
        )}
      </div>

      {saveState !== 'idle' && (
        <div className="text-right text-xs opacity-60">
          {saveState === 'saving' && '⏳ Saving…'}
          {saveState === 'saved' && '✅ Saved'}
        </div>
      )}
    </div>
  );
}












