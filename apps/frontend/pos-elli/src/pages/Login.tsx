import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuthHook } from "../hooks/authHook";
import { useInputForm } from "../hooks/inputForm";

interface LoginFormState {
    email: string;
    password: string;
}

export default function Login() {
    const { state, handleChange, reset } = useInputForm<LoginFormState>({
        email: '',
        password: ''
    });
    const { isAuthenticated, login } = useAuthHook();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(state.email, state.password);
            if (isAuthenticated) {
                console.log("User is authenticated, redirecting...");
                reset()
            }

            if (!isAuthenticated) {
                alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
                reset()
            }

        } catch (error) {
            console.error("Login error:", error);
        }

    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full">

                <div className="text-center md:text-left md:w-1/2 space-y-6">
                    <div className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Elli System
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 font-light max-w-md mx-auto md:mx-0">
                        Sistema POS exclusivo para restaurantes de clase mundial
                    </p>
                    <div className="flex justify-center md:justify-start space-x-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-2xl">★</span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/10 w-full max-w-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-blue-500"></div>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-white text-2xl font-bold">E</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin} method="POST">
                        <Input
                            name="email"
                            label="Email"
                            placeholder="usuario@restaurante.com"
                            type="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                        <Input
                            name="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            type="password"
                            value={state.password}
                            onChange={handleChange}
                        />

                        <Button
                            variant="primary"
                            size="medium"
                            label="Ingresar al Sistema"
                            type="submit"
                        />
                    </form>

                </div>
            </div>
        </section>
    );
}