'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

interface CallDetail {
  call_id: string;
  caller_name: string;
  caller_phone: string;
  started_at: string;
  ended_at: string | null;
  duration_formatted: string;
  status: string;
  outcome: string;
  summary: string;
  transcript: string;
  messages: Message[];
  recording_url: string;
  extracted_data: Record<string, any>;
}

interface Message {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
}

interface Note {
  id: string;
  content: string;
  created_by_name: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  ringing: 'warning',
  in_progress: 'primary',
  completed: 'success',
  failed: 'error',
  busy: 'default',
  no_answer: 'default',
  cancelled: 'default',
};

const outcomeColors: Record<string, string> = {
  appointment_booked: 'success',
  message_taken: 'primary',
  transferred: 'warning',
  callback_requested: 'warning',
  inquiry: 'default',
  spam: 'error',
  unknown: 'default',
};

export default function CallDetailPage() {
  const params = useParams();
  const router = useRouter();
  const callId = params.id as string;

  const [call, setCall] = useState<CallDetail | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (callId) {
      fetchCallDetail();
    }
  }, [callId]);

  const fetchCallDetail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/calls/transcript/${callId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCall(data.data);
      } else {
        setError(data.error?.message || 'Failed to fetch call details');
      }
    } catch (err) {
      setError('Failed to fetch call details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSavingNote(true);
    try {
      const response = await fetch(`/api/calls/${callId}/notes/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });

      const data = await response.json();

      if (data.success) {
        setNotes([data.data, ...notes]);
        setNewNote('');
      }
    } catch (err) {
      console.error('Failed to add note');
    } finally {
      setSavingNote(false);
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !call) {
    return (
      <div className="space-y-6">
        <Link href="/calls" className="text-primary hover:underline">
          &larr; Back to Call History
        </Link>
        <Card>
          <div className="p-8 text-center text-red-600">
            {error || 'Call not found'}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link href="/calls" className="text-primary hover:underline inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Call History
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {call.caller_name || call.caller_phone}
          </h1>
          {call.caller_name && (
            <p className="text-gray-600 mt-1">{call.caller_phone}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            {formatDateTime(call.started_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={statusColors[call.status] as any || 'default'} size="lg">
            {call.status.replace('_', ' ')}
          </Badge>
          <Badge variant={outcomeColors[call.outcome] as any || 'default'} size="lg">
            {call.outcome.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          {call.summary && (
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Summary</h2>
                <p className="text-gray-700">{call.summary}</p>
              </div>
            </Card>
          )}

          {/* Conversation */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h2>
              {call.messages && call.messages.length > 0 ? (
                <div className="space-y-4">
                  {call.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'assistant' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          msg.role === 'assistant'
                            ? 'bg-primary text-white'
                            : msg.role === 'system'
                            ? 'bg-gray-200 text-gray-600 italic'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm opacity-80">
                            {msg.role === 'assistant' ? 'AI Receptionist' : msg.role === 'system' ? 'System' : 'Caller'}
                          </span>
                          <span className="text-xs opacity-60">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : call.transcript ? (
                <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {call.transcript}
                </pre>
              ) : (
                <p className="text-gray-500 text-center py-4">No transcript available</p>
              )}
            </div>
          </Card>

          {/* Recording */}
          {call.recording_url && (
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recording</h2>
                <audio controls className="w-full">
                  <source src={call.recording_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Call Details */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Details</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Duration</dt>
                  <dd className="font-medium">{call.duration_formatted}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Started</dt>
                  <dd className="font-medium">{formatDateTime(call.started_at)}</dd>
                </div>
                {call.ended_at && (
                  <div>
                    <dt className="text-sm text-gray-500">Ended</dt>
                    <dd className="font-medium">{formatDateTime(call.ended_at)}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-gray-500">Call ID</dt>
                  <dd className="font-mono text-xs text-gray-600 break-all">{call.call_id}</dd>
                </div>
              </dl>
            </div>
          </Card>

          {/* Extracted Data */}
          {call.extracted_data && Object.keys(call.extracted_data).length > 0 && (
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Extracted Information</h2>
                <dl className="space-y-3">
                  {Object.entries(call.extracted_data).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-500 capitalize">
                        {key.replace(/_/g, ' ')}
                      </dt>
                      <dd className="font-medium">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>

              <form onSubmit={handleAddNote} className="mb-4">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="mt-2"
                  disabled={!newNote.trim() || savingNote}
                >
                  {savingNote ? 'Saving...' : 'Add Note'}
                </Button>
              </form>

              {notes.length > 0 ? (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm">{note.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {note.created_by_name} &bull; {formatDateTime(note.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No notes yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
