import { useState } from 'react';
import { Search, Plus, Minus, ShoppingCart, CreditCard, Check } from 'lucide-react';

const EmployeeOrders = () => {
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'waiting' | 'approved'>('idle');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Cerveja Brahma 1LT', price: 18.0, category: 'Bebidas', barcode: '12345' },
    { id: 2, name: 'Cerveja BudWeiser 1LT', price: 18.0, category: 'Bebidas', barcode: '12346' },
    { id: 3, name: 'Cerveja Corona 600ml', price: 20.0, category: 'Bebidas', barcode: '12347' },
    { id: 4, name: 'Cerveja Heineken 600ml', price: 18.0, category: 'Bebidas', barcode: '12348' },
    { id: 5, name: 'Energético Red Bull', price: 15.0, category: 'Bebidas', barcode: '12349' },
    { id: 6, name: 'Dose de GIN Ethernet', price: 16.0, category: 'Doces', barcode: '12350' },
    { id: 7, name: 'Dose de GIN Tanqueray', price: 25.0, category: 'Bebidas', barcode: '12351' },
    { id: 8, name: 'Narguile', price: 15.0, category: 'Tabacaria', barcode: '12352' },
    { id: 9, name: 'Rosh', price: 8.0, category: 'Tabacaria', barcode: '12353' },
    { id: 10, name: 'Seda', price: 6.0, category: 'Tabacaria', barcode: '12354' },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm)
  );

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            // Se nova quantidade for maior que zero, atualiza; se for menor ou igual a zero, devolve null para filtrarmos depois.
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        // Filtra somente itens que não sejam null
        .filter((item): item is { id: number; name: string; price: number; quantity: number } => item !== null);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinishOrder = () => {
    setPaymentStatus('waiting');
    setTimeout(() => {
      setPaymentStatus('approved');
      setTimeout(() => {
        setCart([]);
        setPaymentStatus('idle');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Products Section */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Pedidos</h1>
          <p className="text-gray-500">Selecione os produtos para venda</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar produto ou código de barras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl mb-3 flex items-center justify-center">
                <span className="text-2xl">🍺</span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
              <p className="font-bold text-green-600">R$ {product.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 bg-white shadow-xl p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Carrinho</h2>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Carrinho vazio</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                    <p className="font-semibold text-gray-800">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-gray-800 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)} cada</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-green-600">R$ {total.toFixed(2)}</span>
              </div>

              {paymentStatus === 'idle' && (
                <button
                  onClick={handleFinishOrder}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finalizar Pedido
                </button>
              )}

              {paymentStatus === 'waiting' && (
                <div className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Aguardando maquininha...
                </div>
              )}

              {paymentStatus === 'approved' && (
                <div className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center">
                  <Check className="w-5 h-5 mr-2" />
                  Pagamento aprovado!
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeOrders;
