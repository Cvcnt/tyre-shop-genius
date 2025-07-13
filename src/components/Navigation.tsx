
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  ShoppingCart, 
  Store, 
  Users, 
  FileText, 
  Camera, 
  Trophy,
  Zap
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  translations: any;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, translations }) => {
  const navItems = [
    { id: 'dashboard', label: translations.dashboard, icon: BarChart3, badge: null },
    { id: 'sales', label: translations.sales, icon: ShoppingCart, badge: '3' },
    { id: 'stores', label: translations.stores, icon: Store, badge: null },
    { id: 'users', label: translations.users, icon: Users, badge: null },
    { id: 'reports', label: translations.reports, icon: FileText, badge: null },
    { id: 'scanner', label: translations.scanner, icon: Camera, badge: 'IA' },
    { id: 'games', label: translations.games, icon: Trophy, badge: '+50' }
  ];

  return (
    <nav className="border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 whitespace-nowrap relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === 'IA' ? "secondary" : "destructive"} 
                    className="text-xs px-1 py-0 h-4 min-w-4"
                  >
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
