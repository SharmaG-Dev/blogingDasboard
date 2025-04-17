"use client"


import SidebarLink from "./SidebarLink";
import { sidebarItems } from "./MenuItems";
import { LogOut, User } from "lucide-react";




export default function DashboardSidebar() {

    return (
        <div className="h-full border-r border-secondary-lightest">
            <nav className="w-full p-4 bg-white shadow-lg dark:bg-zinc-800 h-screen">
                <ul className="space-y-2 overflow-y-auto">
                    {sidebarItems.map((item, index) => (
                        <SidebarLink key={index} item={item} />
                    ))}
                </ul>
            </nav>

        </div>
    )
}