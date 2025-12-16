import React, { useState } from "react";
import "./auth.css";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { login } = useAuth();

  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8000/users/register", {
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

      // 👉 si le backend renvoie l'utilisateur
      if (data.user) {
        login(data.user);
      }

      setSuccess(data.message || "Compte créé avec succès");
    } catch {
      setErrors({ global: "Erreur serveur" });
    }
  };

  return (
    <div className="register">
      <h1>Création de Compte</h1>

      <form className="formRegister" onSubmit={handleSubmit}>
        <input
          className="register-input"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="@Pseudo"
        />

        <input
          className="register-input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />

        <input
          className="register-input"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Mot de passe"
        />

        <input
          className="register-input"
          type="password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          placeholder="Confirmer le mot de passe"
        />

        {success && <p>{success}</p>}
        {errors.global && <p>{errors.global}</p>}

        <button className="register-button" type="submit">
          Créer un compte
        </button>
      </form>
    </div>
  );
}
