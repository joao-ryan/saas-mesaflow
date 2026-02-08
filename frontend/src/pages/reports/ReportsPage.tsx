import React from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const salesByCategory = [
  { name: 'Pizzas', value: 4500 },
  { name: 'Bebidas', value: 2100 },
  { name: 'Massas', value: 3200 },
  { name: 'Sobremesas', value: 1200 },
];

const COLORS = ['#dc2626', '#f97316', '#facc15', '#475569'];

const ReportsPage: React.FC = () => {
  return (
    <PageLayout title="Relatórios Analíticos">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-[#262626] font-bold uppercase tracking-widest text-[10px]">
            <Calendar className="w-4 h-4 mr-2" /> Este Mês
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-[#262626] font-bold uppercase tracking-widest text-[10px]">
            <Filter className="w-4 h-4 mr-2" /> Todas Categorias
          </Button>
        </div>
        <Button variant="secondary" className="w-full md:w-auto bg-white text-black hover:bg-neutral-200 rounded-xl font-900 uppercase tracking-widest text-[10px] px-8 py-4">
          <Download className="w-4 h-4 mr-2" /> Exportar PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card title="Vendas por Categoria" className="lg:col-span-1">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Pratos Mais Vendidos" className="lg:col-span-2">
          <div className="space-y-4">
            {[
              { name: 'Pizza Margherita', sales: 412, revenue: 'R$ 24.102', growth: '+12%' },
              { name: 'Pasta de Trufas', sales: 285, revenue: 'R$ 23.940', growth: '+5%' },
              { name: 'Vinho Tinto', sales: 520, revenue: 'R$ 18.200', growth: '+18%' },
              { name: 'Steak Ribeye', sales: 142, revenue: 'R$ 16.756', growth: '-2%' },
              { name: 'Tiramisu', sales: 210, revenue: 'R$ 6.195', growth: '+8%' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#0B0B0B] border border-[#262626] rounded-2xl hover:border-neutral-700 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#262626] flex items-center justify-center font-900 text-neutral-500 text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-900 text-white tracking-tight uppercase text-xs">{item.name}</h5>
                    <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{item.sales} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-900 text-white tracking-tighter">{item.revenue}</p>
                  <p className={`text-[10px] font-900 uppercase tracking-widest ${item.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Receita Projetada vs Real" subtitle="Desempenho financeiro comparado às metas semanais">
         <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Semana 1', real: 4000, projetado: 4200 },
                { name: 'Semana 2', real: 3000, projetado: 3500 },
                { name: 'Semana 3', real: 6000, projetado: 5000 },
                { name: 'Semana 4', real: 8000, projetado: 7500 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 10, fontWeight: 700}} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#161616', border: '1px solid #262626', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="real" stroke="#dc2626" strokeWidth={4} dot={{ r: 4, fill: '#dc2626' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="projetado" stroke="#404040" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </Card>
    </PageLayout>
  );
};

export default ReportsPage;
