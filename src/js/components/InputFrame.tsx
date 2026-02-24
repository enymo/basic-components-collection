import clsx from "clsx";
import type { ReactNode } from "react";
import { Tooltip } from "../icons";
import Error from "./Error";

export interface InputFrameProps {
    className?: string,
    id?: string,
    label?: ReactNode,
    hint?: ReactNode,
    tooltip?: string,
    error?: string
    children: ReactNode
}

export function InputFrame({
    className,
    id,
    label,
    hint,
    error,
    tooltip,
    children
}: InputFrameProps) {
    return (
        <div className={clsx("flex flex-col gap-1.5", className)}>
            {label && (
                <div className="flex gap-1 items-center">
                    <label htmlFor={id} className="body-s-md text-text-900">{label}</label>
                    {tooltip && (
                        <div title={tooltip}>
                            <Tooltip className="size-4 fill-neutral-600" />
                        </div>
                    )}
                </div>
            )}
            {children}
            {error && <Error>{error}</Error>}
            {hint && <label className="body-xs text-text-500">{hint}</label>}
        </div>
    )
}