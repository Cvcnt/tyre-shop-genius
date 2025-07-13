
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Store, 
  Plus, 
  Edit, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Package, 
  TrendingUp,
  Settings,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Store {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  responsavel: string;
  funcionarios: number;
  estoque_total: number;
  vendas_mes: number;
  status: 'ativa' | 'inativa' | 'manutencao';
  created_at: string;
}

const StoreManagement = () => {
  const { toast } = useToast();
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      nome: 'Loja Centro',
      endereco: 'Rua das Flores, 123 - Centro',
      telefone: '(11) 9999-0001',
      email: 'centro@tiresaas.com',
      responsavel: 'Maria Santos',
      funcionarios: 5,
      estoque_total: 350,
      vendas_mes: 25000,
      status: 'ativa',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      nome: 'Loja Norte',
      endereco: 'Av. Norte, 456 - Zona Norte',
      telefone: '(11) 9999-0002',
      email: 'norte@tiresaas.com',
      responsavel: 'João Silva',
      funcionarios: 3,
      estoque_total: 280,
      vendas_mes: 22000,
      status: 'ativa',
      created_at: '2024-02-01'
    },
    {
      id: '3',
      nome: 'Loja Sul',
      endereco: 'Rua Sul, 789 - Zona Sul',
      telefone: '(11) 9999-0003',
      email: 'sul@tiresaas.com',
      responsavel: 'Pedro Costa',
      funcionarios: 4,
      estoque_total: 195,
      vendas_mes: 18000,
      status: 'manutencao',
      created_at: '2024-02-15'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    responsavel: ''
  });

  const handleCreateStore = () => {
    setEditingStore(null);
    setFormData({
      nome: '',
      endereco: '',
      telefone: '',
      email: '',
      responsavel: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    setFormData({
      nome: store.nome,
      endereco: store.endereco,
      telefone: store.telefone,
      email: store.email,
      responsavel: store.responsavel
    });
    setIsDialogOpen(true);
  };

  const handleSaveStore = () => {
    if (!formData.nome || !formData.endereco) {
      toast({
        title: "Erro",
        description: "Nome e endereço são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (editingStore) {
      // Editar loja existente
      setStores(stores.map(store => 
        store.id === editingStore.id 
          ? { ...store, ...formData }
          : store
      ));
      toast({
        title: "Loja atualizada",
        description: `${formData.nome} foi atualizada com sucesso`,
      });
    } else {
      // Criar nova loja
      const newStore: Store = {
        id: Date.now().toString(),
        ...formData,
        funcionarios: 0,
        estoque_total: 0,
        vendas_mes: 0,
        status: 'ativa',
        created_at: new Date().toISOString().split('T')[0]
      };
      setStores([...stores, newStore]);
      toast({
        title: "Loja criada",
        description: `${formData.nome} foi criada com sucesso`,
      });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
    toast({
      title: "Loja removida",
      description: "A loja foi removida com sucesso",
    });
  };

  const getStatusBadge = (status: Store['status']) => {
    switch (status) {
      case 'ativa':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativa</Badge>;
      case 'inativa':
        return <Badge variant="secondary">Inativa</Badge>;
      case 'manutencao':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Manutenção</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const totalStats = stores.reduce((acc, store) => ({
    funcionarios: acc.funcionarios + store.funcionarios,
    estoque: acc.estoque + store.estoque_total,
    vendas: acc.vendas + store.vendas_mes
  }), { funcionarios: 0, estoque: 0, vendas: 0 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gestão de Lojas</h2>
          <p className="text-slate-600 dark:text-slate-400">Gerencie todas as unidades da sua rede</p>
        </div>
        <Button onClick={handleCreateStore} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Loja
        </Button>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total de Lojas</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stores.length}</p>
              </div>
              <Store className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Funcionários</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalStats.funcionarios}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Estoque Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalStats.estoque.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Vendas do Mês</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  R$ {totalStats.vendas.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de lojas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{store.nome}</CardTitle>
                {getStatusBadge(store.status)}
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {store.endereco}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Phone className="w-3 h-3" />
                  {store.telefone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Mail className="w-3 h-3" />
                  {store.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Users className="w-3 h-3" />
                  Responsável: {store.responsavel}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-xs text-slate-500">Funcionários</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{store.funcionarios}</p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-xs text-slate-500">Estoque</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{store.estoque_total}</p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-xs text-slate-500">Vendas/Mês</p>
                  <p className="font-semibold text-green-600">R$ {(store.vendas_mes / 1000).toFixed(0)}k</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditStore(store)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteStore(store.id)}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para criar/editar loja */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingStore ? 'Editar Loja' : 'Nova Loja'}
            </DialogTitle>
            <DialogDescription>
              {editingStore 
                ? 'Faça as alterações necessárias nos dados da loja' 
                : 'Preencha os dados para criar uma nova loja'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Loja *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Loja Centro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço *</Label>
              <Textarea
                id="endereco"
                value={formData.endereco}
                onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
                placeholder="Endereço completo da loja"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="loja@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
                placeholder="Nome do responsável pela loja"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveStore}>
              {editingStore ? 'Salvar Alterações' : 'Criar Loja'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreManagement;
