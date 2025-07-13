
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Target, 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Zap,
  Medal,
  Crown,
  Gift,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useAuth } from './AuthProvider';

const GameCenter = () => {
  const { userProfile } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dados de gamificação simulados
  const userStats = {
    pontos: userProfile?.pontos || 1250,
    nivel: 5,
    proximoNivel: 1500,
    badges: userProfile?.badges || ['Primeiro Login', 'Vendedor Top', 'Meta Batida'],
    posicaoRanking: 2,
    vendasMes: 15,
    metaMes: 20
  };

  const achievements = [
    {
      id: 1,
      nome: 'Primeiro Login',
      descricao: 'Realizou o primeiro acesso ao sistema',
      icon: Star,
      pontos: 50,
      conquistado: true,
      data: '2024-01-10'
    },
    {
      id: 2,
      nome: 'Vendedor Top',
      descricao: 'Entre os 3 melhores vendedores do mês',
      icon: Trophy,
      pontos: 200,
      conquistado: true,
      data: '2024-01-15'
    },
    {
      id: 3,
      nome: 'Meta Batida',
      descricao: 'Atingiu 100% da meta mensal',
      icon: Target,
      pontos: 300,
      conquistado: true,
      data: '2024-01-20'
    },
    {
      id: 4,
      nome: 'Streak Master',
      descricao: 'Vendas por 7 dias consecutivos',
      icon: Zap,
      pontos: 150,
      conquistado: false,
      progresso: 4,
      meta: 7
    },
    {
      id: 5,
      nome: 'Cliente Fiel',
      descricao: 'Venda para o mesmo cliente 5 vezes',
      icon: Award,
      pontos: 100,
      conquistado: false,
      progresso: 2,
      meta: 5
    },
    {
      id: 6,
      nome: 'Rei das Vendas',
      descricao: 'Lidere o ranking por 3 meses consecutivos',
      icon: Crown,
      pontos: 500,
      conquistado: false,
      progresso: 1,
      meta: 3
    }
  ];

  const leaderboard = [
    { 
      posicao: 1, 
      nome: 'Maria Santos', 
      pontos: 1850, 
      vendas: 23, 
      avatar: '/avatars/maria.jpg',
      badge: 'Líder do Mês',
      nivel: 6
    },
    { 
      posicao: 2, 
      nome: 'João Silva', 
      pontos: 1250, 
      vendas: 15, 
      avatar: '/avatars/joao.jpg',
      badge: 'Vice-Líder',
      nivel: 5
    },
    { 
      posicao: 3, 
      nome: 'Pedro Costa', 
      pontos: 1100, 
      vendas: 18, 
      avatar: '/avatars/pedro.jpg',
      badge: 'Top 3',
      nivel: 4
    },
    { 
      posicao: 4, 
      nome: 'Ana Oliveira', 
      pontos: 950, 
      vendas: 12, 
      avatar: '/avatars/ana.jpg',
      badge: 'Destaque',
      nivel: 4
    },
    { 
      posicao: 5, 
      nome: 'Carlos Lima', 
      pontos: 800, 
      vendas: 10, 
      avatar: '/avatars/carlos.jpg',
      badge: 'Promessa',
      nivel: 3
    }
  ];

  const challenges = [
    {
      id: 1,
      titulo: 'Desafio da Semana',
      descricao: 'Venda 5 pneus até domingo',
      premio: '100 pontos',
      progresso: 3,
      meta: 5,
      tempo: '2 dias restantes',
      tipo: 'semanal',
      cor: 'blue'
    },
    {
      id: 2,
      titulo: 'Super Meta',
      descricao: 'Atinja 150% da sua meta mensal',
      premio: '500 pontos + Badge especial',
      progresso: 75,
      meta: 150,
      tempo: '15 dias restantes',
      tipo: 'mensal',
      cor: 'purple'
    },
    {
      id: 3,
      titulo: 'Cliente Satisfeito',
      descricao: 'Receba 5 avaliações positivas',
      premio: '200 pontos',
      progresso: 2,
      meta: 5,
      tempo: 'Permanente',
      tipo: 'continuo',
      cor: 'green'
    }
  ];

  const recentActivities = [
    { acao: 'Conquistou badge "Meta Batida"', tempo: 'há 2 horas', pontos: '+300' },
    { acao: 'Vendeu pneu Michelin 195/65', tempo: 'há 4 horas', pontos: '+50' },
    { acao: 'Subiu para nível 5', tempo: 'ontem', pontos: '+100' },
    { acao: 'Completou desafio semanal', tempo: '2 dias atrás', pontos: '+150' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Centro de Gamificação</h2>
          <p className="text-slate-600 dark:text-slate-400">Conquiste badges, suba no ranking e ganhe prêmios!</p>
        </div>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <Trophy className="w-3 h-3 mr-1" />
          Nível {userStats.nivel}
        </Badge>
      </div>

      {/* Status do usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Seus Pontos</p>
                <p className="text-3xl font-bold">{userStats.pontos.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Progress 
                    value={(userStats.pontos / userStats.proximoNivel) * 100} 
                    className="w-20 h-1 mr-2"
                  />
                  <span className="text-xs text-blue-100">
                    {userStats.proximoNivel - userStats.pontos} para próximo nível
                  </span>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Ranking</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">#{userStats.posicaoRanking}</p>
                <p className="text-sm text-green-600">↑ Subiu 1 posição</p>
              </div>
              <Medal className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Vendas do Mês</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.vendasMes}</p>
                <div className="flex items-center mt-1">
                  <Progress value={(userStats.vendasMes / userStats.metaMes) * 100} className="w-16 h-1 mr-2" />
                  <span className="text-xs text-slate-500">{userStats.metaMes - userStats.vendasMes} restantes</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">Badges</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{userStats.badges.length}</p>
                <p className="text-sm text-blue-600">+2 este mês</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Ranking Geral
            </CardTitle>
            <CardDescription>Top vendedores do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    user.nome === 'João Silva' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.posicao === 1 ? 'bg-yellow-500 text-white' :
                      user.posicao === 2 ? 'bg-gray-400 text-white' :
                      user.posicao === 3 ? 'bg-orange-600 text-white' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {user.posicao}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 dark:text-white">{user.nome}</p>
                      {user.posicao <= 3 && (
                        <Badge variant={user.posicao === 1 ? "default" : "secondary"} className="text-xs">
                          {user.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">Nível {user.nivel} • {user.vendas} vendas</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">{user.pontos}</p>
                    <p className="text-xs text-slate-500">pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conquistas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              Conquistas
            </CardTitle>
            <CardDescription>Badges e achievements disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      achievement.conquistado 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      achievement.conquistado 
                        ? 'bg-green-100 dark:bg-green-900/40' 
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        achievement.conquistado 
                          ? 'text-green-600' 
                          : 'text-slate-500'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium ${
                          achievement.conquistado 
                            ? 'text-green-900 dark:text-green-100' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {achievement.nome}
                        </p>
                        <Badge variant={achievement.conquistado ? "default" : "secondary"} className="text-xs">
                          +{achievement.pontos}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {achievement.descricao}
                      </p>
                      
                      {!achievement.conquistado && achievement.progresso !== undefined && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Progresso: {achievement.progresso}/{achievement.meta}</span>
                            <span>{Math.round((achievement.progresso / achievement.meta) * 100)}%</span>
                          </div>
                          <Progress value={(achievement.progresso / achievement.meta) * 100} className="h-1" />
                        </div>
                      )}
                      
                      {achievement.conquistado && (
                        <p className="text-xs text-green-600 mt-1">
                          Conquistado em {achievement.data}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Desafios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Desafios Ativos
            </CardTitle>
            <CardDescription>Complete desafios para ganhar pontos extras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">{challenge.titulo}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{challenge.descricao}</p>
                    </div>
                    <Badge variant="outline" className={`text-${challenge.cor}-600 border-${challenge.cor}-200`}>
                      {challenge.tipo}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Progresso: {challenge.progresso}/{challenge.meta}
                      </span>
                      <span className="text-slate-500">{challenge.tempo}</span>
                    </div>
                    <Progress value={(challenge.progresso / challenge.meta) * 100} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        🎁 {challenge.premio}
                      </span>
                      <span className="text-xs text-slate-500">
                        {Math.round((challenge.progresso / challenge.meta) * 100)}% concluído
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Suas conquistas e ações recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-900 dark:text-white">{activity.acao}</p>
                    <p className="text-xs text-slate-500">{activity.tempo}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {activity.pontos}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameCenter;
