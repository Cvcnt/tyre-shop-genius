
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Plus, 
  Edit, 
  Shield, 
  Mail, 
  Phone, 
  Store,
  Trophy,
  Calendar,
  MoreHorizontal,
  UserCheck,
  UserX,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  perfil: 'proprietario' | 'gerente' | 'vendedor';
  loja_id?: string;
  loja_nome?: string;
  status: 'ativo' | 'inativo';
  avatar_url?: string;
  created_at: string;
  last_login?: string;
  vendas_mes: number;
  pontos: number;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@tiresaas.com',
      telefone: '(11) 99999-0001',
      perfil: 'proprietario',
      status: 'ativo',
      created_at: '2024-01-10',
      last_login: '2024-01-25',
      vendas_mes: 15,
      pontos: 1250
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@tiresaas.com',
      telefone: '(11) 99999-0002',
      perfil: 'gerente',
      loja_id: '1',
      loja_nome: 'Loja Centro',
      status: 'ativo',
      created_at: '2024-01-15',
      last_login: '2024-01-25',
      vendas_mes: 23,
      pontos: 1850
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      email: 'pedro@tiresaas.com',
      telefone: '(11) 99999-0003',
      perfil: 'vendedor',
      loja_id: '2',
      loja_nome: 'Loja Norte',
      status: 'ativo',
      created_at: '2024-02-01',
      last_login: '2024-01-24',
      vendas_mes: 18,
      pontos: 1100
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      email: 'ana@tiresaas.com',
      telefone: '(11) 99999-0004',
      perfil: 'vendedor',
      loja_id: '1',
      loja_nome: 'Loja Centro',
      status: 'inativo',
      created_at: '2024-02-10',
      last_login: '2024-01-20',
      vendas_mes: 12,
      pontos: 950
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterPerfil, setFilterPerfil] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' }
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    toast({
      title: "Status alterado",
      description: `${user?.nome} foi ${user?.status === 'ativo' ? 'desativado' : 'ativado'}`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido",
      description: `${user?.nome} foi removido do sistema`,
    });
  };

  const getPerfilBadge = (perfil: User['perfil']) => {
    switch (perfil) {
      case 'proprietario':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Proprietário</Badge>;
      case 'gerente':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Gerente</Badge>;
      case 'vendedor':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Vendedor</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusBadge = (status: User['status']) => {
    return status === 'ativo' 
      ? <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativo</Badge>
      : <Badge variant="secondary">Inativo</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const perfilMatch = filterPerfil === 'todos' || user.perfil === filterPerfil;
    const statusMatch = filterStatus === 'todos' || user.status === filterStatus;
    return perfilMatch && statusMatch;
  });

  const userStats = {
    total: users.length,
    ativos: users.filter(u => u.status === 'ativo').length,
    proprietarios: users.filter(u => u.perfil === 'proprietario').length,
    gerentes: users.filter(u => u.perfil === 'gerente').length,
    vendedores: users.filter(u => u.perfil === 'vendedor').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gestão de Usuários</h2>
          <p className="text-slate-600 dark:text-slate-400">Gerencie usuários e permissões do sistema</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Ativos</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.ativos}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Proprietários</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.proprietarios}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Gerentes</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.gerentes}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Vendedores</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.vendedores}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Perfil</Label>
              <Select value={filterPerfil} onValueChange={setFilterPerfil}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="proprietario">Proprietário</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Buscar</Label>
              <Input placeholder="Nome ou e-mail..." className="w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>{user.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">{user.nome}</h4>
                      {getPerfilBadge(user.perfil)}
                      {getStatusBadge(user.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {user.telefone}
                      </div>
                      {user.loja_nome && (
                        <div className="flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          {user.loja_nome}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Criado em {new Date(user.created_at).toLocaleDateString()}</span>
                      {user.last_login && (
                        <span>Último login: {new Date(user.last_login).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Stats do usuário */}
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      <span className="text-sm font-medium">{user.pontos} pts</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {user.vendas_mes} vendas/mês
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewUser(user)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                      className={user.status === 'ativo' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                    >
                      {user.status === 'ativo' ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de detalhes do usuário */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>
              Informações completas e permissões do usuário
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 py-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedUser.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {selectedUser.nome}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getPerfilBadge(selectedUser.perfil)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">E-mail</Label>
                    <p className="text-slate-900 dark:text-white">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Telefone</Label>
                    <p className="text-slate-900 dark:text-white">{selectedUser.telefone}</p>
                  </div>
                  {selectedUser.loja_nome && (
                    <div>
                      <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Loja</Label>
                      <p className="text-slate-900 dark:text-white">{selectedUser.loja_nome}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Pontos</Label>
                    <p className="text-2xl font-bold text-yellow-600">{selectedUser.pontos}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Vendas do Mês</Label>
                    <p className="text-2xl font-bold text-green-600">{selectedUser.vendas_mes}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Membro desde</Label>
                    <p className="text-slate-900 dark:text-white">
                      {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              Editar Usuário
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
