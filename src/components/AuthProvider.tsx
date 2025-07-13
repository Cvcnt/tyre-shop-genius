
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  userProfile: UserProfile | null;
}

interface UserProfile {
  id: string;
  nome: string;
  perfil: 'proprietario' | 'gerente' | 'vendedor';
  loja_id?: string;
  avatar_url?: string;
  badges: string[];
  pontos: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de usuário autenticado para demo
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: 'joao@tiresaas.com',
        user_metadata: { name: 'João Silva' }
      } as User;

      const mockProfile: UserProfile = {
        id: '1',
        nome: 'João Silva',
        perfil: 'proprietario',
        badges: ['Primeiro Login', 'Vendedor Top', 'Meta Batida'],
        pontos: 1250
      };

      setUser(mockUser);
      setUserProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Implementar autenticação Supabase aqui
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    // Implementar registro Supabase aqui
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    userProfile
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Carregando TireSaaS...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
