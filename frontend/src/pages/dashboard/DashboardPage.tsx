import React from 'react';
import {
  Users,
  Receipt,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const revenueData = [
  { name: 'Seg', total: 2400 },
  { name: 'Ter', total: 1398 },
  { name: 'Qua', total: 9800 },
  { name: 'Qui', total: 3908 },
  { name: 'Sex', total: 4800 },
  { name: 'Sáb', total: 3800 },
  { name: 'Dom', total: 4300 },
];

const DashboardPage: React.FC = () => {
  return (
    <PageLayout title="Painel Estratégico">
      {/* Grid de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Receita', value: 'R$ 12.845', growth: '+12.5%', icon: DollarSign, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Ocupação', value: '14 / 20', growth: '70% Taxa', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Pedidos', value: '142', growth: '-3%', icon: Receipt, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Tempo de Espera', value: '18 min', growth: '-2 min', icon: Clock, color: 'text-neutral-400', bg: 'bg-neutral-800' },
        ].map((stat, i) => (
          <Card key={i} className="group hover:border-red-600 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-900 text-neutral-500 mb-1 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-900 text-white tracking-tighter">{stat.value}</h3>
                <div className={`flex items-center gap-1 mt-2 ${stat.growth.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <span className="text-[10px] font-bold uppercase">{stat.growth}</span>
                </div>
              </div>
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card title="Velocidade de Vendas" subtitle="Monitoramento em tempo real do fluxo de receita">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10, fontWeight: 700}} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px' }}
                  itemStyle={{ color: '#E5E5E5', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="total" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Operações Ativas" subtitle="Pedidos em andamento e status das mesas">
          <div className="space-y-4">
             {[
               { table: 'M-04', customer: 'Evento Privado', amount: 'R$ 420,00', status: 'Entregue' },
               { table: 'M-12', customer: 'Sarah M.', amount: 'R$ 74,50', status: 'Preparando' },
               { table: 'M-02', customer: 'David L.', amount: 'R$ 32,00', status: 'Pronto' },
               { table: 'M-09', customer: 'Reserva', amount: 'R$ 0,00', status: 'Recebido' },
             ].map((order, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-[#0B0B0B] rounded-2xl border border-[#262626] hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#262626] flex items-center justify-center font-900 text-white text-xs tracking-tighter uppercase">
                      {order.table}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-tight">{order.customer}</p>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{order.amount}</p>
                    </div>
                  </div>
                  <Badge variant={order.status === 'Pronto' ? 'success' : order.status === 'Preparando' ? 'warning' : order.status === 'Entregue' ? 'neutral' : 'info'}>
                    {order.status}
                  </Badge>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
