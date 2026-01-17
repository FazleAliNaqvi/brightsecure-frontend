'use client';

import { useState, useEffect } from 'react';
import { Mic, Play, Pause, Volume2, Save, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import api, { organizationsApi } from '@/lib/api';

interface VoiceOption {
  id: string;
  name: string;
  vapi_voice_id: string;
  gender: 'male' | 'female';
  description: string;
  preview_url: string;
}

interface Organization {
  id: string;
  name: string;
  voice: VoiceOption | null;
  greeting_script: string;
}

interface VoiceSettingsProps {
  organization: Organization;
  onUpdate: (data: Partial<Organization>) => void;
}

const DEFAULT_GREETING = `Hello, thank you for calling {organization_name}. My name is {voice_name}, your AI assistant. How may I help you today?`;

export function VoiceSettings({ organization, onUpdate }: VoiceSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(
    organization.voice?.id || null
  );
  const [greetingScript, setGreetingScript] = useState(
    organization.greeting_script || DEFAULT_GREETING
  );

  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchVoices();
  }, []);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const fetchVoices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/voice-options/');
      if (response.data.success) {
        setVoices(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch voices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPreview = (voice: VoiceOption) => {
    if (playingVoice === voice.id) {
      // Stop playing
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setPlayingVoice(null);
    } else {
      // Stop any current playback
      if (audio) {
        audio.pause();
      }

      // Start new playback
      const newAudio = new Audio(voice.preview_url);
      newAudio.onended = () => setPlayingVoice(null);
      newAudio.play().catch(() => {
        // Handle autoplay restrictions
        setPlayingVoice(null);
      });
      setAudio(newAudio);
      setPlayingVoice(voice.id);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await organizationsApi.update(organization.id, {
        voice_id: selectedVoiceId,
        greeting_script: greetingScript,
      });

      if (response.data.success) {
        const selectedVoice = voices.find((v) => v.id === selectedVoiceId);
        onUpdate({
          voice: selectedVoice || null,
          greeting_script: greetingScript,
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.error?.message || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const insertVariable = (variable: string) => {
    setGreetingScript((prev) => prev + ` {${variable}}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary-500" />
            AI Voice Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Choose the voice your AI receptionist will use when answering calls.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voices.map((voice) => (
              <div
                key={voice.id}
                onClick={() => setSelectedVoiceId(voice.id)}
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all',
                  selectedVoiceId === voice.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{voice.name}</h4>
                  <Badge
                    variant={voice.gender === 'female' ? 'secondary' : 'outline'}
                    size="sm"
                  >
                    {voice.gender}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{voice.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPreview(voice);
                  }}
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                >
                  {playingVoice === voice.id ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Play Preview
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {voices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Volume2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No voice options available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Greeting Script */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary-500" />
            Greeting Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Customize how your AI receptionist greets callers. Use variables to personalize the message.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opening Greeting
            </label>
            <textarea
              value={greetingScript}
              onChange={(e) => setGreetingScript(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Enter your greeting script..."
            />
          </div>

          {/* Variables */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Variables
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => insertVariable('organization_name')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                {'{organization_name}'}
              </button>
              <button
                type="button"
                onClick={() => insertVariable('voice_name')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                {'{voice_name}'}
              </button>
              <button
                type="button"
                onClick={() => insertVariable('caller_name')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                {'{caller_name}'}
              </button>
              <button
                type="button"
                onClick={() => insertVariable('current_time')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700"
              >
                {'{current_time}'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <p className="text-gray-800 italic">
              &ldquo;{greetingScript
                .replace('{organization_name}', organization.name)
                .replace('{voice_name}', voices.find((v) => v.id === selectedVoiceId)?.name || 'Sarah')
                .replace('{caller_name}', 'John')
                .replace('{current_time}', 'morning')}&rdquo;
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call Handling */}
      <Card>
        <CardHeader>
          <CardTitle>Call Handling Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">After-Hours Message</div>
                <div className="text-sm text-gray-500">
                  Play a custom message when calls come outside business hours
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Call Recording</div>
                <div className="text-sm text-gray-500">
                  Record calls for quality and training purposes
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Transcription</div>
                <div className="text-sm text-gray-500">
                  Automatically transcribe all calls
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-between">
        <div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Settings saved!</p>}
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Voice Settings'}
        </Button>
      </div>
    </div>
  );
}
