import React, { createContext, useContext, useEffect, useState } from "react";
import type { UserType } from "../types/UserType";
import { useLocation, useNavigate } from "react-router";

/**
 * Ce type décrit ce que notre contexte va exposer
 */
type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (user: UserType) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

/**
 * Création du contexte
 * undefined = erreur si utilisé hors Provider
 */

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider = composant qui "enveloppe" l'app
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {


  const navigate = useNavigate()
  const location = useLocation();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setloading] = useState(true);

  // on demande au back-end qui est connecté
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          credentials: "include",
          method: "GET"
        });

        const data = await response.json();

        if (!response.ok) {
          setUser(null);
          navigate("/login")
          return;
        }

        setUser(data)

      }
      catch {
        setUser(null);
        navigate("/login")
        return;
      }
      finally {
        setloading(false);
      }
    };

    fetchMe();
  }, [navigate, location.pathname]);

  //connexion : on stocke l'utilisateur

  const login = (userData: UserType) => {
    setUser(userData);
  };

  // Déconnexion : on vide l'utilisateur
  const logout = async () => {
    await fetch("http://localhost:8000/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        loading,
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
