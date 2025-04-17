
import clsx from "clsx";

export default function Logo({ className = "" }) {
    return (
        <h3
            className={clsx(
                "text-dark dark:text-white font-semibold text-xl",
                className
            )}
        >
            Devfolio<span className="text-primary font-bold">.</span>
        </h3>
    );
}