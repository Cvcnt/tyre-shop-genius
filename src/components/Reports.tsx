
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Target,
  DollarSign,
  Package,
  Users,
  Store,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedReport, setSelectedReport] = useState('sales');

  // Dados simulados para relatórios
  const salesData = [
    { month: 'Jan', vendas: 45000, custos: 32000, lucro: 13000, unidades: 180 },
    { month: 'Fev', vendas: 52000, custos: 38000, lucro: 14000, unidades: 210 },
    { month: 'Mar', vendas: 48000, custos: 35000, lucro: 13000, unidades: 195 },
    { month: 'Abr', vendas: 61000, custos: 42000, lucro: 19000, unidades: 245 },
    { month: 'Mai', vendas: 67000, custos: 45000, lucro: 22000, unidades: 270 },
    { month: 'Jun', vendas: 59000, custos: 41000, lucro: 18000, unidades: 235 }
  ];

  const productData = [
    { categoria: 'Aro 13', vendas: 85000, participacao: 35 },
    { categoria: 'Aro 14', vendas: 68000, participacao: 28 },
    { categoria: 'Aro 15', vendas: 48000, participacao: 20 },
    { categoria: 'Aro 16+', vendas: 41000, participacao: 17 }
  ];

  const storeComparison = [
    { loja: 'Centro', vendas: 95000, meta: 100000, crescimento: 15.2 },
    { loja: 'Norte', vendas: 78000, meta: 80000, crescimento: 12.8 },
    { loja: 'Sul', vendas: 62000, meta: 70000, crescimento: -2.3 },
    { loja: 'Oeste', vendas: 55000, meta: 60000, crescimento: 8.7 }
  ];

  const aiInsights = [
    {
      tipo: 'Previsão de Demanda',
      titulo: 'Aumento sazonal esperado',
      descricao: 'Dados climáticos indicam 23% de aumento na demanda por pneus nas próximas 2 semanas devido às chuvas.',
      confianca: 87,
      impacto: 'Alto',
      recomendacao: 'Aumentar estoque de pneus aro 14 e 15 em 30%'
    },
    {
      tipo: 'Otimização de Estoque',
      titulo: 'Produtos com baixa rotatividade',
      descricao: 'Pneus aro 17+ apresentam estoque parado há mais de 45 dias na loja Sul.',
      confianca: 92,
      impacto: 'Médio',
      recomendacao: 'Transferir 40% do estoque para loja Centro ou criar promoção'
    },
    {
      tipo: 'Performance de Vendas',
      titulo: 'Padrão de vendedor destaque',
      descricao: 'Maria Santos tem 35% mais conversões em vendas cruzadas comparado à média.',
      confianca: 95,
      impacto: 'Alto',
      recomendacao: 'Aplicar técnicas da Maria nos treinamentos da equipe'
    }
  ];

  const handleExportReport = (format: 'pdf' | 'excel') => {
    toast({
      title: "Exportando relatório",
      description: `Gerando arquivo ${format.toUpperCase()}...`,
    });
    
    // Simular download
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: `Relatório exportado em ${format.toUpperCase()} com sucesso!`,
      });
    }, 2000);
  };

  const generateAIReport = () => {
    toast({
      title: "Gerando relatório inteligente",
      description: "IA analisando dados e criando insights personalizados...",
    });
    
    setTimeout(() => {
      toast({
        title: "Relatório IA pronto",
        description: "Relatório com insights e recomendações foi gerado!",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios Avançados</h2>
          <p className="text-slate-600 dark:text-slate-400">Analytics inteligente com insights de IA</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button onClick={generateAIReport} className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Brain className="w-4 h-4 mr-2" />
            Relatório IA
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="year">Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Loja</label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="norte">Norte</SelectItem>
                  <SelectItem value="sul">Sul</SelectItem>
                  <SelectItem value="oeste">Oeste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="default">
              <BarChart3 className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights de IA */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Zap className="w-5 h-5" />
            Insights Inteligentes
          </CardTitle>
          <CardDescription>Análises automáticas e recomendações baseadas em IA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {insight.tipo}
                  </Badge>
                  <Badge variant={insight.impacto === 'Alto' ? 'destructive' : insight.impacto === 'Médio' ? 'default' : 'secondary'}>
                    {insight.impacto}
                  </Badge>
                </div>
                
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  {insight.titulo}
                </h4>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {insight.descricao}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Confiança</span>
                    <span className="font-medium">{insight.confianca}%</span>
                  </div>
                  
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${insight.confianca}%` }}
                    ></div>
                  </div>
                  
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
                    <strong>Recomendação:</strong> {insight.recomendacao}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs de relatórios */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="stores">Lojas</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Vendas</CardTitle>
                <CardDescription>Receita, custos e lucro mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']} />
                      <Area type="monotone" dataKey="vendas" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="custos" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="lucro" stackId="3" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unidades Vendidas</CardTitle>
                <CardDescription>Quantidade de pneus por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value} unidades`, '']} />
                      <Bar dataKey="unidades" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
                <CardDescription>Distribuição de receita por tipo de pneu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="participacao"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Participação']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {productData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][index] }} 
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {item.categoria}: R$ {(item.vendas / 1000).toFixed(0)}k
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Produtos</CardTitle>
                <CardDescription>Produtos mais vendidos no período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { nome: 'Michelin Energy XM2 195/65 R15', vendas: 89, receita: 22250 },
                    { nome: 'Bridgestone Turanza ER300 205/55 R16', vendas: 67, receita: 21440 },
                    { nome: 'Continental ContiPowerContact 185/60 R14', vendas: 78, receita: 17940 },
                    { nome: 'Pirelli Cinturato P1 175/70 R13', vendas: 92, receita: 16560 },
                    { nome: 'Goodyear Assurance Duraplus 195/60 R15', vendas: 54, receita: 15120 }
                  ].map((produto, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {produto.nome}
                        </p>
                        <p className="text-xs text-slate-500">{produto.vendas} unidades vendidas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">R$ {produto.receita.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">receita</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Lojas</CardTitle>
              <CardDescription>Performance de vendas por unidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storeComparison.map((loja, index) => (
                  <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900 dark:text-white">Loja {loja.loja}</h4>
                      <Badge variant={loja.crescimento > 0 ? "default" : "destructive"}>
                        {loja.crescimento > 0 ? '+' : ''}{loja.crescimento}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Vendas</p>
                        <p className="font-bold text-slate-900 dark:text-white">
                          R$ {loja.vendas.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Meta</p>
                        <p className="font-bold text-slate-900 dark:text-white">
                          R$ {loja.meta.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Atingimento</p>
                        <p className="font-bold text-blue-600">
                          {((loja.vendas / loja.meta) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((loja.vendas / loja.meta) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">ROI Médio</p>
                    <p className="text-2xl font-bold text-green-600">32.5%</p>
                    <p className="text-xs text-green-600">↑ +2.3% vs mês anterior</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Ticket Médio</p>
                    <p className="text-2xl font-bold text-blue-600">R$ 267</p>
                    <p className="text-xs text-blue-600">↑ +5.8% vs mês anterior</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Giro de Estoque</p>
                    <p className="text-2xl font-bold text-purple-600">4.2x</p>
                    <p className="text-xs text-purple-600">↑ +0.3x vs mês anterior</p>
                  </div>
                  <Package className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Conversão</p>
                    <p className="text-2xl font-bold text-orange-600">68%</p>
                    <p className="text-xs text-orange-600">↑ +1.2% vs mês anterior</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
              <CardDescription>Previsões e tendências de mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Previsão de Vendas</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Baseado em dados históricos e sazonalidade, esperamos um crescimento de 15% nas vendas do próximo mês,
                    com destaque para pneus aro 15 e 16.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Oportunidades</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Mercado de pneus premium em crescimento. Recomendamos aumentar mix de produtos Michelin e Continental
                    para melhorar margem de lucro.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Atenção</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Queda na demanda por pneus aro 13 detectada. Considere estratégias de liquidação ou remanejamento
                    de estoque para lojas com maior movimento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
