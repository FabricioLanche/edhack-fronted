import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import NavigationButton from '../components/NavigationButton';
import type { RouteType } from '../navigation/NavigationContext';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginScreenProps {
  navigate: (route: RouteType) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigate }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Login attempt:', formData);
    // Por ahora, navegar directamente al home
    navigate('home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido
          </h2>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <NavigationButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Iniciar Sesión
          </NavigationButton>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        {/* Demo navigation buttons */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3 text-center">Demo Navigation:</p>
          <NavigationButton
            to="home"
            navigate={navigate}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Ir al Home (Demo)
          </NavigationButton>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;