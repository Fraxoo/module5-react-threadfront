import React, { useState } from 'react';
import './auth.css';
import {useAuth} from "../../context/AuthContext"

export default function Register() {
    const{login} = useAuth();
    const [success, setSuccess] = useState<string>("");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    console.log(errors);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});

        try {
            const response = await fetch("http://localhost:8000/users/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                if (data && data.field) {
                    setErrors({ [data.field]: data.message });
                } else if (data && data.message) {
                    setErrors({ global: data.message });
                } else {
                    setErrors({ global: "Erreur serveur" });
                }
                return;
            }

            // Expecting server to return a message or string on success
            setSuccess(typeof data === "string" ? data : (data.message || "Compte créé"));
           

        } catch (err) {
            setErrors({ global: "Erreur" });
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/users/logout", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);

            // If you manage user state in a parent or context, clear it there.
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='register'>

            <h1>Création de Compte</h1>

            <form className='formRegister' onSubmit={handleSubmit}>
                <div className='name'>

                    <input className='register-input'
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: (e.target as HTMLInputElement).value })}
                        placeholder='@Pseudo'
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>

                <div className='email'>

                    <input className='register-input'
                        value={form.email}
                        type='email'
                        onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
                        placeholder='Email'
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className='password'>

                    <input className='register-input'
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: (e.target as HTMLInputElement).value })}
                        placeholder='Mot de passe'
                    />
                </div>

                <div className='confirmPassword'>

                    <input className='register-input'
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: (e.target as HTMLInputElement).value })}
                        placeholder='confirmer mot de passe'
                    />
                </div>
                {success && <p>{success}</p>}
                {errors.global && <p>{errors.global}</p>}
                <button className="register-button" type="submit">Créer un compte</button>
                <button className="logout-button" type="button" onClick={handleLogout}>Se déconnecter</button>

            </form>

        </div>

    );
};

