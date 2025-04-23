"use client"
import SidebarLink from "./SidebarLink";
import { sidebarItems } from "./MenuItems";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "@/components/globals";



export default function DashboardSidebar() {
    return (
        <div className="w-full flex flex-col h-full justify-between">
            <nav className="w-full p-4 bg-light rounded-xl shadow-xl dark:bg-zinc-800 h-full max-h-[70vh] overflow-y-auto">
                <ul className="space-y-2">
                    {sidebarItems?.map((item, index) => (
                        <SidebarLink key={index} item={item} />
                    ))}
                </ul>
            </nav>

            <div className="flex items-center justify-between bg-white-transparent p-2 rounded-xl shadow-xl ">
                <div className="flex items-center gap-2 ">
                    <Image src='/img/user.png' width={500} height={500} alt='user' className="w-10 h-10 rounded-full " />
                    <div className="flex flex-col gap-1">
                        <h5 className="text-sm font-semibold text-dark">Caphsri Dasd</h5>
                        <h6 className="text-xs font-semibold text-secondary">caphsri@gmail.com</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}