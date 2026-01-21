import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import "./auth.css"


export default function Login() {
  const { login } = useAuth(); // 👈 récupération du context
  const navigate = useNavigate();

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
      console.log(data);
      

      if (!response.ok) {
        setErrors({ global: data.message || "Erreur" });
        return;
      }

      /**
       * IMPORTANT :
       * On suppose que le backend renvoie l'utilisateur
       */
      console.log(data);

      login(data.user); // 👈 stockage global
      setSuccess("Connexion réussie");
      
      setTimeout(() => {
        navigate("/home")
      }, 1000)

    } catch {
      setErrors({ global: "Erreur serveur" });
    }
  };

  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login-email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />

        <input className="login-password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Mot de passe"
        />

        {success && <p>{success}</p>}
        {errors.global && <p>{errors.global}</p>}

        <button className="login-button" type="submit">Se connecter</button>
      </form>

      <Link className="login-lien-register" to="/register">Créer un compte</Link>
    </div>
  );
}
