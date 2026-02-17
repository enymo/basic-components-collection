import clsx from "clsx";
import type { ReactNode } from "react";
import { Error as ErrorIcon } from "../icons";

export default function Error({
    className,
    children
}: {
    className?: string,
    children: ReactNode
}) {
    return (
        <div className={clsx("flex items-center gap-1 body-xs fill-danger-500 text-danger-500", className)}>
            <ErrorIcon className="size-3" />
            {children}
        </div>
    )
}