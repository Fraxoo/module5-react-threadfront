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
                setErrors([data.field] = data.message)
                return;
            }

            setSuccess(data);



        } catch (err) {
            setErrors({ global: "Erreur" });
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
                <button className="button" type="submit">Créer un compte</button>



            </form>

        </div>

    );
};

