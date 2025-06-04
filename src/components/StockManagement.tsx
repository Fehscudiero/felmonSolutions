
import { useState } from 'react';
import { Package, AlertTriangle, Upload, Search, ArrowLeft, Camera, FileText } from 'lucide-react';

interface StockManagementProps {
  onPageChange: (page: 'dashboard' | 'stock' | 'extract' | 'orders') => void;
}

const StockManagement = ({ onPageChange }: StockManagementProps) => {
  const [showImportFlow, setShowImportFlow] = useState(false);
  const [importStep, setImportStep] = useState<'upload' | 'review' | 'confirm'>('upload');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Cerveja Brahma 350ml', stock: 24, unit: 'unidades', lowStock: false, image: '🍺' },
    { id: 2, name: 'Água 500ml', stock: 3, unit: 'unidades', lowStock: true, image: '💧' },
    { id: 3, name: 'Energético Red Bull', stock: 15, unit: 'unidades', lowStock: false, image: '⚡' },
    { id: 4, name: 'Refrigerante Coca 2L', stock: 2, unit: 'unidades', lowStock: true, image: '🥤' },
    { id: 5, name: 'Salgadinho Doritos', stock: 8, unit: 'pacotes', lowStock: false, image: '🥨' },
  ];

  const importedItems = [
    { name: 'Cerveja Brahma 350ml', quantity: '20 caixas', recognized: true },
    { name: 'Energético Red Bull', quantity: '17 engradados', recognized: true },
    { name: 'Água 500ml', quantity: '5 fardos', recognized: true },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ImportFlow = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Importar Nota Fiscal</h2>
          <button
            onClick={() => setShowImportFlow(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {importStep === 'upload' && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 mb-6 hover:border-blue-500 transition-colors">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Envie sua nota fiscal</h3>
              <p className="text-gray-500 mb-4">Arraste e solte ou clique para selecionar</p>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Tirar Foto</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Selecionar PDF</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setImportStep('review')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              Processar Nota Fiscal
            </button>
          </div>
        )}

        {importStep === 'review' && (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">✅ Nota fiscal processada com sucesso!</h3>
              <p className="text-green-700 text-sm">Reconhecemos automaticamente os seguintes itens:</p>
            </div>

            <div className="space-y-3 mb-6">
              {importedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 text-sm">✓ Reconhecido</span>
                    <button className="text-blue-500 text-sm hover:text-blue-700">Editar</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setImportStep('upload')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => setImportStep('confirm')}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Confirmar e Dar Entrada
              </button>
            </div>
          </div>
        )}

        {importStep === 'confirm' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Entrada realizada!</h3>
            <p className="text-gray-600 mb-6">Os produtos foram adicionados ao seu estoque com sucesso.</p>
            <button
              onClick={() => {
                setShowImportFlow(false);
                setImportStep('upload');
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );

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
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Estoque</h1>
          <p className="text-gray-500">Controle completo dos seus produtos</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Total de Produtos</p>
              <p className="text-2xl font-bold text-gray-800">245</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Estoque Baixo</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center">
            <Upload className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Entradas Hoje</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Produtos em Estoque</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">{product.image}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className={`font-bold text-lg ${product.lowStock ? 'text-red-600' : 'text-gray-800'}`}>
                      {product.stock}
                    </span>
                    {product.lowStock && (
                      <AlertTriangle className="w-5 h-5 text-red-500 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {product.lowStock ? 'Estoque baixo!' : 'Em estoque'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import FAB */}
      <button
        onClick={() => setShowImportFlow(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-green-500 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        <Upload className="w-8 h-8" />
      </button>

      {showImportFlow && <ImportFlow />}
    </div>
  );
};

export default StockManagement;
