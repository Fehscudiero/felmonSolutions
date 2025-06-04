
import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Filter, Download, Calendar } from 'lucide-react';

interface ExtractReportProps {
  onPageChange: (page: 'dashboard' | 'stock' | 'extract' | 'orders') => void;
}

const ExtractReport = ({ onPageChange }: ExtractReportProps) => {
  const [filterType, setFilterType] = useState<'all' | 'entrada' | 'saida'>('all');
  const [dateFilter, setDateFilter] = useState('today');

  const transactions = [
    { id: 1, type: 'entrada', description: 'Venda - Cerveja Brahma', amount: 4.50, time: '14:30', icon: '💰', color: 'text-green-600' },
    { id: 2, type: 'entrada', description: 'Venda - Água 500ml', amount: 2.00, time: '14:28', icon: '💰', color: 'text-green-600' },
    { id: 3, type: 'saida', description: 'Compra - Fornecedor XYZ', amount: -150.00, time: '10:15', icon: '🛒', color: 'text-red-600' },
    { id: 4, type: 'entrada', description: 'Venda - Energético Red Bull', amount: 8.00, time: '13:45', icon: '💰', color: 'text-green-600' },
    { id: 5, type: 'saida', description: 'Despesa - Energia Elétrica', amount: -85.00, time: '09:00', icon: '⚡', color: 'text-red-600' },
    { id: 6, type: 'entrada', description: 'Venda - Refrigerante Coca', amount: 3.50, time: '12:20', icon: '💰', color: 'text-green-600' },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  const totalEntradas = transactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSaidas = Math.abs(transactions
    .filter(t => t.type === 'saida')
    .reduce((sum, t) => sum + t.amount, 0));

  const saldo = totalEntradas - totalSaidas;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => onPageChange('dashboard')}
          className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Extrato Financeiro</h1>
          <p className="text-gray-500">Todas as movimentações do seu bar</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Entradas</p>
              <h3 className="text-2xl font-bold">R$ {totalEntradas.toFixed(2)}</h3>
            </div>
            <TrendingUp className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Saídas</p>
              <h3 className="text-2xl font-bold">R$ {totalSaidas.toFixed(2)}</h3>
            </div>
            <TrendingDown className="w-10 h-10 text-red-200" />
          </div>
        </div>

        <div className={`bg-gradient-to-br ${saldo >= 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-3xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Saldo</p>
              <h3 className="text-2xl font-bold">R$ {saldo.toFixed(2)}</h3>
            </div>
            <div className={`w-10 h-10 rounded-full ${saldo >= 0 ? 'bg-blue-200' : 'bg-orange-200'} flex items-center justify-center`}>
              <span className="text-2xl">{saldo >= 0 ? '📈' : '📉'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Movimentações</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="w-full h-full rounded-full border-8 border-green-500" style={{
              background: `conic-gradient(#10b981 0% ${(totalEntradas / (totalEntradas + totalSaidas)) * 100}%, #ef4444 ${(totalEntradas / (totalEntradas + totalSaidas)) * 100}% 100%)`
            }}></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{Math.round((totalEntradas / (totalEntradas + totalSaidas)) * 100)}%</p>
                <p className="text-sm text-gray-500">Entradas</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Entradas</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Saídas</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filtros:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Hoje</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mês</option>
            </select>
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Movimentações Recentes</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">{transaction.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{transaction.description}</h4>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-lg ${transaction.color}`}>
                    {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtractReport;
