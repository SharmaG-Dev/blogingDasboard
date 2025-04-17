import { ActivitySquareIcon, AlertCircle, CheckCircle, File, Folder, Grid, Home, MessageCircle, Notebook, Settings, UserCheck, UserIcon, Users, Users2 } from "lucide-react";
export const sidebarItems = [
    {
        label: 'Dashboard',
        icon: Home,
        href: '/dashboard'
    },
    {
        label: 'Blogs',
        icon: Notebook,
        href: '/dashboard/blogs'
    },
    {
        label: 'Categories',
        icon: Grid,
        href: '/dashboard/categories'
    },
    {
        label: 'Friends',
        icon: Users2,
        subItems: [
            { label: 'Friends', icon: Users, href: '/dashboard/friends' },
            { label: 'Requests', icon: UserIcon, href: '/dashboard/requests' },
            { label: 'Find Friends', icon: UserCheck, href: '/dashboard/find-friends' }
        ]
    },
    {
        label: 'Query Rooms',
        icon: MessageCircle,
        subItems: [
            { label: 'Active Rooms', icon: ActivitySquareIcon, href: '/dashboard/query-rooms/active' },
            { label: 'Solved Rooms', icon: CheckCircle, href: '/dashboard/query-rooms/solved' }
        ]
    },
    {
        label: 'Documents',
        icon: File,
        subItems: [
            { label: 'Templates', icon: Folder, href: '/templates' },
            { label: 'Archive', icon: Folder, onClick: () => alert('Archive clicked') }
        ]
    },
    {
        label: 'Settings',
        icon: Settings,
        subItems: [
            { label: 'Profile', icon: Users, href: '/dashboard/profile' },
            { label: 'Settings', icon: Settings, href: '/dashboard/setting' },
            { label: 'Notifications', icon: AlertCircle, onClick: () => alert('Notifications clicked') }
        ]
    },
    {
        label: 'Support',
        icon: AlertCircle,
        onClick: () => alert('Support clicked')
    }
];