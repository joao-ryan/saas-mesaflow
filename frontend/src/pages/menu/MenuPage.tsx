
import React from 'react';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const MenuPage: React.FC = () => {
  const menuItems = [
    { id: 1, name: 'Pizza Margherita', category: 'Pizzas', price: 58.50, available: true, image: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/494feec171f5683665eba434d22e52f5.jpg?itok=n3xpYgtR' },
    { id: 2, name: 'Pasta de Trufas', category: 'Pratos Principais', price: 84.00, available: true, image: 'https://www.giallozafferano.com.br/images/120-12001/fettuccine-ao-trufa_650x433_wm.jpg' },
    { id: 3, name: 'Salada Caesar', category: 'Entradas', price: 42.50, available: false, image: 'https://receitadaboa.com.br/wp-content/uploads/2024/04/bottom_view_caesar_salad_oval_plate_dark_red_table-23000869-1.jpg' },
    { id: 4, name: 'Steak Ribeye', category: 'Grelhados', price: 118.00, available: true, image: 'https://foremangrillrecipes.com/wp-content/uploads/featured-ribeye-steak-foreman-grill-new.jpg' },
    { id: 5, name: 'Tiramisu', category: 'Sobremesas', price: 29.50, available: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Home-made_tiramisu%2C_november_2008.jpg/1280px-Home-made_tiramisu%2C_november_2008.jpg' },
    { id: 6, name: 'Vinho Tinto (Taça)', category: 'Bebidas', price: 35.00, available: true, image: 'https://vinsel.com.br/cdn/shop/articles/2151514996-365120.jpg?crop=center&height=630&v=1727459268&width=1120' },
  ];

  return (
    <PageLayout title="Gestão do Cardápio">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar prato ou categoria..."
            className="w-full pl-12 pr-4 py-3.5 bg-[#161616] border border-[#262626] rounded-2xl text-white placeholder-neutral-700 focus:ring-2 focus:ring-red-600 outline-none transition-all font-bold text-sm"
          />
        </div>
        <Button variant="primary" className="font-bold uppercase tracking-widest text-xs rounded-xl px-8">
          <Plus className="w-4 h-4 mr-2" /> Adicionar Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden flex flex-col p-0 border border-[#262626] hover:border-red-600/50 transition-all">
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={item.available ? 'success' : 'neutral'}>
                  {item.available ? 'Disponível' : 'Esgotado'}
                </Badge>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[10px] font-900 text-orange-500 uppercase tracking-[2px] mb-1">{item.category}</p>
                  <h4 className="text-lg font-900 text-white tracking-tight leading-tight">{item.name}</h4>
                </div>
                <span className="text-lg font-900 text-white tracking-tighter">R$ {item.price.toFixed(2)}</span>
              </div>

              <div className="mt-auto pt-6 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 bg-[#0B0B0B] border-[#262626] rounded-xl font-bold uppercase tracking-widest text-[10px] text-neutral-400 hover:text-white hover:border-white">
                  <Edit3 className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button variant="danger" size="sm" className="rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border-none">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default MenuPage;
