import React from 'react';
import { Plus, Search, Filter, Users2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TableStatus } from '../../types';

const TablesPage: React.FC = () => {
  const getStatusDisplay = (status: TableStatus) => {
    switch(status) {
      case TableStatus.FREE: return 'Livre';
      case TableStatus.OCCUPIED: return 'Ocupada';
      case TableStatus.WAITING_PAYMENT: return 'Aguardando Pagamento';
      default: return status;
    }
  };

  const tables = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    number: `M-${(i + 1).toString().padStart(2, '0')}`,
    capacity: i % 3 === 0 ? 6 : i % 2 === 0 ? 4 : 2,
    status: i % 5 === 0 ? TableStatus.OCCUPIED : i % 7 === 0 ? TableStatus.WAITING_PAYMENT : TableStatus.FREE,
    lastActive: 'há 15 min'
  }));

  return (
    <PageLayout title="Gestão de Mesas">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <div className="flex items-center gap-4 bg-[#161616] p-2 rounded-xl border border-[#262626] shadow-sm w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
            <input
              type="text"
              placeholder="Buscar número da mesa..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 text-white"
            />
          </div>
          <div className="h-6 w-px bg-[#262626]"></div>
          <Button variant="ghost" size="sm" className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
        </div>

        <Button variant="primary" className="font-bold uppercase tracking-widest text-xs rounded-xl px-6">
          <Plus className="w-4 h-4 mr-2" /> Nova Mesa
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className="hover:border-red-600 transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                table.status === TableStatus.FREE ? 'bg-emerald-500/10 text-emerald-500' :
                table.status === TableStatus.OCCUPIED ? 'bg-orange-500/10 text-orange-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                <Users2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-900 text-white mb-1 tracking-tighter">{table.number}</h4>
              <p className="text-[10px] text-neutral-500 mb-4 font-bold uppercase tracking-widest">Capacidade: {table.capacity} pessoas</p>

              <Badge variant={
                table.status === TableStatus.FREE ? 'success' :
                table.status === TableStatus.OCCUPIED ? 'warning' : 'info'
              }>
                {getStatusDisplay(table.status)}
              </Badge>

              <div className="w-full mt-6 pt-4 border-t border-[#262626] flex items-center justify-center">
                 <Button variant="ghost" size="sm" fullWidth className="group-hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-[10px]">
                   Gerenciar Mesa
                 </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default TablesPage;
