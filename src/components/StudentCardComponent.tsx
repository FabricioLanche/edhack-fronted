// components/StudentCard.tsx
import React from 'react';
import type { StudentProgress } from '../interfaces';

interface StudentCardProps {
  student: StudentProgress;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'inicial':
        return 'bg-red-100 text-red-800';
      case 'empezando':
        return 'bg-yellow-100 text-yellow-800';
      case 'logrado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOverallScore = () => {
    const { argumentative, narrative, descriptive } = student.overallStats;
    return Math.round((argumentative + narrative + descriptive) / 3);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200 hover:border-emerald-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl">
            {student.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">Unido el {new Date(student.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(student.currentLevel)}`}>
          {student.currentLevel.charAt(0).toUpperCase() + student.currentLevel.slice(1)}
        </span>
      </div>

      {/* Overall Score */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Puntuación General</span>
          <span className={`text-sm font-bold ${getScoreColor(getOverallScore())}`}>
            {getOverallScore()}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              getOverallScore() >= 80 ? 'bg-green-500' :
              getOverallScore() >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${getOverallScore()}%` }}
          ></div>
        </div>
      </div>

      {/* Text Type Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Argumentativo</span>
          </div>
          <span className={`text-sm font-medium ${getScoreColor(student.overallStats.argumentative)}`}>
            {student.overallStats.argumentative}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Narrativo</span>
          </div>
          <span className={`text-sm font-medium ${getScoreColor(student.overallStats.narrative)}`}>
            {student.overallStats.narrative}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Descriptivo</span>
          </div>
          <span className={`text-sm font-medium ${getScoreColor(student.overallStats.descriptive)}`}>
            {student.overallStats.descriptive}%
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm font-medium">Ver Detalle</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;