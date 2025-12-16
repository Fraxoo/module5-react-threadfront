import React, { createContext, useContext, useState } from "react";
import type { UserType } from "../types/UserType";

/**
 * Ce type décrit ce que notre contexte va exposer
 */
type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (user: UserType) => void;
  logout: () => void;
};

/**
 * Création du contexte
 * undefined = erreur si utilisé hors Provider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider = composant qui "enveloppe" l'app
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  // Connexion : on stocke l'utilisateur
  const login = (userData: UserType) => {
    setUser(userData);
  };

  // Déconnexion : on vide l'utilisateur
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personnalisé pour simplifier l'utilisation
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
}
