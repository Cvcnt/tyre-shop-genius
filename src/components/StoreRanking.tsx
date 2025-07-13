
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown,
  Store, 
  DollarSign,
  Target,
  BarChart3,
  Medal,
  Crown,
  Award,
  Calendar
} from 'lucide-react';

const StoreRanking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Dados simulados das lojas
  const storeData = [
    {
      id: 1,
      nome: 'Loja Centro',
      vendas: 89500,
      custos: 62300,
      lucro: 27200,
      demanda: 145,
      meta: 85000,
      crescimento: 12.5,
      eficiencia: 92,
      posicao: 1,
      badge: 'Líder Absoluto',
      cor: 'gold'
    },
    {
      id: 2,
      nome: 'Loja Norte',
      vendas: 76800,
      custos: 54600,
      lucro: 22200,
      demanda: 128,
      meta: 75000,
      crescimento: 8.3,
      eficiencia: 88,
      posicao: 2,
      badge: 'Vice-Líder',
      cor: 'silver'
    },
    {
      id: 3,
      nome: 'Loja Sul',
      vendas: 68200,
      custos: 49800,
      lucro: 18400,
      demanda: 112,
      meta: 70000,
      crescimento: -2.1,
      eficiencia: 82,
      posicao: 3,
      badge: 'Top 3',
      cor: 'bronze'
    },
    {
      id: 4,
      nome: 'Loja Oeste',
      vendas: 54300,
      custos: 41200,
      lucro: 13100,
      demanda: 89,
      meta: 60000,
      crescimento: 5.7,
      eficiencia: 76,
      posicao: 4,
      badge: 'Em Desenvolvimento',
      cor: 'gray'
    }
  ];

  const metrics = [
    { name: 'Vendas', key: 'vendas', format: (v: number) => `R$ ${v.toLocaleString()}`, icon: DollarSign },
    { name: 'Lucro', key: 'lucro', format: (v: number) => `R$ ${v.toLocaleString()}`, icon: TrendingUp },
    { name: 'Demanda', key: 'demanda', format: (v: number) => `${v} clientes`, icon: Target },
    { name: 'Eficiência', key: 'eficiencia', format: (v: number) => `${v}%`, icon: BarChart3 }
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-600" />;
      default: return <Store className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-slate-300 to-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ranking das Lojas</h2>
          <p className="text-slate-600 dark:text-slate-400">Comparação de performance e eficiência entre unidades</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedPeriod('week')}
          >
            Semana
          </Button>
          <Button 
            variant={selectedPeriod === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedPeriod('month')}
          >
            Mês
          </Button>
          <Button 
            variant={selectedPeriod === 'year' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedPeriod('year')}
          >
            Ano
          </Button>
        </div>
      </div>

      {/* Pódio das 3 melhores */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Pódio do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storeData.slice(0, 3).map((store, index) => (
              <div 
                key={store.id} 
                className={`relative p-6 rounded-lg text-center ${
                  index === 0 ? 'bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30' :
                  index === 1 ? 'bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700' :
                  'bg-gradient-to-b from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30'
                }`}
              >
                <div className="flex justify-center mb-3">
                  {getPositionIcon(store.posicao)}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{store.nome}</h3>
                <Badge variant="secondary" className="mt-2 mb-3">
                  {store.badge}
                </Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Vendas:</span>
                    <span className="font-medium">R$ {store.vendas.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Lucro:</span>
                    <span className="font-medium text-green-600">R$ {store.lucro.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Eficiência:</span>
                    <span className="font-medium">{store.eficiencia}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Completo</CardTitle>
          <CardDescription>Performance detalhada de todas as lojas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storeData.map((store) => (
              <div key={store.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPositionColor(store.posicao)} flex items-center justify-center text-white font-bold`}>
                      {store.posicao}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{store.nome}</h3>
                      <Badge variant="outline" className="text-xs">
                        {store.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {store.crescimento > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        store.crescimento > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {store.crescimento > 0 ? '+' : ''}{store.crescimento}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    const value = store[metric.key as keyof typeof store] as number;
                    return (
                      <div key={metric.key} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                        <Icon className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                        <p className="text-xs text-slate-600 dark:text-slate-400">{metric.name}</p>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                          {metric.format(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Meta vs Realizado</span>
                    <span className="font-medium">
                      {((store.vendas / store.meta) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(store.vendas / store.meta) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas comparativas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Lucro por Loja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeData.map((store) => (
                <div key={store.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900 dark:text-white">{store.nome}</span>
                    <span className="font-bold text-green-600">
                      R$ {store.lucro.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(store.lucro / Math.max(...storeData.map(s => s.lucro))) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Margem: {((store.lucro / store.vendas) * 100).toFixed(1)}%</span>
                    <span>vs Custo: R$ {store.custos.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demanda vs Eficiência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeData.map((store) => (
                <div key={store.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-900 dark:text-white">{store.nome}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {store.demanda} clientes
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {store.eficiencia}% eficiência
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Demanda</p>
                      <Progress value={(store.demanda / 150) * 100} className="h-1 mt-1" />
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Eficiência</p>
                      <Progress value={store.eficiencia} className="h-1 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreRanking;
