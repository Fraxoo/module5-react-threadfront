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
            const data = await response.json();
            console.log(data);
            
            if (!response.ok) {
                setError(data);

                return
            }

            setSuccess(data);


        } catch (err) {
            setError("Erreur réseau");
        }
    };

    return (
        <div className='register'>

            <h1>Création de Compte</h1>

            <form className='formRegister'onSubmit={handleSubmit}>
                <div className='name'>
                    
                    <input className='register-input'
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: (e.target as HTMLInputElement).value })}
                        placeholder='@Pseudo'
                    />
                </div>

                <div className='email'>
                   
                    <input className='register-input'
                        value={form.email}
                        type='email'
                        onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
                        placeholder='Email'
                    />
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
                        placeholder='Confirmer le mot de passe'
                    />
                </div>
                {success && <p>{success}</p>}
                <button className="button" type="submit">Créer un compte</button>
                {error && <p style={{ color: 'pink' }}>{error}</p>}
            </form>

        </div>

    );
};

