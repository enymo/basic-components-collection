import { useGlissadeChoice, type GlissadeChoiceProps } from "@enymo/glissade";
import clsx from "clsx";
import type { ReactNode } from "react";
import Error from "./Error";
import RadioButton from "./RadioButton";

export interface RadioProps extends GlissadeChoiceProps {
    className?: string,
    children?: ReactNode
}

export default function RadioInput({
    className,
    children,
    ...props
}: RadioProps) {
    const {error, ...glissade} = useGlissadeChoice({...props});

    return (
        <div className={clsx("flex flex-col gap-1", className)}>
            <label className={clsx("body-m flex items-center cursor-pointer", error ? "text-danger-500" : "text-text-900")}>
                <input className="size-0 peer" type="radio" {...glissade} />
                <RadioButton error={error !== undefined} className={clsx({"mr-2": children})} />
                {children}
            </label>
            {error && <Error>{error}</Error>}
        </div>
    )
}