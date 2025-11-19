interface TableHallProps {
    number: number;
    status?: "free" | "occupied" | "reserved";
    onClick?: () => void;
}

export function TableHall({ number, status = "free", onClick }: TableHallProps) {
    const statusColors = {
        free: "bg-green-500/20 border-green-500",
        occupied: "bg-red-500/20 border-red-500",
        reserved: "bg-yellow-500/20 border-yellow-500",
    };

    return (
        <button
            onClick={onClick}
            className={`
        w-20 h-20 rounded-xl flex items-center justify-center 
        border-2 text-sky-950 font-semibold select-none 
        shadow-lg transition-all
        hover:scale-105 active:scale-95
        ${statusColors[status]}
      `}
        >
            Mesa {number}
        </button>
    );
}
