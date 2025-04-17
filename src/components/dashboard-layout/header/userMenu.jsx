"use client"
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export default function UserMenu() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(null)
    const userMenuRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false)
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return <div className="relative" ref={userMenuRef}>
        <button
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 p-1"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </div>
        </button>

        {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                </div>
                <div>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1"></div>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        )}
    </div>
}