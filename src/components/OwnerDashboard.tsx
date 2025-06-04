
import { TrendingUp, Package, AlertTriangle, FileText, Upload, DollarSign, BarChart3, Medal, Eye } from 'lucide-react';

interface OwnerDashboardProps {
  onPageChange: (page: 'dashboard' | 'stock' | 'extract' | 'orders') => void;
}

const OwnerDashboard = ({ onPageChange }: OwnerDashboardProps) => {
  const topProducts = [
    { name: 'Cerveja Brahma', sales: 85, icon: '🍺', rank: 1 },
    { name: 'Água 500ml', sales: 72, icon: '💧', rank: 2 },
    { name: 'Energético Red Bull', sales: 58, icon: '⚡', rank: 3 },
    { name: 'Refrigerante Coca', sales: 45, icon: '🥤', rank: 4 },
  ];

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-yellow-600';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Visão geral do seu bar</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Lucro Hoje</p>
              <h3 className="text-3xl font-bold">R$ 1.247,50</h3>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% vs ontem</span>
              </div>
            </div>
            <DollarSign className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Vendas Hoje</p>
              <h3 className="text-3xl font-bold">147</h3>
              <div className="flex items-center mt-2">
                <BarChart3 className="w-4 h-4 mr-1" />
                <span className="text-sm">+8% vs ontem</span>
              </div>
            </div>
            <BarChart3 className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução das Vendas</h3>
        <div className="h-48 bg-gradient-to-t from-blue-50 to-transparent rounded-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/20 to-blue-500/5 rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 text-sm text-gray-500">
            Últimos 7 dias - Tendência: +15%
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Medal className="w-5 h-5 text-yellow-500 mr-2" />
          Produtos Mais Vendidos
        </h3>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="relative">
                  <span className="text-2xl mr-3">{product.icon}</span>
                  <Medal className={`absolute -top-1 -right-1 w-4 h-4 ${getMedalColor(product.rank)}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">#{product.rank} mais vendido</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{product.sales}</p>
                <p className="text-sm text-gray-500">vendas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Alert */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg mb-6">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          <div>
            <h2 className="font-semibold">Alerta de Estoque</h2>
            <p className="text-sm opacity-90">3 produtos com estoque baixo</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onPageChange('extract')}
          className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FileText className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Extrato</h3>
          <p className="text-sm text-gray-500">Ver movimentações</p>
        </button>

        <button
          onClick={() => onPageChange('stock')}
          className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Package className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Estoque</h3>
          <p className="text-sm text-gray-500">Gerenciar produtos</p>
        </button>

        <button className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Upload className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Importar NF</h3>
          <p className="text-sm text-gray-500">Adicionar produtos</p>
        </button>
      </div>
    </div>
  );
};

export default OwnerDashboard;
