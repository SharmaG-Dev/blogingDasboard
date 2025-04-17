import Logo from "@/components/Logo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./userMenu";



export default function DashboardHeader() {
    return (
        <div className="p-4 md:px-10 border-b border-secondary-lightest flex justify-between dark:bg-zinc-900">
            <div >
                <Logo />
            </div>
            <div className="flex gap-2 items-center">
                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    )
}