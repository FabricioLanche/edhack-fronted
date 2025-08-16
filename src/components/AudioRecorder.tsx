import React, { useState, useRef, useEffect } from 'react';

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

type RecordingState = 'idle' | 'recording' | 'processing';

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onTranscription, 
  disabled = false,
  className = ''
}) => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Verificar soporte del navegador
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
      setError('Tu navegador no soporta grabación de audio');
    }
  }, []);

  const startRecording = async (): Promise<void> => {
    if (!isSupported || disabled) return;

    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        processAudio();
      };

      mediaRecorder.start();
      setRecordingState('recording');
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Error al acceder al micrófono. Verifica los permisos.');
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingState('processing');
      
      // Detener el stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const processAudio = async (): Promise<void> => {
    try {
      if (audioChunksRef.current.length === 0) {
        throw new Error('No hay datos de audio para procesar');
      }

      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
      
      // Simulación de transcripción (en un proyecto real usarías una API)
      // Por ahora devolvemos un texto placeholder
      const transcription = await mockTranscription(audioBlob);
      
      onTranscription(transcription);
      setRecordingState('idle');
    } catch (err) {
      console.error('Error processing audio:', err);
      setError('Error procesando el audio. Inténtalo de nuevo.');
      setRecordingState('idle');
    }
  };

  // Simulación de transcripción - en producción integrarías con una API real
  const mockTranscription = async (_audioBlob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Transcripción simulada del audio grabado');
      }, 1500);
    });
  };

  const handleToggleRecording = (): void => {
    if (recordingState === 'idle') {
      startRecording();
    } else if (recordingState === 'recording') {
      stopRecording();
    }
  };

  if (!isSupported) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleToggleRecording}
        disabled={disabled || recordingState === 'processing'}
        className={`
          flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200
          ${recordingState === 'recording' 
            ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' 
            : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
          }
          ${(disabled || recordingState === 'processing') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {recordingState === 'idle' && (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Grabar audio
          </>
        )}
        
        {recordingState === 'recording' && (
          <>
            <div className="w-5 h-5 bg-red-500 rounded animate-pulse"></div>
            Detener grabación
          </>
        )}
        
        {recordingState === 'processing' && (
          <>
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Procesando...
          </>
        )}
      </button>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;