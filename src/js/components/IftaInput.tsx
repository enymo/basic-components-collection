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
    label,
    error: errorProp,
    disabled: disabledProp,
    ...props
}: IftaInputProps) {
    const id = useId();
    const { error, disabled } = useGlissadeInput({ name: props.name, error: errorProp, disabled: disabledProp });

    const ref = useRef<GlissadeInputRef>(null);

    const handleClick = useCallback(() => {
        ref.current?.focus();
    }, [ref])

    return (
        <div className="flex flex-col gap-2">
            <div onClick={handleClick} className={clsx(
                "flex flex-col justify-between h-(--input-ifta-height)",
                "border-(length:--input-border-width) rounded-xl cursor-text placeholder:text-text-100",
                {
                    "bg-bg-100 border-neutral-300 hover:border-neutral-400 focus-within:shadow-primary-300 focus-within:hover:shadow-primary-300 focus-within:border-primary-500 focus-within:hover:border-primary-500": !disabled && error === undefined,
                    "bg-bg-400 border-neutral-300": disabled,
                    "border-danger-500": error !== undefined
                },
                "shadow-input shadow-neutral-300 w-100"
            )}>
                <label htmlFor={id} className={clsx(
                    "body-xs-md cursor-text",
                    {
                        "text-text-700": !disabled,
                        "text-text-500": disabled,
                    }
                )}>{label}</label>
                <GlissadeInput ref={ref} {...props} disabled={disabled} id={id} className="outline-none body-m text-text-900 disabled:text-text-500 " />
                {props.type === "select" && <Chevron />}
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )
}