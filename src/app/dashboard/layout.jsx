import { DashboardHeader, DashboardSidebar } from "@/components/dashboard-layout";

export default function RootLayout({ children }) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <header className="flex-shrink-0">
                <DashboardHeader />
            </header>
            <div className="flex flex-1 max-h-[calc(100% - 72.8px)] overflow-hidden">
                <aside className="w-64  flex-shrink-0 bg-gray-50 overflow-y-hidden">
                    <DashboardSidebar />
                </aside>
                <main className="flex-1 overflow-y-auto bg-white p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
