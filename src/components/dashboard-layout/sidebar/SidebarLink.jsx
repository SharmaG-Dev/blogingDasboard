"use client"
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const SidebarLink = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const commonClasses = "flex items-center w-full p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700";
    const iconClasses = "w-5 h-5 mr-3 text-gray-500 dark:text-gray-400";

    const renderContent = () => (
        <>
            {item.icon && <item.icon className={iconClasses} />}
            <span className="flex-1 text-left">{item.label}</span>
            {hasSubItems && (
                <ChevronRight
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
            )}
        </>
    );

    return (
        <li className="relative space-y-1">
            {item.href ? (
                <a
                    href={item.href}
                    className={`${commonClasses} text-gray-900 dark:text-white`}
                >
                    {renderContent()}
                </a>
            ) : (
                <button
                    onClick={hasSubItems ? () => setIsOpen(!isOpen) : item.onClick}
                    className={`${commonClasses} w-full text-left text-gray-900 dark:text-white`}
                    aria-expanded={hasSubItems ? isOpen : undefined}
                >
                    {renderContent()}
                </button>
            )}

            {hasSubItems && isOpen && (
                <ul className="pl-8 space-y-1">
                    {item.subItems.map((subItem, index) => (
                        <li key={index}>
                            {subItem.href ? (
                                <a
                                    href={subItem.href}
                                    className={`${commonClasses} text-sm text-gray-600 dark:text-gray-300`}
                                >
                                    {subItem.icon && <subItem.icon className={iconClasses} />}
                                    {subItem.label}
                                </a>
                            ) : (
                                <button
                                    onClick={subItem.onClick}
                                    className={`${commonClasses} text-sm text-gray-600 dark:text-gray-300`}
                                >
                                    {subItem.icon && <subItem.icon className={iconClasses} />}
                                    {subItem.label}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};


export default SidebarLink