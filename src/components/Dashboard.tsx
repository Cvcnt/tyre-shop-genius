
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  Store,
  Brain,
  Cloud,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);

  // Dados simulados para demonstração
  const salesData = [
    { month: 'Jan', vendas: 45000, custos: 32000, lucro: 13000 },
    { month: 'Fev', vendas: 52000, custos: 38000, lucro: 14000 },
    { month: 'Mar', vendas: 48000, custos: 35000, lucro: 13000 },
    { month: 'Abr', vendas: 61000, custos: 42000, lucro: 19000 },
    { month: 'Mai', vendas: 67000, custos: 45000, lucro: 22000 },
    { month: 'Jun', vendas: 59000, custos: 41000, lucro: 18000 }
  ];

  const storePerformance = [
    { loja: 'Centro', vendas: 25000, meta: 30000, performance: 83 },
    { loja: 'Norte', vendas: 22000, meta: 25000, performance: 88 },
    { loja: 'Sul', vendas: 18000, meta: 20000, performance: 90 },
    { loja: 'Oeste', vendas: 15000, meta: 18000, performance: 83 }
  ];

  const productMix = [
    { name: 'Pneus Aro 13', value: 35, color: '#3B82F6' },
    { name: 'Pneus Aro 14', value: 28, color: '#8B5CF6' },
    { name: 'Pneus Aro 15', value: 20, color: '#10B981' },
    { name: 'Pneus Aro 16+', value: 17, color: '#F59E0B' }
  ];

  useEffect(() => {
    // Simulação de insights de IA
    const mockInsights = [
      {
        type: 'weather',
        title: 'Previsão Climática',
        message: 'Chuva prevista para próxima semana pode aumentar demanda por pneus em 15%',
        confidence: 85,
        icon: Cloud,
        color: 'blue'
      },
      {
        type: 'stock',
        title: 'Alerta de Estoque',
        message: 'Pneus aro 14 com estoque baixo na loja Centro. Reposição recomendada em 3 dias',
        confidence: 92,
        icon: Package,
        color: 'orange'
      },
      {
        type: 'sales',
        title: 'Oportunidade de Venda',
        message: 'Vendedor João tem padrão de vendas alto nas terças. Agende mais clientes',
        confidence: 78,
        icon: TrendingUp,
        color: 'green'
      }
    ];

    setAiInsights(mockInsights);
  }, []);

  const kpis = [
    {
      title: 'Vendas do Mês',
      value: 'R$ 67.400',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Lucro Líquido',
      value: 'R$ 22.100',
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Itens em Estoque',
      value: '1.247',
      change: '-5.2%',
      trend: 'down',
      icon: Package,
      color: 'orange'
    },
    {
      title: 'Lojas Ativas',
      value: '4',
      change: '0%',
      trend: 'stable',
      icon: Store,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header com IA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Inteligente</h2>
          <p className="text-slate-600 dark:text-slate-400">Insights impulsionados por IA para decisões mais inteligentes</p>
        </div>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          <Brain className="w-3 h-3 mr-1" />
          IA Ativa
        </Badge>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{kpi.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
                      {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
                      <span className={`text-xs ${
                        kpi.trend === 'up' ? 'text-green-600' : 
                        kpi.trend === 'down' ? 'text-red-600' : 'text-slate-500'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights de IA */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Zap className="w-5 h-5" />
            Insights Inteligentes
          </CardTitle>
          <CardDescription>Recomendações baseadas em IA e dados externos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <div className={`p-2 rounded-lg bg-${insight.color}-100 dark:bg-${insight.color}-900/20`}>
                    <Icon className={`w-4 h-4 text-${insight.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-white">{insight.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{insight.message}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-slate-500">Confiança: {insight.confidence}%</span>
                      <Progress value={insight.confidence} className="w-16 h-1 ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
            <CardDescription>Vendas, custos e lucro dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                    labelStyle={{ color: '#64748B' }}
                  />
                  <Line type="monotone" dataKey="vendas" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="custos" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="lucro" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance por loja */}
        <Card>
          <CardHeader>
            <CardTitle>Performance das Lojas</CardTitle>
            <CardDescription>Vendas vs metas por unidade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storePerformance.map((store, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900 dark:text-white">{store.loja}</span>
                    <Badge variant={store.performance >= 90 ? "default" : store.performance >= 80 ? "secondary" : "destructive"}>
                      {store.performance}%
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>R$ {store.vendas.toLocaleString()}</span>
                    <span>Meta: R$ {store.meta.toLocaleString()}</span>
                  </div>
                  <Progress value={store.performance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mix de produtos */}
        <Card>
          <CardHeader>
            <CardTitle>Mix de Produtos</CardTitle>
            <CardDescription>Distribuição de vendas por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productMix}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Participação']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productMix.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas e tarefas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Alertas e Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">Estoque Crítico</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Pneus Michelin 195/65 R15</p>
                </div>
                <Badge variant="destructive">Urgente</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">Meta Mensal</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Faltam R$ 12.600 para bater a meta</p>
                </div>
                <Badge variant="secondary">15 dias</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Nova Oportunidade</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Cliente solicitou orçamento - Frota 20 pneus</p>
                </div>
                <Badge>Novo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
