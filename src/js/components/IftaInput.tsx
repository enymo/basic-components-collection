import { GlissadeInput, useGlissadeInput, type GlissadeInputProps, type GlissadeInputRef } from "@enymo/glissade";
import clsx from "clsx";
import { useCallback, useId, useRef } from "react";
import { Chevron } from "../icons";
import Error from "./Error";

export interface IftaInputProps extends Omit<GlissadeInputProps, "id"> {
    label: string,
    error?: string
}

export default function IftaInput({
    className,
    label,
    error: errorProp,
    disabled: disabledProp,
    ...props
}: IftaInputProps) {
    const id = useId();
    const { error, disabled } = useGlissadeInput({ name: props.name, error: errorProp, disabled: disabledProp });

    const ref = useRef<GlissadeInputRef>(null);

    const handleClick = useCallback(() => {
        if (ref.current !== null) {
            if (ref.current instanceof HTMLSelectElement) {
                ref.current.showPicker();
            }
            else {
                ref.current.focus();
            }
        }
    }, [ref])

    return (
        <div className={clsx("flex flex-col gap-2", className)}>
            <div onClick={handleClick} className={clsx(
                "relative flex flex-col justify-between h-(--input-ifta-height)",
                "border-(length:--input-border-width) rounded-xl cursor-text placeholder:text-text-100 group shadow-input",
                {
                    "bg-bg-100 border-neutral-300 shadow-neutral-300 hover:border-neutral-400 focus-within:shadow-primary-300 focus-within:hover:shadow-primary-300 focus-within:border-primary-500 focus-within:hover:border-primary-500": !disabled && error === undefined,
                    "bg-bg-400 border-neutral-300 shadow-neutral-300": disabled,
                    "border-danger-500 shadow-danger-300": error !== undefined
                }
            )}>
                <label htmlFor={id} className={clsx(
                    "body-xs-md cursor-text px-(--input-ifta-padding-horizontal) pt-1.5",
                    {
                        "text-text-700": !disabled,
                        "text-text-500": disabled,
                    }
                )}>{label}</label>
                <GlissadeInput ref={ref} {...props} disabled={disabled} id={id} className="px-(--input-ifta-padding-horizontal) pb-1.5 outline-none body-m text-text-900 disabled:text-text-500 appearance-none peer" />
                {props.type === "select" && <Chevron className={clsx(
                    "absolute w-4 fill-neutral-700 top-1/2 -translate-y-1/2 right-(--input-ifta-padding-horizontal) peer-open:rotate-180 transition duration-200 ease-in-out"
                )} />}
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )
}