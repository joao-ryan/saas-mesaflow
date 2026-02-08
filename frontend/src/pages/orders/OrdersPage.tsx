import React, { useState } from 'react';
import { Search, Filter, Eye, Clock } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { OrderStatus } from '../../types';

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'TODOS'>('TODOS');

  const getStatusDisplay = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.RECEIVED: return 'Recebido';
      case OrderStatus.PREPARING: return 'Preparando';
      case OrderStatus.READY: return 'Pronto';
      case OrderStatus.DELIVERED: return 'Entregue';
      default: return status;
    }
  };

  const orders = [
    { id: '#PED-1042', table: 'M-04', items: 3, total: 124.50, status: OrderStatus.PREPARING, time: 'há 12 min' },
    { id: '#PED-1043', table: 'M-12', items: 5, total: 210.00, status: OrderStatus.READY, time: 'há 5 min' },
    { id: '#PED-1044', table: 'M-07', items: 2, total: 45.90, status: OrderStatus.RECEIVED, time: 'há 2 min' },
    { id: '#PED-1045', table: 'M-02', items: 4, total: 88.00, status: OrderStatus.DELIVERED, time: 'há 25 min' },
    { id: '#PED-1046', table: 'M-15', items: 1, total: 12.50, status: OrderStatus.PREPARING, time: 'há 15 min' },
  ];

  const filteredOrders = activeTab === 'TODOS' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <PageLayout title="Pedidos Ativos">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('TODOS')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-900 uppercase tracking-widest transition-all ${
              activeTab === 'TODOS'
              ? 'bg-red-600 text-white shadow-xl shadow-red-900/20'
              : 'bg-[#161616] text-neutral-500 border border-[#262626] hover:bg-neutral-800'
            }`}
          >
            TODOS
          </button>
          {Object.values(OrderStatus).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status as any)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-900 uppercase tracking-widest transition-all ${
                activeTab === status
                ? 'bg-red-600 text-white shadow-xl shadow-red-900/20'
                : 'bg-[#161616] text-neutral-500 border border-[#262626] hover:bg-neutral-800'
              }`}
            >
              {getStatusDisplay(status)}
            </button>
          ))}
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0B0B0B] border-b border-[#262626]">
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">ID do Pedido</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Mesa</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Itens</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Total</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Status</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px]">Tempo</th>
                  <th className="px-6 py-5 font-900 text-neutral-500 text-[10px] uppercase tracking-[2px] text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-5 text-sm font-800 text-white tracking-tight">{order.id}</td>
                    <td className="px-6 py-5">
                      <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-[#262626] flex items-center justify-center text-[11px] font-900 text-white">
                        {order.table}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-neutral-400">{order.items} itens</td>
                    <td className="px-6 py-5 text-sm font-900 text-white">R$ {order.total.toFixed(2)}</td>
                    <td className="px-6 py-5">
                      <Badge variant={
                        order.status === OrderStatus.READY ? 'success' :
                        order.status === OrderStatus.PREPARING ? 'warning' :
                        order.status === OrderStatus.DELIVERED ? 'neutral' : 'info'
                      }>
                        {getStatusDisplay(order.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {order.time}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-red-600 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrdersPage;
