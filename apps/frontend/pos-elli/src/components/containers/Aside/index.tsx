import { NavLink } from "react-router-dom";
import {
    LayoutGrid,
    Utensils,
    BookOpen,
    Wallet,
    LogOut,
} from "lucide-react";

const menuItems = [
    { label: "Mesas", icon: LayoutGrid, to: "/hall" },
    { label: "Cocina", icon: Utensils, to: "/kitchen" },
    { label: "Menú", icon: BookOpen, to: "/menu" },
    { label: "Caja", icon: Wallet, to: "/cash" },
];

export default function Aside() {
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
            {/* ---------- HEADER ---------- */}
            <div className="p-6 border-b border-sidebar-border text-center">
                <h2 className="text-2xl font-bold tracking-wide text-sidebar-foreground">
                    POS Elli
                </h2>
            </div>

            {/* ---------- NAV MENU ---------- */}
            <nav className="flex-1 flex flex-col gap-1 p-4">
                {menuItems.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            `
                            flex items-center gap-3 px-4 py-2.5
                            rounded-lg text-sm font-medium
                            transition-all duration-150
                            
                            ${isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                            }
                            `
                        }
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* ---------- LOGOUT ---------- */}
            <div className="p-4 border-t border-sidebar-border">
                <button
                    className="
                        flex items-center gap-3 w-full px-4 py-2.5
                        rounded-lg text-sm font-medium
                        text-sidebar-foreground
                        hover:bg-destructive hover:text-destructive-foreground
                        transition-all duration-150
                    "
                >
                    <LogOut size={18} />
                    <span>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}
