
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Mic, Plus, Trash2, ShoppingCart, Calculator, Zap, MicIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SaleItem {
  id: string;
  produto_id: string;
  nome_produto: string;
  codigo_barras: string;
  quantidade: number;
  valor_unitario: number;
  custo_unitario: number;
  subtotal: number;
}

const SalesForm = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [saleData, setSaleData] = useState({
    loja_id: '',
    vendedor_id: '',
    cliente_nome: '',
    cliente_telefone: '',
    observacoes: ''
  });

  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  
  const [currentItem, setCurrentItem] = useState({
    codigo_barras: '',
    quantidade: 1,
    valor_unitario: 0
  });

  // Simulação de produtos para demonstração
  const mockProducts = [
    { id: '1', nome: 'Pneu Michelin 195/65 R15', codigo_barras: '7891234567890', custo: 180, preco: 250 },
    { id: '2', nome: 'Pneu Bridgestone 205/55 R16', codigo_barras: '7891234567891', custo: 220, preco: 320 },
    { id: '3', nome: 'Pneu Continental 185/60 R14', codigo_barras: '7891234567892', custo: 160, preco: 230 }
  ];

  // Função para iniciar câmera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        toast({
          title: "Câmera ativada",
          description: "Aponte para o código de barras para fazer a leitura",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera",
        variant: "destructive",
      });
    }
  };

  // Função para parar câmera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Função para comando de voz
  const startVoiceCommand = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Escutando...",
          description: "Diga o código de barras ou nome do produto",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentItem(prev => ({ ...prev, codigo_barras: transcript }));
        toast({
          title: "Comando reconhecido",
          description: `"${transcript}"`,
        });
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Erro no reconhecimento",
          description: "Tente novamente",
          variant: "destructive",
        });
      };

      recognition.start();
    } else {
      toast({
        title: "Recurso não disponível",
        description: "Comando de voz não suportado neste navegador",
        variant: "destructive",
      });
    }
  };

  // Função para buscar produto por código
  const searchProduct = (codigo: string) => {
    const product = mockProducts.find(p => 
      p.codigo_barras === codigo || p.nome.toLowerCase().includes(codigo.toLowerCase())
    );
    
    if (product) {
      setCurrentItem(prev => ({
        ...prev,
        valor_unitario: product.preco,
        codigo_barras: product.codigo_barras
      }));
      
      toast({
        title: "Produto encontrado",
        description: product.nome,
      });
    } else {
      toast({
        title: "Produto não encontrado",
        description: "Código não localizado no sistema",
        variant: "destructive",
      });
    }
  };

  // Função para adicionar item à venda
  const addItemToSale = () => {
    const product = mockProducts.find(p => p.codigo_barras === currentItem.codigo_barras);
    
    if (!product) {
      toast({
        title: "Erro",
        description: "Produto não encontrado",
        variant: "destructive",
      });
      return;
    }

    const newItem: SaleItem = {
      id: Date.now().toString(),
      produto_id: product.id,
      nome_produto: product.nome,
      codigo_barras: currentItem.codigo_barras,
      quantidade: currentItem.quantidade,
      valor_unitario: currentItem.valor_unitario,
      custo_unitario: product.custo,
      subtotal: currentItem.quantidade * currentItem.valor_unitario
    };

    setSaleItems(prev => [...prev, newItem]);
    setCurrentItem({ codigo_barras: '', quantidade: 1, valor_unitario: 0 });
    
    toast({
      title: "Item adicionado",
      description: `${newItem.quantidade}x ${newItem.nome_produto}`,
    });
  };

  // Função para remover item
  const removeItem = (itemId: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Calcular totais
  const totals = saleItems.reduce((acc, item) => ({
    quantidade: acc.quantidade + item.quantidade,
    subtotal: acc.subtotal + item.subtotal,
    custo: acc.custo + (item.custo_unitario * item.quantidade),
    lucro: acc.lucro + ((item.valor_unitario - item.custo_unitario) * item.quantidade)
  }), { quantidade: 0, subtotal: 0, custo: 0, lucro: 0 });

  // Função para finalizar venda
  const finalizeSale = () => {
    if (saleItems.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à venda",
        variant: "destructive",
      });
      return;
    }

    // Aqui implementar salvamento no Supabase
    toast({
      title: "Venda realizada com sucesso!",
      description: `Total: R$ ${totals.subtotal.toFixed(2)}`,
    });

    // Limpar formulário
    setSaleItems([]);
    setSaleData({
      loja_id: '',
      vendedor_id: '',
      cliente_nome: '',
      cliente_telefone: '',
      observacoes: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nova Venda</h2>
          <p className="text-slate-600 dark:text-slate-400">Sistema inteligente com leitura por câmera e voz</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <Zap className="w-3 h-3 mr-1" />
          Modo Inteligente
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados da venda */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Venda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loja">Loja</Label>
                  <Select value={saleData.loja_id} onValueChange={(value) => setSaleData(prev => ({ ...prev, loja_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Loja Centro</SelectItem>
                      <SelectItem value="2">Loja Norte</SelectItem>
                      <SelectItem value="3">Loja Sul</SelectItem>
                      <SelectItem value="4">Loja Oeste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendedor">Vendedor</Label>
                  <Select value={saleData.vendedor_id} onValueChange={(value) => setSaleData(prev => ({ ...prev, vendedor_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">João Silva</SelectItem>
                      <SelectItem value="2">Maria Santos</SelectItem>
                      <SelectItem value="3">Pedro Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cliente">Nome do Cliente</Label>
                  <Input
                    id="cliente"
                    value={saleData.cliente_nome}
                    onChange={(e) => setSaleData(prev => ({ ...prev, cliente_nome: e.target.value }))}
                    placeholder="Digite o nome do cliente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={saleData.cliente_telefone}
                    onChange={(e) => setSaleData(prev => ({ ...prev, cliente_telefone: e.target.value }))}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scanner inteligente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Scanner Inteligente
              </CardTitle>
              <CardDescription>Use a câmera ou comando de voz para adicionar produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Controles do scanner */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={isCameraActive ? stopCamera : startCamera}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  {isCameraActive ? 'Parar Câmera' : 'Ativar Câmera'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={startVoiceCommand}
                  disabled={isListening}
                  className="flex items-center gap-2"
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
                  {isListening ? 'Escutando...' : 'Comando de Voz'}
                </Button>
              </div>

              {/* Vídeo da câmera */}
              {isCameraActive && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full max-w-md mx-auto rounded-lg border-2 border-dashed border-blue-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-32 border-2 border-red-500 rounded-lg"></div>
                  </div>
                </div>
              )}

              {/* Input manual */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Código de barras ou nome do produto"
                    value={currentItem.codigo_barras}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, codigo_barras: e.target.value }))}
                    onBlur={(e) => e.target.value && searchProduct(e.target.value)}
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Qtd"
                  min="1"
                  value={currentItem.quantidade}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, quantidade: parseInt(e.target.value) || 1 }))}
                />
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  step="0.01"
                  value={currentItem.valor_unitario}
                  onChange={(e) => setCurrentItem(prev => ({ ...prev, valor_unitario: parseFloat(e.target.value) || 0 }))}
                />
              </div>

              <Button onClick={addItemToSale} className="w-full" disabled={!currentItem.codigo_barras}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resumo da venda */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Itens da Venda
              </CardTitle>
            </CardHeader>
            <CardContent>
              {saleItems.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Nenhum item adicionado</p>
              ) : (
                <div className="space-y-3">
                  {saleItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.nome_produto}</p>
                        <p className="text-xs text-slate-500">
                          {item.quantidade}x R$ {item.valor_unitario.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {item.subtotal.toFixed(2)}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Totais */}
          {saleItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Itens:</span>
                  <span>{totals.quantidade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo:</span>
                  <span className="text-red-600">R$ {totals.custo.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Lucro:</span>
                  <span className="text-green-600">R$ {totals.lucro.toFixed(2)}</span>
                </div>
                
                <Button onClick={finalizeSale} className="w-full mt-4" size="lg">
                  Finalizar Venda
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Observações sobre a venda..."
                value={saleData.observacoes}
                onChange={(e) => setSaleData(prev => ({ ...prev, observacoes: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
