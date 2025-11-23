import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutGrid,
    Utensils,
    BookOpen,
    Wallet,
    LogOut,
    Sun,
    Moon,
} from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuthContext";

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const Icon = theme === 'dark' ? Sun : Moon;
    const label = theme === 'dark' ? "Modo Claro" : "Modo Oscuro";

    return (
        <button
            onClick={toggleTheme}
            className="
                flex items-center gap-3 w-full px-4 py-2.5
                rounded-lg text-sm font-medium
                text-sidebar-foreground
                hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground
                transition-all duration-150
            "
            aria-label={`Cambiar a ${label}`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );
};

const menuItems = [
    { label: "Mesas", icon: LayoutGrid, to: "/system" },
    { label: "Cocina", icon: Utensils, to: "/system/kitchen" },
    { label: "Menú", icon: BookOpen, to: "/system/menu" },
    { label: "Caja", icon: Wallet, to: "/systemcash" },
];

export default function Aside() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        }
    };

    return (
        <aside
            className="
                flex flex-col
                w-60 h-screen
                bg-sidebar-background text-sidebar-foreground
                border-r border-sidebar-border
                shadow-elegant
            "
        >
            <div className="p-6 border-b border-sidebar-border text-center">
                <h2 className="text-2xl font-bold tracking-wide text-sidebar-foreground">
                    POS Elli
                </h2>
            </div>

            <nav className="flex-1 flex flex-col gap-1 p-4">
                {menuItems.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                             ${isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                            }`
                        }
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 flex flex-col gap-1 border-t border-sidebar-border">
                <DarkModeToggle />
            </div>

            <div className="p-4 border-t border-sidebar-border">
                <button
                    className="
                        flex items-center gap-3 w-full px-4 py-2.5
                        rounded-lg text-sm font-medium
                        text-sidebar-foreground
                        hover:bg-destructive hover:text-destructive-foreground
                        transition-all duration-150
                    "
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}
