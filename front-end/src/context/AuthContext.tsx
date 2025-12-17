import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";



type User = {
    id: number;
    name: string;
    lastname: string,
    email: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadUser() {
            try {
                const res = await fetch("http://localhost:8000/users/me", {
                    credentials: "include",
                    method: "GET"
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error(data)
                    if (location.pathname !== "/register" && location.pathname !== "/login") {
                        navigate("/login");
                    }
                    return
                }

                setUser(data)
            } catch (err) {
                console.error("Erreur /me :", err);
                if (location.pathname !== "/register" && location.pathname !== "/login") {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [navigate]);



    async function logout() {
        await fetch("http://localhost:8000/users/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook pratique
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return ctx;
}