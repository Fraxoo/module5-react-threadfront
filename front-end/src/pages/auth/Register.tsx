import "./auth.css";
import TitleComponent from "../../components/TitleComponent";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();

    const [success, setSuccess] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({});
        setSuccess("");

        try {
            const res = await fetch(`http://localhost:8000/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors(Object.fromEntries((data.errors ?? []).map((e: any) => [e.field, e.message])));
                return;
            }

            setSuccess("Inscription réussie !");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            console.error(err);
            setErrors({ global: "Erreur de connexion, veuillez réessayer." });
        }
    };

    return (
        <main>
            <div className="register">
                <TitleComponent title={"Création de compte"} />
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="@Pseudo"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}

                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmer"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        {errors.password && <p>{errors.password}</p>}
                        {errors.global && <p className="error-message">{errors.global}</p>}

                        {success && <p>{success}</p>}

                        <button type="submit">Créer un compte</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
