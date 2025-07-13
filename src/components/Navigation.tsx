
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ShoppingCart, 
  Store, 
  Users, 
  FileText, 
  Camera,
  Trophy
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  translations: {
    dashboard: string;
    sales: string;
    stores: string;
    users: string;
    reports: string;
    scanner: string;
    ranking: string;
  };
}

const Navigation = ({ activeTab, setActiveTab, translations }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: translations.dashboard, icon: BarChart3 },
    { id: 'sales', label: translations.sales, icon: ShoppingCart },
    { id: 'stores', label: translations.stores, icon: Store },
    { id: 'users', label: translations.users, icon: Users },
    { id: 'reports', label: translations.reports, icon: FileText },
    { id: 'scanner', label: translations.scanner, icon: Camera },
    { id: 'ranking', label: translations.ranking, icon: Trophy },
  ];

  return (
    <nav className="border-b bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
