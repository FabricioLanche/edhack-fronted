"use client"

// screens/StudentDetailScreen.tsx
import type React from "react"
import { useState, useEffect } from "react"
import type { ScreenProps, StudentProgress, ActivityResult } from "../interfaces"

interface StudentDetailScreenProps extends ScreenProps {
  studentId: string
}

const StudentDetailScreen: React.FC<StudentDetailScreenProps> = ({ navigate, studentId }) => {
  const [student, setStudent] = useState<StudentProgress | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'progress'>('overview');
  const [selectedActivity, setSelectedActivity] = useState<ActivityResult | null>(null);

  useEffect(() => {
    // Mock student data with detailed activities
    const mockActivities: ActivityResult[] = [
      {
        id: 'activity_1',
        activityNumber: 3,
        textType: 'argumentative',
        score: 85,
        date: '2024-02-10',
        timeSpent: 25,
        chatTranscript: [
          { role: 'assistant', message: 'Hola Ana, vamos a trabajar con un texto argumentativo sobre el cambio climático. ¿Estás lista?', timestamp: '10:00:00' },
          { role: 'user', message: 'Sí, estoy lista para comenzar.', timestamp: '10:00:15' },
          { role: 'assistant', message: 'Perfecto. Lee este texto y luego te haré algunas preguntas sobre los argumentos principales.', timestamp: '10:00:20' },
          { role: 'user', message: 'El autor menciona tres causas principales del cambio climático: las emisiones de CO2, la deforestación y la industria.', timestamp: '10:03:45' },
          { role: 'assistant', message: '¡Excelente! Has identificado correctamente los argumentos principales. ¿Puedes explicar cómo se conectan estos argumentos?', timestamp: '10:03:50' },
          { role: 'user', message: 'Todos estos factores aumentan los gases de efecto invernadero en la atmósfera, lo que causa el calentamiento global.', timestamp: '10:04:30' },
        ]
      },
      {
        id: 'activity_2',
        activityNumber: 2,
        textType: 'narrative',
        score: 92,
        date: '2024-02-08',
        timeSpent: 18,
        chatTranscript: [
          { role: 'assistant', message: 'Ahora trabajaremos con un cuento. Lee la historia sobre María y su aventura en el bosque.', timestamp: '14:30:00' },
          { role: 'user', message: 'Ya terminé de leer. Es una historia muy interesante.', timestamp: '14:35:20' },
          { role: 'assistant', message: '¿Quién es el personaje principal y qué problema enfrenta?', timestamp: '14:35:25' },
          { role: 'user', message: 'María es la protagonista y se pierde en el bosque mientras busca flores para su abuela.', timestamp: '14:36:10' },
        ]
      },
      {
        id: 'activity_3',
        activityNumber: 1,
        textType: 'descriptive',
        score: 78,
        date: '2024-02-05',
        timeSpent: 22,
        chatTranscript: [
          { role: 'assistant', message: 'Vamos a analizar una descripción del océano. Lee con atención los detalles.', timestamp: '16:15:00' },
          { role: 'user', message: 'Listo, he leído la descripción completa.', timestamp: '16:18:30' },
          { role: 'assistant', message: '¿Qué sentimientos te transmite esta descripción?', timestamp: '16:18:35' },
          { role: 'user', message: 'Me transmite tranquilidad y asombro por la belleza del mar.', timestamp: '16:19:15' },
        ]
      }
    ];

    const mockStudent: StudentProgress = {
      id: studentId || '1',
      name: 'Ana García',
      avatar: '👧',
      currentLevel: 'logrado',
      overallStats: { argumentative: 85, narrative: 92, descriptive: 78 },
      activities: mockActivities,
      joinedDate: '2024-01-15'
    };

    setStudent(mockStudent);
  }, [studentId]);

  const handleGoBack = (): void => {
    navigate('teacher-dashboard');
  };

  const handleActivityClick = (activity: ActivityResult): void => {
    setSelectedActivity(activity);
  };

  const handleCloseActivityDetail = (): void => {
    setSelectedActivity(null);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-lg">
                  {student.avatar}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
                  <p className="text-sm text-gray-500">Detalle del estudiante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activities'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Actividades
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Progreso
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Student Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Generales</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{student.overallStats.argumentative}%</div>
                  <div className="text-sm text-gray-600">Textos Argumentativos</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{student.overallStats.narrative}%</div>
                  <div className="text-sm text-gray-600">Textos Narrativos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{student.overallStats.descriptive}%</div>
                  <div className="text-sm text-gray-600">Textos Descriptivos</div>
                </div>
              </div>
            </div>

            {/* Current Level */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Nivel Actual</h2>
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  student.currentLevel === 'logrado' 
                    ? 'bg-green-100 text-green-800'
                    : student.currentLevel === 'empezando'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {student.currentLevel.charAt(0).toUpperCase() + student.currentLevel.slice(1)}
                </div>
                <div className="text-gray-600">Desde: {student.joinedDate}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Actividades Realizadas</h2>
            {student.activities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Actividad {activity.activityNumber}</h3>
                    <p className="text-sm text-gray-600 capitalize">{activity.textType}</p>
                    <p className="text-sm text-gray-500">{activity.date} • {activity.timeSpent} min</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.score >= 90 
                      ? 'bg-green-100 text-green-800'
                      : activity.score >= 80
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Progreso Detallado</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Evolución por Tipo de Texto</h3>
              <div className="space-y-4">
                {['argumentative', 'narrative', 'descriptive'].map((type) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{type}</span>
                      <span>{student.overallStats[type as keyof typeof student.overallStats]}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full" 
                        style={{ width: `${student.overallStats[type as keyof typeof student.overallStats]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">Actividad {selectedActivity.activityNumber}</h2>
                    <p className="text-gray-600 capitalize">{selectedActivity.textType} • {selectedActivity.date}</p>
                  </div>
                  <button
                    onClick={handleCloseActivityDetail}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-medium mb-4">Conversación</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedActivity.chatTranscript.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailScreen;
