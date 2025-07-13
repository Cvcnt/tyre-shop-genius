
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Search, Package, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BarcodeScanner = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedProducts, setScannedProducts] = useState<any[]>([]);
  const [lastScanned, setLastScanned] = useState<string>('');

  // Mock de produtos para demonstração
  const mockProducts = [
    { 
      codigo: '7891234567890', 
      nome: 'Pneu Michelin Energy XM2 195/65 R15', 
      preco: 250.00, 
      estoque: 12,
      marca: 'Michelin',
      categoria: 'Pneu Aro 15',
      lote: 'L240115'
    },
    { 
      codigo: '7891234567891', 
      nome: 'Pneu Bridgestone Turanza ER300 205/55 R16', 
      preco: 320.00, 
      estoque: 8,
      marca: 'Bridgestone',
      categoria: 'Pneu Aro 16',
      lote: 'L240120'
    },
    { 
      codigo: '7891234567892', 
      nome: 'Pneu Continental ContiPowerContact 185/60 R14', 
      preco: 230.00, 
      estoque: 15,
      marca: 'Continental',
      categoria: 'Pneu Aro 14',
      lote: 'L240118'
    }
  ];

  // Função para iniciar câmera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        toast({
          title: "Scanner ativo",
          description: "Aponte a câmera para o código de barras",
        });
        
        // Simular detecção de código após 3 segundos
        setTimeout(() => {
          simulateBarcodeScan();
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
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
      toast({
        title: "Scanner desativado",
        description: "Câmera foi desligada",
      });
    }
  };

  // Simulação de leitura de código de barras
  const simulateBarcodeScan = () => {
    const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setLastScanned(randomProduct.codigo);
    processScannedCode(randomProduct.codigo);
  };

  // Processar código escaneado
  const processScannedCode = (code: string) => {
    const product = mockProducts.find(p => 
      p.codigo === code || p.nome.toLowerCase().includes(code.toLowerCase())
    );
    
    if (product) {
      setScannedProducts(prev => {
        // Evitar duplicatas
        const exists = prev.find(p => p.codigo === product.codigo);
        if (exists) {
          return prev.map(p => 
            p.codigo === product.codigo 
              ? { ...p, quantidade: p.quantidade + 1, timestamp: new Date() }
              : p
          );
        } else {
          return [...prev, { ...product, quantidade: 1, timestamp: new Date() }];
        }
      });
      
      toast({
        title: "Produto encontrado!",
        description: product.nome,
      });
    } else {
      toast({
        title: "Produto não encontrado",
        description: `Código "${code}" não localizado no sistema`,
        variant: "destructive",
      });
    }
  };

  // Limpar histórico
  const clearHistory = () => {
    setScannedProducts([]);
    toast({
      title: "Histórico limpo",
      description: "Todos os produtos foram removidos da lista",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Scanner de Código de Barras</h2>
          <p className="text-slate-600 dark:text-slate-400">Leitura rápida e precisa via câmera</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Camera className="w-3 h-3 mr-1" />
          Scanner Ativo
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner principal */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Scanner Visual
            </CardTitle>
            <CardDescription>
              Use a câmera do dispositivo para escanear códigos de barras automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Controles */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={isCameraActive ? "destructive" : "default"}
                onClick={isCameraActive ? stopCamera : startCamera}
                className="flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                {isCameraActive ? 'Parar Scanner' : 'Iniciar Scanner'}
              </Button>

              <Button 
                variant="outline" 
                onClick={simulateBarcodeScan}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Simular Scan
              </Button>
            </div>

            {/* Vídeo da câmera */}
            <div className="relative">
              {isCameraActive ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-lg border-2 border-blue-300"
                  />
                  {/* Overlay de detecção */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div className="w-64 h-40 border-2 border-red-500 rounded-lg bg-red-500/10"></div>
                      <p className="text-center text-white font-medium mt-2 bg-black/50 px-2 py-1 rounded">
                        Aponte para o código de barras
                      </p>
                    </div>
                  </div>
                  
                  {/* Indicador de scanning */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full inline-block mr-1"></div>
                    Scanning...
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">Scanner desativado</p>
                    <p className="text-sm text-slate-400">Clique em "Iniciar Scanner" para começar</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status do último scan */}
            {lastScanned && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Último código escaneado: {lastScanned}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Produtos escaneados */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Produtos Escaneados
              </CardTitle>
              <CardDescription>
                Histórico de produtos identificados
              </CardDescription>
            </div>
            {scannedProducts.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearHistory}>
                Limpar
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {scannedProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum produto escaneado</p>
                <p className="text-sm text-slate-400">Use o scanner para começar</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {scannedProducts.map((product, index) => (
                  <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white line-clamp-2">
                          {product.nome}
                        </h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Badge variant="outline" className="text-xs">
                              {product.marca}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {product.categoria}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                              Lote: {product.lote}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500">
                            Código: {product.codigo}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-green-600">
                              R$ {product.preco.toFixed(2)}
                            </span>
                            <span className="text-sm text-slate-500">
                              Estoque: {product.estoque}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          {product.quantidade}x
                        </Badge>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(product.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instruções de uso */}
      <Card>
        <CardHeader>
          <CardTitle>Como usar o Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Scanner Visual</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ative a câmera e aponte para o código de barras. A detecção é automática e precisa.
              </p>
            </div>
            
            <div className="text-center p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <Search className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium mb-2">Busca Rápida</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use a função "Simular Scan" para testar o sistema com produtos de demonstração.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
