import { DashboardHeader, DashboardSidebar } from "@/components/dashboard-layout";

export default function RootLayout({ children }) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* <header className="flex-shrink-0">
                <DashboardHeader />
            </header> */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <aside className="w-64 flex-shrink-0 p-4 bg-primary-lightest overflow-y-auto ">
                    <DashboardSidebar />
                </aside>
                <main className="flex-1 bg-primary-lightest overflow-y-auto bg-dashboard p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}