import { LayoutGrid, Utensils, BookOpen, Wallet, LogOut } from "lucide-react";

const menuItems = [
    { label: "Mesas", icon: <LayoutGrid size={18} /> },
    { label: "Cocina", icon: <Utensils size={18} /> },
    { label: "Menú", icon: <BookOpen size={18} /> },
    { label: "Caja", icon: <Wallet size={18} /> },
];

export default function Aside() {
    return (
        <aside className="flex flex-col w-52 h-screen bg-blue-950 text-gray-100 shadow-lg">
            <div className="p-6 border-b border-blue-800">
                <h2 className="text-2xl font-semibold tracking-wide text-center">POS Elli</h2>
            </div>

            <nav className="flex-1 flex flex-col gap-2 p-4">
                {menuItems.map(({ label, icon }) => (
                    <button
                        key={label}
                        className="flex hover:cursor-pointer items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        {icon}
                        <span>{label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-blue-800">
                <button className="flex hover:cursor-pointer items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-red-800 hover:text-white transition-colors">
                    <LogOut size={18} />
                    <span>Cerrar sesión</span>
                </button>
            </div>

        </aside>
    );
}
