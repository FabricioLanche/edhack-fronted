import React, { useState, type JSX } from 'react';
import NavigationButton from '../components/NavigationButton';
import type { RouteType } from '../navigation/NavigationContext';

type TabId = 'dashboard' | 'projects' | 'team' | 'analytics' | 'settings';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

interface HomeScreenProps {
  navigate: (route: RouteType) => void;
}

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: string;
}

interface ProjectCardProps {
  name: string;
  lastUpdate: number;
  index: number;
}

interface TeamMemberProps {
  name: string;
  role: string;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-3xl font-bold text-blue-600 mb-2">{value}</p>
    <p className="text-sm text-gray-600">
      +{change}% desde el mes pasado
    </p>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ name, lastUpdate }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">Último update hace {lastUpdate} días</p>
      </div>
      <div className="flex space-x-2">
        <NavigationButton variant="outline" size="sm">Ver</NavigationButton>
        <NavigationButton variant="primary" size="sm">Editar</NavigationButton>
      </div>
    </div>
  </div>
);

const TeamMember: React.FC<TeamMemberProps> = ({ name, role }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const tabs: Tab[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Proyectos', icon: '📁' },
    { id: 'team', label: 'Equipo', icon: '👥' },
    { id: 'analytics', label: 'Analíticas', icon: '📈' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' }
  ];

  const projects: string[] = ['Hackathon App', 'E-commerce Platform', 'Mobile Dashboard'];
  const teamMembers: Array<{ name: string; role: string }> = [
    { name: 'Ana García', role: 'Desarrollador' },
    { name: 'Carlos López', role: 'Desarrollador' },
    { name: 'María González', role: 'Desarrollador' },
    { name: 'José Martín', role: 'Desarrollador' }
  ];

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, index) => (
                <MetricCard
                  key={index}
                  title={`Métricas ${index + 1}`}
                  value={Math.floor(Math.random() * 1000)}
                  change={Math.floor(Math.random() * 20)}
                  icon="📊"
                />
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Proyectos</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  name={project}
                  lastUpdate={Math.floor(Math.random() * 10) + 1}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mi Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analíticas</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Gráfico de Rendimiento</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico placeholder - Integrar con librería de charts</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Configuración</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              <NavigationButton variant="primary">
                Guardar Cambios
              </NavigationButton>
            </div>
          </div>
        );
      default:
        return <div>Selecciona una pestaña</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Mi Aplicación
            </h1>
            <div className="flex space-x-4">
              <NavigationButton
                to="login"
                navigate={navigate}
                variant="outline"
                size="sm"
              >
                Cerrar Sesión
              </NavigationButton>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;