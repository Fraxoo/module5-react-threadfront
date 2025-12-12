import React, { useState } from 'react';
import './auth.css';
import { Link } from 'react-router';



export default function login() {

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");


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
                setError(data);

                return
            }

            setSuccess(data);
            setForm({
            email: "",
            password: "",
            
        });


        } catch (err) {
            setError("Erreur réseau");
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

                        <input className='login-input'
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: (e.target as HTMLInputElement).value })}
                            placeholder='Mot de passe'
                        />


                    </div>
                    {success && <p>{success}</p>}
                    <button className="login-button" type="submit">Se connecter</button>
                    {error && <p style={{ color: 'pink' }}>{error}</p>}

                </form>
                <Link className="login-lien-register" to={"/register"} >
                    <p>Se créer un compte</p>
                </Link>
            </div>




        </div>

    );
};