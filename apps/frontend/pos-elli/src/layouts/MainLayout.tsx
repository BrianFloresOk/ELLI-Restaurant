import { Outlet } from "react-router-dom";
import Aside from "../components/containers/Aside";

export function MainLayout() {
    return (
        <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
            <Aside />

            <main
                className="
                    flex-1 
                    p-8
                    overflow-y-auto
                    bg-white dark:bg-neutral-800
                    border-l border-neutral-200 dark:border-neutral-700
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
