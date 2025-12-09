import React, { useState } from 'react';
import './auth.css';


export default function register() {

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");


        try {
            const response = await fetch("http://localhost:8000/users/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                setError("Erreur lors de la création du compte");

                return
            }

            const data = await response.json();
            setSuccess(data);


        } catch (err) {
            setError("Erreur réseau");
        }
    };

    return (
        <div className='register'>

            <h1>|Création de Compte</h1>

            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <h1>@pseudo</h1>
                    <input
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: (e.target as HTMLInputElement).value })}
                        
                    />
                </div>

                <div className='email'>
                    <h1>email</h1>
                    <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
                        
                    />
                </div>

                <div className='password'>
                    <h1>Password</h1>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: (e.target as HTMLInputElement).value })}
                    
                    />
                </div>

                <div className='confirmPassword'>
                    <h1>Confirm Password</h1>
                    <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: (e.target as HTMLInputElement).value })}
                        
                    />
                </div>
                {success && <p>{success}</p>}
                <button className="button" type="submit">Créer un compte</button>
                {error && <p style={{ color: 'pink' }}>{error}</p>}
            </form>

        </div>

    );
};

