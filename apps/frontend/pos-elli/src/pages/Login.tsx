import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useInputForm } from "../hooks/useInputForm";
import { useAuth } from "../hooks/useAuthContext";

interface LoginFormState {
    email: string;
    password: string;
}

export default function Login() {
    const { state, handleChange, reset } = useInputForm<LoginFormState>({
        email: "",
        password: "",
    });

    const { login, isAuthenticated, error, isLoggingIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(state.email, state.password);
            reset();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/hall");
        }
    }, [isAuthenticated, navigate]);

    const isButtonDisabled = isLoggingIn;

    return (
        <section className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-14 max-w-6xl w-full">

                <div className="text-center md:text-left md:w-1/2 space-y-7">
                    <div className="inline-block p-5 rounded-xl bg-card/40 backdrop-blur border border-border shadow-elegant">
                        <h1 className="text-5xl md:text-6xl font-extrabold">
                            Elli System
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md mx-auto md:mx-0 leading-relaxed">
                        Sistema POS exclusivo para restaurantes de clase mundial
                    </p>

                    <div className="flex justify-center md:justify-start space-x-1.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-accent text-2xl">★</span>
                        ))}
                    </div>
                </div>

                <div
                    className="bg-card p-10 rounded-xl shadow-elegant border border-border w-full max-w-md relative overflow-hidden"
                    style={{ borderRadius: "var(--radius)" }}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-1 animate-pulse-slow"
                        style={{ background: "var(--gradient-primary)" }}
                    ></div>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-card">
                            <span className="text-accent-foreground text-2xl font-bold">E</span>
                        </div>
                        <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <Input
                            name="email"
                            label="Email"
                            placeholder="usuario@restaurante.com"
                            type="email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            name="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            type="password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />

                        <Button
                            variant="accent"
                            className="w-full cursor-pointer"
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled ? "Ingresando..." : "Login"}
                        </Button>

                        {error && (
                            <p className="text-red-500 text-center text-sm mt-2">
                                {error}
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </section>
    );
}
