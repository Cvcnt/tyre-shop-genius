
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Store, 
  TrendingUp, 
  Users, 
  Package, 
  Camera, 
  BarChart3,
  Trophy,
  Bell,
  Settings,
  Moon,
  Sun,
  Languages,
  Zap,
  Target,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { AuthProvider } from '@/components/AuthProvider';
import Dashboard from '@/components/Dashboard';
import SalesForm from '@/components/SalesForm';
import StoreManagement from '@/components/StoreManagement';
import UserManagement from '@/components/UserManagement';
import Reports from '@/components/Reports';
import BarcodeScanner from '@/components/BarcodeScanner';
import StoreRanking from '@/components/StoreRanking';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "Conexão restaurada",
        description: "Sincronizando dados...",
        variant: "default",
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "Modo offline ativado",
        description: "Os dados serão sincronizados quando a conexão for restaurada",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const translations = {
    pt: {
      title: "TireSaaS - Gestão Inteligente de Pneus",
      dashboard: "Dashboard",
      sales: "Vendas",
      stores: "Lojas", 
      users: "Usuários",
      reports: "Relatórios",
      scanner: "Scanner",
      ranking: "Ranking"
    },
    en: {
      title: "TireSaaS - Smart Tire Management",
      dashboard: "Dashboard",
      sales: "Sales",
      stores: "Stores",
      users: "Users", 
      reports: "Reports",
      scanner: "Scanner",
      ranking: "Ranking"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <AuthProvider>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
        {/* Header com status offline e controles */}
        <header className="sticky top-0 z-50 border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.title}
                  </h1>
                </div>
                {isOffline && (
                  <Badge variant="destructive" className="animate-pulse">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Offline
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  className="text-slate-600 dark:text-slate-300"
                >
                  <Languages className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-slate-600 dark:text-slate-300"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Navegação principal */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} translations={t} />

        {/* Conteúdo principal */}
        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            {/* Tabs de conteúdo */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="dashboard" className="space-y-6">
                <Dashboard />
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <SalesForm />
              </TabsContent>

              <TabsContent value="stores" className="space-y-6">
                <StoreManagement />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Reports />
              </TabsContent>

              <TabsContent value="scanner" className="space-y-6">
                <BarcodeScanner />
              </TabsContent>

              <TabsContent value="ranking" className="space-y-6">
                <StoreRanking />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Footer com informações de sincronização */}
        <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                  <span>{isOffline ? 'Offline' : 'Online'}</span>
                </div>
                <span>Última sync: há 2 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Powered by IA</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default Index;
