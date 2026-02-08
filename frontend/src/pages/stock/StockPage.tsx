import React from 'react';
import { Package, AlertTriangle, ArrowUpDown } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const StockPage: React.FC = () => {
  const stockItems = [
    { id: 1, name: 'Farinha de Trigo', quantity: 45, unit: 'kg', minThreshold: 20 },
    { id: 2, name: 'Queijo Muçarela', quantity: 8, unit: 'kg', minThreshold: 10 },
    { id: 3, name: 'Molho de Tomate', quantity: 15, unit: 'L', minThreshold: 10 },
    { id: 4, name: 'Azeite Extra Virgem', quantity: 4, unit: 'L', minThreshold: 5 },
    { id: 5, name: 'Barriga de Porco', quantity: 12, unit: 'kg', minThreshold: 8 },
    { id: 6, name: 'Manjericão Fresco', quantity: 0.5, unit: 'kg', minThreshold: 1 },
  ];

  return (
    <PageLayout title="Inventário & Estoque">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-orange-600 border-none text-white shadow-xl shadow-orange-900/20">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <p className="text-orange-200 text-[10px] font-900 uppercase tracking-widest">Total de Itens</p>
              <h3 className="text-4xl font-900 tracking-tighter">124</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-red-700 border-none text-white shadow-xl shadow-red-900/20">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-red-200 text-[10px] font-900 uppercase tracking-widest">Alertas de Estoque</p>
              <h3 className="text-4xl font-900 tracking-tighter">8</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-[#161616] border border-[#262626] text-white">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-neutral-800 rounded-2xl">
              <ArrowUpDown className="w-8 h-8 text-neutral-400" />
            </div>
            <div>
              <p className="text-neutral-500 text-[10px] font-900 uppercase tracking-widest">Giro Mensal</p>
              <h3 className="text-4xl font-900 tracking-tighter text-white">84%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Lista de Insumos" className="p-0 overflow-hidden border-[#262626]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0B0B0B] border-b border-[#262626]">
                <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Ingrediente</th>
                <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Em Estoque</th>
                <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Limite Mínimo</th>
                <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Status</th>
                <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {stockItems.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-800 text-white tracking-tight">{item.name}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-neutral-400">{item.quantity} {item.unit}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-neutral-600">{item.minThreshold} {item.unit}</span>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={item.quantity > item.minThreshold ? 'success' : 'error'}>
                      {item.quantity > item.minThreshold ? 'Saudável' : 'Estoque Baixo'}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl border-[#262626] font-bold text-[10px] uppercase tracking-widest">Ajustar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  );
};

export default StockPage;
