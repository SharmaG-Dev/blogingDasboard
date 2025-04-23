


export default function PageLayout({ title, children }) {
    return <div className="p-3 h-full flex flex-col items-start gap-5">
        <h1 className="text-xl font-bold text-center text-dark">{title}</h1>
        <div className="p-3 rounded-xl h-full bg-white w-full shadow-lg max-h-full overflow-y-auto">
            {children}
        </div>
    </div>
}