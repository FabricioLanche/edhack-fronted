import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import type { PersonalizationQuestion } from '../context/PersonalizationContext';

interface FormFieldProps {
  question: PersonalizationQuestion;
  value: string;
  onChange: (value: string, inputType: 'text' | 'select' | 'audio') => void;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  question, 
  value, 
  onChange, 
  className = '' 
}) => {
  const [inputMode, setInputMode] = useState<'manual' | 'audio'>('manual');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onChange(e.target.value, 'text');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value, 'select');
  };

  const handleAudioTranscription = (transcription: string): void => {
    onChange(transcription, 'audio');
    setInputMode('manual'); // Volver al modo manual después de la transcripción
  };

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
  };

  const canUseAudio = question.type === 'text' || question.type === 'audio';

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {/* Header de la pregunta */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <div className="flex items-center gap-2">
            {/* Indicador de respuesta completada */}
            {value && (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
            {/* Flecha de expansión */}
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 pt-0 space-y-4">
          {/* Selector de modo de entrada para campos de texto */}
          {canUseAudio && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInputMode('manual')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                  inputMode === 'manual' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Escribir
              </button>
              <button
                type="button"
                onClick={() => setInputMode('audio')}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200 ${
                  inputMode === 'audio' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Audio
              </button>
            </div>
          )}

          {/* Campo de entrada según el tipo y modo */}
          {inputMode === 'manual' && (
            <>
              {question.type === 'select' && question.options ? (
                <select
                  value={value}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={question.required}
                >
                  <option value="">Selecciona una opción...</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  value={value}
                  onChange={handleTextChange}
                  placeholder={question.placeholder || 'Escribe tu respuesta aquí...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  required={question.required}
                />
              )}
            </>
          )}

          {/* Grabador de audio */}
          {inputMode === 'audio' && canUseAudio && (
            <div className="space-y-3">
              <AudioRecorder
                onTranscription={handleAudioTranscription}
                className="w-full"
              />
              {value && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800 font-medium">Transcripción:</p>
                  <p className="text-sm text-blue-700 mt-1">{value}</p>
                </div>
              )}
            </div>
          )}

          {/* Contador de caracteres para campos de texto */}
          {(question.type === 'text' || question.type === 'audio') && value && inputMode === 'manual' && (
            <div className="text-right">
              <span className="text-xs text-gray-500">
                {value.length} caracteres
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;