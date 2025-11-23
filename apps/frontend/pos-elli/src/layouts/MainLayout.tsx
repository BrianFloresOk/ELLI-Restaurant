import { Outlet } from "react-router-dom";
import Aside from "../components/containers/Aside";

export default function MainLayout() {
    return (
        <div className="
            flex h-screen 
            bg-background/50 dark:bg-background 
            text-foreground
        ">
            <Aside />
            <main
                className="
                    flex-1 
                    p-8
                    overflow-y-auto
                    bg-card dark:bg-card 
                    border-l border-border dark:border-border
                    rounded-tl-3xl
                    shadow-inner
                "
            >
                <div className="max-w-screen-2xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}