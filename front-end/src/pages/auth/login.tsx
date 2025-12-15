import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router';



export default function login() {

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    console.log(errors);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({});



        try {
            const response = await fetch("http://localhost:8000/users/login", {
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
        <div className='login'>

            <h1>Connexion</h1>

            <div className='login-form-div'>
                <form className='login-form' onSubmit={handleSubmit}>

                    <div className='login-email'>

                        <input className='login-input'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
                            placeholder='Email'
                        />
                    </div>

                    <div className='login-password'>

                        <input
                            className='login-input'
                            type='password'
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: (e.target as HTMLInputElement).value })}
                            placeholder='Mot de passe'
                        />

                    </div>

                    {success && <p>{success}</p>}
                    {errors.global && <p>{errors.global}</p>}
                    <button className="login-button" type="submit">Se connecter</button>
                    <button className="logout-button" type="button" onClick={handleLogout}>Se déconnecter</button>

                </form>
                <Link className="login-lien-register" to={"/register"} >
                    <p>Se créer un compte</p>
                </Link>
            </div>




        </div>

    );
};