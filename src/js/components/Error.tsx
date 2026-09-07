import { useError } from "@enymo/glissade";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Error as ErrorIcon } from "../icons";

export default function Error({
    className,
    children
}: {
    className?: string,
    children?: ReactNode
}) {
    const contextError = useError();
    const error = children !== undefined ? children : contextError;

    return error && (
        <div className={clsx("flex items-center gap-1 body-xs fill-danger-500 text-danger-500", className)}>
            <ErrorIcon className="size-4" />
            {children !== undefined ? children : contextError}
        </div>
    )
}