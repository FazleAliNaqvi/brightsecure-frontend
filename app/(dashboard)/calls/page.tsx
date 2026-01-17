'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

interface Call {
  id: string;
  caller_phone: string;
  caller_name: string;
  started_at: string;
  duration_seconds: number;
  duration_formatted: string;
  status: string;
  status_display: string;
  outcome: string;
  outcome_display: string;
  summary: string;
  has_transcript: boolean;
  has_recording: boolean;
}

interface Pagination {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
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

function CallHistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [calls, setCalls] = useState<Call[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [outcome, setOutcome] = useState(searchParams.get('outcome') || '');
  const [startDate, setStartDate] = useState(searchParams.get('start_date') || '');
  const [endDate, setEndDate] = useState(searchParams.get('end_date') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  // Selected call for transcript view
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<any>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);

  useEffect(() => {
    fetchCalls();
  }, [page, status, outcome, startDate, endDate]);

  const fetchCalls = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      if (outcome) params.append('outcome', outcome);
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      params.append('page', page.toString());
      params.append('page_size', '20');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/calls/history/?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCalls(data.data.calls);
        setPagination(data.data.pagination);
      } else {
        setError(data.error?.message || 'Failed to fetch calls');
      }
    } catch (err) {
      setError('Failed to fetch calls');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCalls();
  };

  const handleViewTranscript = async (callId: string) => {
    if (selectedCall === callId) {
      setSelectedCall(null);
      setTranscript(null);
      return;
    }

    setSelectedCall(callId);
    setLoadingTranscript(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/calls/transcript/${callId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTranscript(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch transcript');
    } finally {
      setLoadingTranscript(false);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    const params = new URLSearchParams();
    // params.append('organization_id', orgId);
    params.append('start_date', startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    params.append('end_date', endDate || new Date().toISOString().split('T')[0]);
    params.append('format', format);

    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/calls/export/?${params}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
          <p className="text-gray-600 mt-1">View and manage past call interactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('json')}>
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <form onSubmit={handleSearch} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search by phone, name, or transcript..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="failed">Failed</option>
              <option value="no_answer">No Answer</option>
              <option value="busy">Busy</option>
            </select>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            >
              <option value="">All Outcomes</option>
              <option value="appointment_booked">Appointment Booked</option>
              <option value="message_taken">Message Taken</option>
              <option value="callback_requested">Callback Requested</option>
              <option value="inquiry">General Inquiry</option>
              <option value="spam">Spam</option>
            </select>
            <Button type="submit">Search</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </form>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <Card>
          <div className="p-8 text-center text-red-600">{error}</div>
        </Card>
      ) : calls.length === 0 ? (
        <Card>
          <div className="p-8 text-center text-gray-500">
            No calls found matching your criteria
          </div>
        </Card>
      ) : (
        <>
          {/* Call List */}
          <div className="space-y-4">
            {calls.map((call) => (
              <Card key={call.id} className="hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">
                          {call.caller_name || call.caller_phone}
                        </span>
                        {call.caller_name && (
                          <span className="text-gray-500 text-sm">
                            {call.caller_phone}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{formatDate(call.started_at)}</span>
                        <span>{call.duration_formatted}</span>
                      </div>
                      {call.summary && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {call.summary}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColors[call.status] as any || 'default'}>
                        {call.status_display}
                      </Badge>
                      <Badge variant={outcomeColors[call.outcome] as any || 'default'}>
                        {call.outcome_display}
                      </Badge>
                      <div className="flex gap-1">
                        {call.has_transcript && (
                          <span title="Has Transcript" className="text-green-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </span>
                        )}
                        {call.has_recording && (
                          <span title="Has Recording" className="text-blue-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTranscript(call.id)}
                      >
                        {selectedCall === call.id ? 'Hide' : 'View'}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Transcript View */}
                  {selectedCall === call.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      {loadingTranscript ? (
                        <div className="flex justify-center py-4">
                          <Spinner />
                        </div>
                      ) : transcript ? (
                        <div className="space-y-4">
                          {/* Summary */}
                          {transcript.summary && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                              <p className="text-gray-600">{transcript.summary}</p>
                            </div>
                          )}

                          {/* Messages */}
                          {transcript.messages && transcript.messages.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Conversation</h4>
                              <div className="space-y-3 max-h-96 overflow-y-auto">
                                {transcript.messages.map((msg: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className={`p-3 rounded-lg ${
                                      msg.role === 'assistant'
                                        ? 'bg-primary/10 ml-4'
                                        : 'bg-gray-100 mr-4'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm">
                                        {msg.role === 'assistant' ? 'AI Receptionist' : 'Caller'}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                      </span>
                                    </div>
                                    <p className="text-gray-700">{msg.content}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Full Transcript */}
                          {transcript.transcript && !transcript.messages?.length && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Full Transcript</h4>
                              <pre className="whitespace-pre-wrap text-sm text-gray-600 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                                {transcript.transcript}
                              </pre>
                            </div>
                          )}

                          {/* Recording */}
                          {transcript.recording_url && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Recording</h4>
                              <audio controls className="w-full">
                                <source src={transcript.recording_url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          No transcript available for this call
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {((pagination.page - 1) * pagination.page_size) + 1} to{' '}
                {Math.min(pagination.page * pagination.page_size, pagination.total_count)} of{' '}
                {pagination.total_count} calls
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={!pagination.has_previous}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-gray-600">
                  Page {pagination.page} of {pagination.total_pages}
                </span>
                <Button
                  variant="outline"
                  disabled={!pagination.has_next}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex justify-center py-12">
      <Spinner size="lg" />
    </div>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallHistoryContent />
    </Suspense>
  );
}
