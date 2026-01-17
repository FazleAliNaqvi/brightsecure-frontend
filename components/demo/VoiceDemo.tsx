'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Phone, User, Bot } from 'lucide-react';

type TranscriptLine = {
  speaker: 'ai' | 'caller';
  text: string;
  startTime: number; // seconds
  endTime: number;
};

const sampleTranscript: TranscriptLine[] = [
  {
    speaker: 'ai',
    text: "Good afternoon, thank you for calling Thompson Tax & Advisory. This is the Bright Secure assistant. How may I help you today?",
    startTime: 0,
    endTime: 6,
  },
  {
    speaker: 'caller',
    text: "Hi, yes, I need to schedule an appointment to get my taxes done. I've never used your firm before.",
    startTime: 6,
    endTime: 11,
  },
  {
    speaker: 'ai',
    text: "I'd be happy to help you schedule a tax preparation appointment. Welcome! May I have your name, please?",
    startTime: 11,
    endTime: 16,
  },
  {
    speaker: 'caller',
    text: "Sure, it's Michael Rodriguez.",
    startTime: 16,
    endTime: 18,
  },
  {
    speaker: 'ai',
    text: "Thank you, Michael. And what's the best phone number to reach you?",
    startTime: 18,
    endTime: 22,
  },
  {
    speaker: 'caller',
    text: "It's 555-0147.",
    startTime: 22,
    endTime: 25,
  },
  {
    speaker: 'ai',
    text: "Perfect. And your email address?",
    startTime: 25,
    endTime: 27,
  },
  {
    speaker: 'caller',
    text: "michael.rodriguez@email.com",
    startTime: 27,
    endTime: 30,
  },
  {
    speaker: 'ai',
    text: "Great. Will this be for personal tax preparation, or do you also have business taxes?",
    startTime: 30,
    endTime: 35,
  },
  {
    speaker: 'caller',
    text: "Just personal for now. I have a W-2 and some investment income.",
    startTime: 35,
    endTime: 39,
  },
  {
    speaker: 'ai',
    text: "Understood. I have availability this Thursday at 2 PM, or Friday at 10 AM. Which works better for you?",
    startTime: 39,
    endTime: 46,
  },
  {
    speaker: 'caller',
    text: "Thursday at 2 works great.",
    startTime: 46,
    endTime: 48,
  },
  {
    speaker: 'ai',
    text: "Excellent. I've scheduled you for Thursday at 2 PM with our tax team. You'll receive a confirmation email shortly with details on what documents to bring. Is there anything else I can help you with?",
    startTime: 48,
    endTime: 57,
  },
  {
    speaker: 'caller',
    text: "No, that's all. Thank you!",
    startTime: 57,
    endTime: 59,
  },
  {
    speaker: 'ai',
    text: "You're welcome, Michael. We look forward to seeing you Thursday. Have a great day!",
    startTime: 59,
    endTime: 63,
  },
];

const totalDuration = 63; // seconds

export default function VoiceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const newActiveIndex = sampleTranscript.findIndex(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );
    if (newActiveIndex !== activeLineIndex) {
      setActiveLineIndex(newActiveIndex);
    }
  }, [currentTime, activeLineIndex]);

  // Auto-scroll to active line (only within the transcript container, not the page)
  useEffect(() => {
    if (activeLineIndex >= 0 && transcriptRef.current) {
      const container = transcriptRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      if (activeElement) {
        // Calculate scroll position to center the active element within the container
        const containerHeight = container.clientHeight;
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.clientHeight;
        const scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
        container.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
      }
    }
  }, [activeLineIndex]);

  const handlePlayPause = () => {
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setActiveLineIndex(-1);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * totalDuration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Sample Call: Thompson Tax & Advisory</h3>
            <p className="text-gray-400 text-sm">New client appointment booking</p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div
            className="h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-md transition-all duration-100"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>

          {/* Time & Controls */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm font-mono">
              {formatTime(currentTime)}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="h-10 w-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={handlePlayPause}
                className="h-12 w-12 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white ml-0.5" />
                )}
              </button>
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Volume2 className="h-4 w-4 text-white" />
              </div>
            </div>

            <span className="text-gray-400 text-sm font-mono">
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Live Transcript
          </span>
          {isPlaying && (
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-500 font-medium">Recording</span>
            </span>
          )}
        </div>

        <div
          ref={transcriptRef}
          className="h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin"
        >
          {sampleTranscript.map((line, index) => {
            const isActive = index === activeLineIndex;
            const isPast = currentTime > line.endTime;
            const isFuture = currentTime < line.startTime;

            return (
              <div
                key={index}
                className={`flex gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-50 border border-primary-200'
                    : isPast
                    ? 'bg-gray-50 opacity-70'
                    : isFuture
                    ? 'opacity-40'
                    : ''
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    line.speaker === 'ai'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {line.speaker === 'ai' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold ${
                        line.speaker === 'ai' ? 'text-primary-600' : 'text-gray-600'
                      }`}
                    >
                      {line.speaker === 'ai' ? 'AI Receptionist' : 'Caller'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTime(line.startTime)}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isActive ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {line.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            This transcript would be emailed securely to your team.
          </p>
          <a
            href="/register"
            className="text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            Try it yourself →
          </a>
        </div>
      </div>
    </div>
  );
}
