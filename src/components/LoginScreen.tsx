// src/components/LoginScreen.tsx
import { useState } from 'react';
import { User, Lock, Building, Users } from 'lucide-react';

// IMPORTE AQUI O LOGO
import logo from '../assets/logo.png';
//                 ^ caminho relativo até a pasta assets
//                 ^ se o seu arquivo se chamar diferente, troque "logo.png"

interface LoginScreenProps {
  onLogin: (userType: 'owner' | 'employee') => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedProfile, setSelectedProfile] = useState<'owner' | 'employee' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProfile && username && password) {
      onLogin(selectedProfile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-800 to-black flex pt-6 justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md px-6 py-6 animate-fade-in">
        {/* Logo + Tagline */}
        <div className="text-center mb-6">
          <div className="w-42 h-42 mx-auto mb-2 flex items-center justify-center">
            {/* USANDO A IMAGEM IMPORTADA */}
            <img
              src={logo}
              alt="Logo do Sistema"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Título "Sistema Premium de Gestão" */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-black">Sistema Premium de Gestão</h3>
        </div>

        {/* Seleção de Perfil */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Escolha seu perfil:</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedProfile('owner')}
              className={`
                p-4 rounded-2xl border-2 transition-all duration-300
                ${selectedProfile === 'owner'
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}
              `}
            >
              <Building
                className={`
                  w-8 h-8 mx-auto mb-2
                  ${selectedProfile === 'owner' ? 'text-blue-600' : 'text-gray-400'}
                `}
              />
              <span
                className={`
                  text-sm font-medium
                  ${selectedProfile === 'owner' ? 'text-blue-600' : 'text-gray-600'}
                `}
              >
                Admin
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedProfile('employee')}
              className={`
                p-4 rounded-2xl border-2 transition-all duration-300
                ${selectedProfile === 'employee'
                  ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}
              `}
            >
              <Users
                className={`
                  w-8 h-8 mx-auto mb-2
                  ${selectedProfile === 'employee' ? 'text-green-600' : 'text-gray-400'}
                `}
              />
              <span
                className={`
                  text-sm font-medium
                  ${selectedProfile === 'employee' ? 'text-green-600' : 'text-gray-600'}
                `}
              >
                Funcionário
              </span>
            </button>
          </div>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!selectedProfile || !username || !password}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Entrar
          </button>
        </form>

        {/* Texto de rodapé */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            Sistema seguro e profissional para gestão completa do seu estabelecimento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
