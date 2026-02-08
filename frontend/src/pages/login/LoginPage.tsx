import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { Button } from '../../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0B0B0B] font-sans">
      {/* Coluna Esquerda: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-900 via-[#161616] to-[#0B0B0B] overflow-hidden p-12 flex-col justify-between border-r border-[#262626]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-900/40">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-800 text-white tracking-tighter uppercase italic">MesaFlow</span>
          </div>
          <h1 className="text-6xl font-900 text-white leading-tight mb-6 tracking-tighter uppercase">
            Domine sua <span className="text-red-600">Cozinha</span>, Controle seu <span className="text-orange-500">Fluxo</span>.
          </h1>
          <p className="text-xl text-neutral-400 max-w-md font-medium">
            Inteligência profissional para operações gastronômicas de alto nível. Feito para performance.
          </p>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="bg-[#161616]/60 backdrop-blur-xl border border-[#262626] p-8 rounded-3xl">
            <p className="text-neutral-300 font-medium italic mb-6 text-lg leading-relaxed">"A suíte de gestão mais intuitiva que já usei. O modo escuro mantém nosso foco nítido durante os turnos intensos da noite."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 shadow-xl shadow-red-900/20"></div>
              <div>
                <p className="text-white font-bold uppercase tracking-wider text-sm">Alessandro Rossi</p>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Chef Executivo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos Decorativos */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Coluna Direita: Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0B0B0B]">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <Flame className="w-6 h-6 text-red-600" />
            <span className="text-2xl font-900 text-white tracking-tighter uppercase italic">MesaFlow</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-900 text-white mb-3 uppercase tracking-tighter">Acesso</h2>
            <p className="text-neutral-500 font-medium">Acesso seguro ao seu painel empresarial.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-800 text-neutral-400 uppercase tracking-widest mb-2">Identificador</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#161616] border border-[#262626] rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all font-semibold"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-800 text-neutral-400 uppercase tracking-widest">Chave Secreta</label>
                <a href="#" className="text-xs font-bold text-red-600 hover:text-red-500 uppercase tracking-widest">Redefinir</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-[#161616] border border-[#262626] rounded-2xl text-white placeholder-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all font-semibold"
                  placeholder="Senha"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" className="rounded-2xl py-5 shadow-2xl shadow-red-900/30 font-900 uppercase tracking-[2px]">
              Acessar Terminal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <p className="mt-10 text-center text-xs font-bold text-neutral-600 uppercase tracking-widest">
            Acesso não autorizado é estritamente proibido.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
