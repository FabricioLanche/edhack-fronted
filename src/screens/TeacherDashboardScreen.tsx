import React, { useState, useEffect } from 'react';
import type { ScreenProps, TeacherDashboardStats, StudentProgress } from '../interfaces';
import { useUser } from '../navigation/UserContext';

const TeacherDashboardScreen: React.FC<ScreenProps> = ({ navigate }) => {
  const { currentUser } = useUser();
  const [stats, setStats] = useState<TeacherDashboardStats | null>(null);
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'texts'>('overview');

  useEffect(() => {
    // Load mock data
    setStats({
      totalStudents: 25,
      averageProgress: 78.5,
      activeStudents: 18,
      completedActivities: 142,
     levelDistribution: {
        inicial: 8,
        empezando: 12,
        logrado: 5
      },
      textTypePerformance: {
        argumentative: 85.2,
        narrative: 78.6,
        descriptive: 82.1
      }
    });

    setStudents([
      {
        id: 'student-1',
        name: 'Ana García',
        avatar: '👩‍🎓',
        currentLevel: 'logrado',
        overallStats: {
          argumentative: 85,
          narrative: 78,
          descriptive: 92
        },
        activities: [],
        joinedDate: '2024-01-01'
      },
      {
        id: 'student-2',
        name: 'Carlos López',
        avatar: '👨‍🎓',
        currentLevel: 'empezando',
        overallStats: {
          argumentative: 72,
          narrative: 85,
          descriptive: 68
        },
        activities: [],
        joinedDate: '2024-01-02'
      },
      {
        id: 'student-3',
        name: 'María González',
        avatar: '👧',
        currentLevel: 'logrado',
        overallStats: {
          argumentative: 90,
          narrative: 88,
          descriptive: 85
        },
        activities: [],
        joinedDate: '2024-01-10'
      },
      {
        id: 'student-4',
        name: 'José Martín',
        avatar: '👦',
        currentLevel: 'inicial',
        overallStats: {
          argumentative: 45,
          narrative: 50,
          descriptive: 42
        },
        activities: [],
        joinedDate: '2024-01-25'
      },
      {
        id: 'student-5',
        name: 'Laura Fernández',
        avatar: '👩‍🎓',
        currentLevel: 'empezando',
        overallStats: {
          argumentative: 67,
          narrative: 74,
          descriptive: 71
        },
        activities: [],
        joinedDate: '2024-01-12'
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('home')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Ir al inicio"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white text-lg">
                  👨‍🏫
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Dashboard - {currentUser?.name || 'Profesor'}
                  </h1>
                  <p className="text-sm text-gray-500">Panel de Control Educativo</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                📅 {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
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
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Resumen General
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'students'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Estudiantes ({students.length})
            </button>
            <button
              onClick={() => setActiveTab('texts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'texts'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📝 Textos de Lectura
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    ¡Bienvenido, {currentUser?.name || 'Profesor'}! 👋
                  </h2>
                  <p className="text-emerald-100">
                    Aquí tienes un resumen del progreso de tus estudiantes
                  </p>
                </div>
                <div className="text-6xl opacity-20">
                  🎓
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Students */}
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Estudiantes</dt>
                      <dd className="text-2xl font-bold text-gray-900">{stats?.totalStudents}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Average Progress */}
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Progreso Promedio</dt>
                      <dd className="text-2xl font-bold text-gray-900">{stats?.averageProgress}%</dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Active Students */}
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Estudiantes Activos</dt>
                      <dd className="text-2xl font-bold text-gray-900">{stats?.activeStudents}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Completed Activities */}
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Actividades Completadas</dt>
                      <dd className="text-2xl font-bold text-gray-900">{stats?.completedActivities}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Distribution Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución por Nivel de Aprendizaje</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700">🔴 Inicial</span>
                    <span className="text-sm text-gray-600">{stats?.levelDistribution?.inicial} estudiantes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats?.levelDistribution?.inicial || 0) / (stats?.totalStudents || 1) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-700">🟡 En proceso</span>
                    <span className="text-sm text-gray-600">{stats?.levelDistribution?.empezando} estudiantes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-yellow-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats?.levelDistribution?.empezando || 0) / (stats?.totalStudents || 1) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">🟢 Logrado</span>
                    <span className="text-sm text-gray-600">{stats?.levelDistribution?.logrado} estudiantes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${(stats?.levelDistribution?.logrado || 0) / (stats?.totalStudents || 1) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Text Type Performance */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rendimiento por Tipo de Texto</h3>
                <div className="space-y-4">
                  {Object.entries(stats?.textTypePerformance || {}).map(([type, performance]) => (
                    <div key={type}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {type === 'argumentative' && '📝 Argumentativo'}
                          {type === 'narrative' && '📚 Narrativo'}
                          {type === 'descriptive' && '🖼️ Descriptivo'}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${performance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('students')}
                  className="p-4 border-2 border-emerald-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-medium text-gray-900">Ver Estudiantes</div>
                  <div className="text-sm text-gray-600">Revisar progreso individual</div>
                </button>
                
                <button
                  onClick={() => navigate('levels')}
                  className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-medium text-gray-900">Gestionar Niveles</div>
                  <div className="text-sm text-gray-600">Configurar actividades</div>
                </button>
                
                <button
                  onClick={() => navigate('teacher-voice-setup')}
                  className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="text-2xl mb-2">🎤</div>
                  <div className="font-medium text-gray-900">Configurar Voz</div>
                  <div className="text-sm text-gray-600">Ajustar reconocimiento</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Lista de Estudiantes</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{students.length} estudiantes registrados</span>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  ➕ Agregar Estudiante
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div 
                  key={student.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => navigate('student-detail')}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{student.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg">{student.name}</h4>
                        <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                          student.currentLevel === 'logrado' 
                            ? 'bg-green-100 text-green-800' 
                            : student.currentLevel === 'empezando'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.currentLevel === 'logrado' && '🟢 Logrado'}
                          {student.currentLevel === 'empezando' && '🟡 Empezando'}
                          {student.currentLevel === 'inicial' && '🔴 Inicial'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700 text-sm">Rendimiento por tipo:</h5>
                      {Object.entries(student.overallStats).map(([type, score]) => (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 capitalize">
                            {type === 'argumentative' && '📝 Argumentativo'}
                            {type === 'narrative' && '📚 Narrativo'}
                            {type === 'descriptive' && '🖼️ Descriptivo'}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8">{score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 flex items-center justify-between">
                        <span>📅 Unido: {new Date(student.joinedDate).toLocaleDateString('es-ES')}</span>
                        <span className="text-emerald-600 font-medium">👆 Ver detalles</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👨‍🎓</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay estudiantes registrados</h3>
                <p className="text-gray-600 mb-4">Comienza agregando algunos estudiantes a tu clase</p>
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  ➕ Agregar Primer Estudiante
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Textos de Lectura</h2>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                ➕ Crear Nuevo Texto
              </button>
            </div>

            {/* Texto Precargado */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">El Bosque Encantado</h3>
                  <p className="text-sm text-gray-600">Texto narrativo • Nivel: Empezando • Creado: 15 Ene 2024</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    ✏️ Editar
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    👁️ Vista Previa
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-emerald-500">
                <div className="text-gray-800 leading-relaxed">
                  <p className="mb-4">
                    <strong>Había una vez un bosque muy especial</strong> donde los árboles brillaban con luces de colores. 
                    En este lugar mágico vivía una pequeña ardilla llamada Luna, que tenía el pelaje plateado 
                    como la luz de la luna.
                  </p>
                  
                  <p className="mb-4">
                    Cada mañana, Luna despertaba con el canto de los pájaros y salía a explorar el bosque. 
                    Le gustaba saltar de rama en rama, buscando las nueces más brillantes que crecían en 
                    los árboles encantados. Estas nueces especiales tenían diferentes sabores: algunas 
                    sabían a chocolate, otras a miel, y las más raras sabían a arcoíris.
                  </p>
                  
                  <p className="mb-4">
                    Un día, Luna encontró una nuez dorada que nunca había visto antes. Cuando la tocó, 
                    toda la magia del bosque se intensificó: las flores comenzaron a cantar melodías 
                    dulces, los ríos corrían con agua de diferentes colores, y las mariposas dejaban 
                    rastros de purpurina en el aire.
                  </p>
                  
                  <p>
                    Desde ese día, Luna se convirtió en la guardiana del bosque encantado, 
                    protegiendo su magia y compartiendo sus aventuras con todos los animales 
                    que vivían allí. Y colorín colorado, esta historia ha terminado.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Narrativo</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Fantasía</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Nivel Empezando</span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">250 palabras</span>
              </div>
            </div>

            {/* Herramientas de Creación */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Herramientas de Creación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📖</div>
                    <h4 className="font-medium text-gray-900 mb-1">Texto Narrativo</h4>
                    <p className="text-sm text-gray-600">Crea cuentos e historias</p>
                  </div>
                </div>
                
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📝</div>
                    <h4 className="font-medium text-gray-900 mb-1">Texto Descriptivo</h4>
                    <p className="text-sm text-gray-600">Describe personas, lugares u objetos</p>
                  </div>
                </div>
                
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💭</div>
                    <h4 className="font-medium text-gray-900 mb-1">Texto Argumentativo</h4>
                    <p className="text-sm text-gray-600">Presenta ideas y argumentos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Textos Disponibles */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Textos Disponibles</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌟</div>
                    <div>
                      <h4 className="font-medium text-gray-900">El Bosque Encantado</h4>
                      <p className="text-sm text-gray-600">Narrativo • Nivel Empezando • 250 palabras</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">Ver</button>
                    <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">Usar</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🏰</div>
                    <div>
                      <h4 className="font-medium text-gray-900">El Castillo Misterioso</h4>
                      <p className="text-sm text-gray-600">Descriptivo • Nivel Inicial • 180 palabras</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">Ver</button>
                    <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">Usar</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌱</div>
                    <div>
                      <h4 className="font-medium text-gray-900">La Importancia del Reciclaje</h4>
                      <p className="text-sm text-gray-600">Argumentativo • Nivel Logrado • 320 palabras</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">Ver</button>
                    <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">Usar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboardScreen;