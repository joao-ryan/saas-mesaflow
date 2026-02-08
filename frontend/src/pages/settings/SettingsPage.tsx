import React, { useState } from 'react';
import { User as UserIcon, Store, Bell, Shield, CreditCard, Camera, Mail, Phone, MapPin, Globe } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth.store';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Perfil');

  const tabs = [
    { name: 'Perfil', icon: UserIcon },
    { name: 'Restaurante', icon: Store },
    { name: 'Notificações', icon: Bell },
    { name: 'Segurança', icon: Shield },
    { name: 'Pagamento', icon: CreditCard },
  ];

  return (
    <PageLayout title="Configurações">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navegação Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === item.name
                ? 'bg-red-600 text-white shadow-xl shadow-red-900/20'
                : 'text-neutral-500 hover:bg-[#161616] hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-white' : 'text-neutral-600'}`} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Área de Conteúdo */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'Perfil' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <Card title="Perfil do Usuário" subtitle="Gerencie sua identidade pessoal e preferências do sistema.">
                <div className="flex flex-col md:flex-row items-start gap-10">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-4xl font-900 text-white shadow-2xl">
                      {user?.name?.[0]}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2.5 bg-[#262626] border border-[#333] rounded-xl text-white hover:bg-red-600 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                      <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Nome Completo</label>
                      <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-semibold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Assinatura de Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-semibold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Telefone de Contato</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          placeholder="+55 (11) 00000-0000"
                          className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-semibold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Cargo no Sistema</label>
                      <input
                        type="text"
                        readOnly
                        defaultValue={user?.role === 'ADMIN' ? 'Administrador' : user?.role}
                        className="w-full px-5 py-3.5 bg-[#1F1F1F] border border-[#262626] rounded-2xl text-neutral-500 font-bold uppercase tracking-widest cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-[#262626] flex justify-end gap-3">
                  <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs">Resetar</Button>
                  <Button variant="primary" className="rounded-xl px-8 font-900 uppercase tracking-widest">Atualizar Identidade</Button>
                </div>
              </Card>

              <Card title="Preferências do Sistema">
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-[#262626]">
                    <div>
                      <p className="font-bold text-white uppercase tracking-wider text-sm">Idioma da Interface</p>
                      <p className="text-xs text-neutral-500 mt-1">Selecione o idioma principal do painel.</p>
                    </div>
                    <select className="bg-[#0B0B0B] border border-[#262626] rounded-xl px-4 py-2 text-sm font-bold text-neutral-400 outline-none focus:ring-1 focus:ring-red-600">
                      <option>Português (BR)</option>
                      <option>English (US)</option>
                      <option>Spanish (ES)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-bold text-white uppercase tracking-wider text-sm">Intensidade do Modo Escuro</p>
                      <p className="text-xs text-neutral-500 mt-1">Alternar entre preto profundo e cinza meia-noite.</p>
                    </div>
                    <div className="flex bg-[#0B0B0B] p-1 border border-[#262626] rounded-xl">
                      <button className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold uppercase">Deep</button>
                      <button className="px-4 py-1.5 text-neutral-600 rounded-lg text-xs font-bold uppercase">Soft</button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'Restaurante' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <Card title="Dados do Restaurante" subtitle="Detalhes operacionais e informações públicas.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Nome do Estabelecimento</label>
                    <div className="relative group">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        defaultValue="Bella Italia Gourmet"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:ring-2 focus:ring-red-600 outline-none transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Endereço Físico</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        defaultValue="Rua da Gastronomia, 123, São Paulo - SP"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:ring-2 focus:ring-red-600 outline-none transition-all font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-900 text-neutral-500 uppercase tracking-[2px]">Site Oficial</label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-700 group-focus-within:text-red-500 transition-colors" />
                      <input
                        type="text"
                        defaultValue="www.bellaitalia.com.br"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-white focus:ring-2 focus:ring-red-600 outline-none transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#262626] flex justify-end">
                  <Button variant="primary" className="font-900 uppercase tracking-widest px-8">Salvar Alterações</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
