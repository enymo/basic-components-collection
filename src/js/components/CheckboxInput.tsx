import { useGlissadeChoice, type GlissadeChoiceProps } from "@enymo/glissade";
import type { ReactNode } from "react";

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
        <label className={className}>
            <input className="size-0" type="checkbox" {...glissade} />
            
        </label>
    )
}