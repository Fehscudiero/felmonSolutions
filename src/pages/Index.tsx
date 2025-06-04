
import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import OwnerDashboard from '@/components/OwnerDashboard';
import EmployeeOrders from '@/components/EmployeeOrders';
import StockManagement from '@/components/StockManagement';
import ExtractReport from '@/components/ExtractReport';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<'owner' | 'employee' | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'stock' | 'extract' | 'orders'>('dashboard');

  const handleLogin = (userType: 'owner' | 'employee') => {
    setCurrentUser(userType);
    setCurrentPage(userType === 'owner' ? 'dashboard' : 'orders');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <OwnerDashboard onPageChange={setCurrentPage} />;
      case 'stock':
        return <StockManagement onPageChange={setCurrentPage} />;
      case 'extract':
        return <ExtractReport onPageChange={setCurrentPage} />;
      case 'orders':
        return <EmployeeOrders />;
      default:
        return <OwnerDashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors z-50"
      >
        Sair
      </button>
    </div>
  );
};

export default Index;
