import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth(); // 👈 récupération du context

  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ global: data.message || "Erreur" });
        return;
      }

      /**
       * IMPORTANT :
       * On suppose que le backend renvoie l'utilisateur
       */
      login(data.user); // 👈 stockage global
      setSuccess("Connexion réussie");
    } catch {
      setErrors({ global: "Erreur serveur" });
    }
  };

  return (
    <div className="login">
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Mot de passe"
        />

        {success && <p>{success}</p>}
        {errors.global && <p>{errors.global}</p>}

        <button type="submit">Se connecter</button>
      </form>

      <Link to="/register">Créer un compte</Link>
    </div>
  );
}
