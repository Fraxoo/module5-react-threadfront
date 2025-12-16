import "./auth.css";
import TitleComponent from "../../components/TitleComponent";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const [success, setSuccess] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess("");
        setErrors({});

        try {
            const res = await fetch(`http://localhost:8000/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                setErrors(Object.fromEntries((data.errors ?? []).map((e: any) => [e.field, e.message])));
                return;
            }

            setSuccess("Connexion réussie");
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (err) {
            console.error(err);
            setErrors({ global: "Erreur de connexion, veuillez réessayer." });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <main>
            <div className="login">
                <TitleComponent title="Connexion" />
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {success && <p className="success-message">{success}</p>}
                        {errors.global && <p className="error-message">{errors.global}</p>}
                        <button type="submit">Se connecter</button>
                    </form>
                    <Link to={"/register"}>Se créer un compte</Link>
                </div>
            </div>
        </main>
    );
}
