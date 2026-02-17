import { useGlissadeChoice, type GlissadeChoiceProps } from "@enymo/glissade";
import clsx from "clsx";
import type { ReactNode } from "react";
import Checkbox from "./Checkbox";
import Error from "./Error";

export interface CheckboxInputProps extends GlissadeChoiceProps {
    className?: string,
    children?: ReactNode
}

export default function CheckboxInput({
    className,
    children,
    ...props
}: CheckboxInputProps) {
    const {error, ...glissade} = useGlissadeChoice({...props})

    return (
        <div className={clsx("flex flex-col gap-1", className)}>
            <label className={clsx("body-m flex items-center cursor-pointer", error ? "text-danger-500" : "text-text-900")}>
                <input className="size-0 peer" type="checkbox" {...glissade} />
                <Checkbox className={clsx({"mr-2": children})} error={error !== undefined} />
                {children}
            </label>
            {error && <Error>{error}</Error>}
        </div>
    )
}