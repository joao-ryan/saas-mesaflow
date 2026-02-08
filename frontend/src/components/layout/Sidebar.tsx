
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BookOpen,
  Package,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useUIStore } from '../../store/ui.store';
import { useAuthStore } from '../../store/auth.store';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Mesas', icon: UtensilsCrossed, path: '/tables' },
    { name: 'Pedidos', icon: ClipboardList, path: '/orders' },
    { name: 'Cardápio', icon: BookOpen, path: '/menu' },
    { name: 'Estoque', icon: Package, path: '/stock' },
    { name: 'Relatórios', icon: BarChart3, path: '/reports' },
    { name: 'Configurações', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplay = (role?: string) => {
    switch(role) {
      case 'ADMIN': return 'Administrador';
      case 'WAITER': return 'Garçom';
      case 'KITCHEN': return 'Cozinha';
      default: return role;
    }
  };

  return (
    <aside className={`fixed top-0 left-0 h-full bg-[#111111] text-white transition-all duration-500 z-50 flex flex-col border-r border-[#262626] ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-900/30">
            <Flame className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && <span className="text-xl font-900 tracking-tighter uppercase italic whitespace-nowrap">MesaFlow</span>}
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1.5">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative
              ${isActive ? 'bg-red-600 text-white shadow-2xl shadow-red-900/40 translate-x-1' : 'text-neutral-500 hover:bg-neutral-800/50 hover:text-white'}
            `}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`} />
            {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">{item.name}</span>}
            {!isSidebarOpen && (
               <div className="absolute left-full ml-4 px-3 py-2 bg-black border border-[#262626] text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg z-[100]">
                 {item.name}
               </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className={`bg-[#161616] border border-[#262626] rounded-2xl p-4 mb-4 transition-all ${isSidebarOpen ? '' : 'p-2'}`}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center text-sm font-900 flex-shrink-0 shadow-lg">
               {user?.name?.[0]}
             </div>
             {isSidebarOpen && (
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate tracking-tight">{user?.name}</p>
                 <p className="text-[10px] text-neutral-600 truncate font-800 uppercase tracking-widest">{getRoleDisplay(user?.role)}</p>
               </div>
             )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-neutral-500 hover:bg-rose-900/20 hover:text-rose-400 transition-all group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">Sair</span>}
        </button>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-12 bg-red-600 text-white rounded-full p-1.5 shadow-2xl border-4 border-[#0B0B0B] hidden md:block z-[60] hover:scale-110 transition-transform"
      >
        {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;
