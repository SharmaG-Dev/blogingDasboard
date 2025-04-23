"use client"
import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const SidebarLink = ({ item }) => {
    const pathname = usePathname()
    const hasSubItems = item.subItems?.length > 0

    // Active state calculations
    const isSelfActive = item.href === pathname
    const isSubActive = useMemo(
        () => hasSubItems && item.subItems.some(si => si.href === pathname),
        [hasSubItems, item.subItems, pathname]
    )
    const isActive = isSelfActive || isSubActive

    // Submenu state management
    const [isOpen, setIsOpen] = useState(isSubActive)
    useEffect(() => {
        if (isSubActive) setIsOpen(true)
    }, [isSubActive])

    // Styling constants
    const iconClasses = "w-5 h-5 mr-3  text-gray-300 dark:text-gray-400"
    const commonClasses = "flex items-center w-full p-2 rounded-lg transition-colors hover:cursor-pointer transitions-all"
    const inactiveBg = "hover:bg-primary-lightest dark:hover:bg-zinc-700"
    const activeStyles = "bg-primary shadow-xl group text-light dark:bg-zinc-800"

    // Link classes generator
    const linkClasses = useMemo(
        () => [
            commonClasses,
            isActive ? activeStyles : inactiveBg,
            !isActive && "text-gray-900 dark:text-white"
        ].filter(Boolean).join(" "),
        [isActive]
    )

    // Subitem classes generator
    const getSubItemClasses = (isActive) => [
        commonClasses,
        "text-sm text-gray-600 dark:text-gray-300",
        isActive ? activeStyles : inactiveBg
    ].filter(Boolean).join(" ")

    // Shared content renderer
    const renderContent = () => (
        <>
            {item.icon && <item.icon className={iconClasses} />}
            <span className="flex-1 text-left">{item.label}</span>
            {hasSubItems && (
                <ChevronRight
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
            )}
        </>
    )

    // Subitem renderer
    const renderSubItem = (subItem, index) => {
        const isSubActive = subItem.href === pathname
        return (
            <li key={index}>
                {subItem.href ? (
                    <Link
                        href={subItem.href}
                        className={getSubItemClasses(isSubActive)}
                    >
                        {subItem.icon && <subItem.icon className={iconClasses} />}
                        {subItem.label}
                    </Link>
                ) : (
                    <button
                        onClick={subItem.onClick}
                        className={getSubItemClasses(isSubActive)}
                    >
                        {subItem.icon && <subItem.icon className={iconClasses} />}
                        {subItem.label}
                    </button>
                )}
            </li>
        )
    }

    return (
        <li className="relative space-y-1">
            {item.href ? (
                <Link href={item.href} className={linkClasses}>
                    {renderContent()}
                </Link>
            ) : (
                <button
                    onClick={() => hasSubItems ? setIsOpen(!isOpen) : item.onClick?.()}
                    className={linkClasses}
                    aria-expanded={hasSubItems ? isOpen : undefined}
                >
                    {renderContent()}
                </button>
            )}

            {hasSubItems && isOpen && (
                <ul className="pl-8 space-y-1">
                    {item.subItems.map(renderSubItem)}
                </ul>
            )}
        </li>
    )
}

export default React.memo(SidebarLink)