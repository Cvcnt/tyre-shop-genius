
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Calculator,
  Package,
  DollarSign,
  User,
  Calendar,
  Barcode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ItemVenda {
  id: string;
  produto: string;
  codigo: string;
  lote: string;
  quantidade: number;
  valorUnitario: number;
  custoUnitario: number;
  desconto: number;
  subtotal: number;
  lucro: number;
}

const SalesForm = () => {
  const { toast } = useToast();
  const [vendaLote, setVendaLote] = useState(false);
  const [dadosVenda, setDadosVenda] = useState({
    cliente: '',
    vendedor: '',
    data: new Date().toISOString().split('T')[0],
    observacoes: '',
    formaPagamento: '',
    desconto: 0
  });
  
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [novoItem, setNovoItem] = useState({
    produto: '',
    codigo: '',
    lote: '',
    quantidade: 1,
    valorUnitario: 0,
    custoUnitario: 0,
    desconto: 0
  });

  // Produtos mockados com lotes
  const produtosMock = [
    { 
      nome: 'Pneu Michelin Energy XM2 195/65 R15', 
      codigo: '7891234567890', 
      preco: 250.00, 
      custo: 180.00,
      lotes: ['L240115', 'L240120', 'L240125']
    },
    { 
      nome: 'Pneu Bridgestone Turanza ER300 205/55 R16', 
      codigo: '7891234567891', 
      preco: 320.00, 
      custo: 230.00,
      lotes: ['L240118', 'L240122', 'L240128']
    },
    { 
      nome: 'Pneu Continental ContiPowerContact 185/60 R14', 
      codigo: '7891234567892', 
      preco: 230.00, 
      custo: 165.00,
      lotes: ['L240112', 'L240119', 'L240126']
    }
  ];

  const adicionarItem = () => {
    if (!novoItem.produto || !novoItem.quantidade || !novoItem.valorUnitario) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha produto, quantidade e valor unitário",
        variant: "destructive",
      });
      return;
    }

    if (vendaLote && !novoItem.lote) {
      toast({
        title: "Lote obrigatório",
        description: "Selecione o lote do produto para venda em lote",
        variant: "destructive",
      });
      return;
    }

    const subtotal = (novoItem.quantidade * novoItem.valorUnitario) - novoItem.desconto;
    const custoTotal = novoItem.quantidade * novoItem.custoUnitario;
    const lucro = subtotal - custoTotal;

    const item: ItemVenda = {
      id: Date.now().toString(),
      produto: novoItem.produto,
      codigo: novoItem.codigo,
      lote: novoItem.lote,
      quantidade: novoItem.quantidade,
      valorUnitario: novoItem.valorUnitario,
      custoUnitario: novoItem.custoUnitario,
      desconto: novoItem.desconto,
      subtotal,
      lucro
    };

    setItens([...itens, item]);
    setNovoItem({
      produto: '',
      codigo: '',
      lote: '',
      quantidade: 1,
      valorUnitario: 0,
      custoUnitario: 0,
      desconto: 0
    });

    toast({
      title: "Item adicionado",
      description: `${item.produto} - Qtd: ${item.quantidade}`,
    });
  };

  const removerItem = (id: string) => {
    setItens(itens.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "Item foi removido da venda",
    });
  };

  const selecionarProduto = (nomeProduto: string) => {
    const produto = produtosMock.find(p => p.nome === nomeProduto);
    if (produto) {
      setNovoItem({
        ...novoItem,
        produto: produto.nome,
        codigo: produto.codigo,
        valorUnitario: produto.preco,
        custoUnitario: produto.custo,
        lote: '' // Reset lote when product changes
      });
    }
  };

  const calcularTotais = () => {
    const subtotal = itens.reduce((acc, item) => acc + item.subtotal, 0);
    const custoTotal = itens.reduce((acc, item) => acc + (item.quantidade * item.custoUnitario), 0);
    const descontoGeral = dadosVenda.desconto || 0;
    const total = subtotal - descontoGeral;
    const lucroTotal = total - custoTotal;
    const margemLucro = total > 0 ? (lucroTotal / total) * 100 : 0;

    return { subtotal, total, custoTotal, lucroTotal, margemLucro };
  };

  const finalizarVenda = () => {
    if (itens.length === 0) {
      toast({
        title: "Nenhum item",
        description: "Adicione pelo menos um item à venda",
        variant: "destructive",
      });
      return;
    }

    if (!dadosVenda.cliente || !dadosVenda.vendedor || !dadosVenda.formaPagamento) {
      toast({
        title: "Dados incompletos",
        description: "Preencha cliente, vendedor e forma de pagamento",
        variant: "destructive",
      });
      return;
    }

    const totais = calcularTotais();
    
    // Aqui você salvaria a venda no backend
    console.log('Venda finalizada:', { dadosVenda, itens, totais });
    
    toast({
      title: "Venda realizada!",
      description: `Total: R$ ${totais.total.toFixed(2)} | Lucro: R$ ${totais.lucroTotal.toFixed(2)}`,
    });

    // Reset form
    setItens([]);
    setDadosVenda({
      cliente: '',
      vendedor: '',
      data: new Date().toISOString().split('T')[0],
      observacoes: '',
      formaPagamento: '',
      desconto: 0
    });
  };

  const totais = calcularTotais();
  const produtoSelecionado = produtosMock.find(p => p.nome === novoItem.produto);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nova Venda</h2>
          <p className="text-slate-600 dark:text-slate-400">Registre vendas com controle detalhado de estoque e lotes</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <ShoppingCart className="w-3 h-3 mr-1" />
          {itens.length} {itens.length === 1 ? 'item' : 'itens'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de venda */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados da Venda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Input
                    id="cliente"
                    value={dadosVenda.cliente}
                    onChange={(e) => setDadosVenda({...dadosVenda, cliente: e.target.value})}
                    placeholder="Nome do cliente"
                  />
                </div>
                <div>
                  <Label htmlFor="vendedor">Vendedor *</Label>
                  <Select 
                    value={dadosVenda.vendedor} 
                    onValueChange={(value) => setDadosVenda({...dadosVenda, vendedor: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="pedro">Pedro Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={dadosVenda.data}
                    onChange={(e) => setDadosVenda({...dadosVenda, data: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="pagamento">Forma de Pagamento *</Label>
                  <Select 
                    value={dadosVenda.formaPagamento} 
                    onValueChange={(value) => setDadosVenda({...dadosVenda, formaPagamento: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="parcelado">Parcelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Controle de venda por lote */}
              <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Switch
                  id="venda-lote"
                  checked={vendaLote}
                  onCheckedChange={setVendaLote}
                />
                <Label htmlFor="venda-lote" className="text-blue-900 dark:text-blue-100">
                  <Package className="w-4 h-4 inline mr-1" />
                  Venda por Lote (controle detalhado)
                </Label>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={dadosVenda.observacoes}
                  onChange={(e) => setDadosVenda({...dadosVenda, observacoes: e.target.value})}
                  placeholder="Observações adicionais sobre a venda"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Adicionar produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Adicionar Produtos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="produto">Produto *</Label>
                  <Select 
                    value={novoItem.produto} 
                    onValueChange={selecionarProduto}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {produtosMock.map((produto) => (
                        <SelectItem key={produto.codigo} value={produto.nome}>
                          {produto.nome} - R$ {produto.preco.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {novoItem.codigo && (
                  <div className="md:col-span-2">
                    <Label>Código de Barras</Label>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <Barcode className="w-4 h-4 text-slate-500" />
                      <span className="font-mono text-sm">{novoItem.codigo}</span>
                    </div>
                  </div>
                )}

                {vendaLote && produtoSelecionado && (
                  <div className="md:col-span-2">
                    <Label htmlFor="lote">Lote *</Label>
                    <Select 
                      value={novoItem.lote} 
                      onValueChange={(value) => setNovoItem({...novoItem, lote: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o lote" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtoSelecionado.lotes.map((lote) => (
                          <SelectItem key={lote} value={lote}>
                            Lote {lote}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="quantidade">Quantidade *</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    min="1"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({...novoItem, quantidade: parseInt(e.target.value) || 1})}
                  />
                </div>
                <div>
                  <Label htmlFor="valor">Valor Unitário (R$) *</Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    min="0"
                    value={novoItem.valorUnitario}
                    onChange={(e) => setNovoItem({...novoItem, valorUnitario: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="custo">Custo Unitário (R$)</Label>
                  <Input
                    id="custo"
                    type="number"
                    step="0.01"
                    min="0"
                    value={novoItem.custoUnitario}
                    onChange={(e) => setNovoItem({...novoItem, custoUnitario: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="desconto">Desconto (R$)</Label>
                  <Input
                    id="desconto"
                    type="number"
                    step="0.01"
                    min="0"
                    value={novoItem.desconto}
                    onChange={(e) => setNovoItem({...novoItem, desconto: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <Button onClick={adicionarItem} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resumo e itens */}
        <div className="space-y-6">
          {/* Resumo da venda */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
                <span className="font-medium">R$ {totais.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Desconto Geral:</span>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={dadosVenda.desconto}
                  onChange={(e) => setDadosVenda({...dadosVenda, desconto: parseFloat(e.target.value) || 0})}
                  className="w-20 h-6 text-right"
                />
              </div>
              <div className="flex justify-between text-lg font-bold text-green-600 border-t pt-2">
                <span>Total:</span>
                <span>R$ {totais.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Custo Total:</span>
                <span>R$ {totais.custoTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-blue-600">
                <span>Lucro:</span>
                <span>R$ {totais.lucroTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Margem:</span>
                <span className="text-slate-500">{totais.margemLucro.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Lista de itens */}
          <Card>
            <CardHeader>
              <CardTitle>Itens da Venda</CardTitle>
            </CardHeader>
            <CardContent>
              {itens.length === 0 ? (
                <div className="text-center py-6">
                  <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Nenhum item adicionado</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {itens.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2">
                            {item.produto}
                          </h4>
                          {vendaLote && item.lote && (
                            <Badge variant="outline" className="text-xs mt-1 bg-purple-50 text-purple-700">
                              Lote: {item.lote}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            {item.quantidade}x R$ {item.valorUnitario.toFixed(2)}
                          </span>
                          <span className="font-medium">R$ {item.subtotal.toFixed(2)}</span>
                        </div>
                        {item.desconto > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>Desconto:</span>
                            <span>-R$ {item.desconto.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-green-600">
                          <span>Lucro:</span>
                          <span>R$ {item.lucro.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Finalizar venda */}
          <Button 
            onClick={finalizarVenda} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={itens.length === 0}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Finalizar Venda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
