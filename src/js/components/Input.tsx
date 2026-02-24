import { GlissadeInput, useGlissadeInput, type GlissadeInputProps } from "@enymo/glissade";
import clsx from "clsx";
import { useId, type FC, type SVGProps } from "react";
import { Chevron } from "../icons";
import { InputFrame, type InputFrameProps } from "./InputFrame";

export interface InputProps extends Omit<InputFrameProps, "children" | "id">, Omit<GlissadeInputProps, "id"> {
    prefixIcon?: FC<SVGProps<SVGSVGElement>>
}

export default function Input({
    className,
    inputClassName,
    textareaClassName,
    selectClassName,
    error: errorProp,
    name,
    disabled,
    prefixIcon: PrefixIcon,
    ...props
}: InputProps) {
    const id = useId();
    const {error, ...glissade} = useGlissadeInput({name, error: errorProp, disabled});

    return (
        <InputFrame id={id} error={error} {...props}>
            <div className="relative">
                <GlissadeInput className={clsx(
                    "px-(--input-padding-horizontal) rounded-(--input-radius) border-(length:--input-border-width) outline-none body-m",
                    "text-text-900 bg-bg-100 placeholder:text-text-100 disabled:bg-bg-400 disabled:text-text-500",
                    error === undefined ? "hover:border-neutral-400 focus:border-primary-500 focus:hover:border-primary-500 border-neutral-300" : "border-danger-500",
                    {
                        "pl-[calc(var(--spacing)*6+var(--input-padding-horizontal))]": PrefixIcon !== undefined
                    },
                    className
                )} inputClassName={clsx(
                    "h-(--input-height)",
                    inputClassName
                )} textareaClassName={clsx(
                    "h-32 py-(--input-padding-horizontal) resize-none",
                    textareaClassName
                )} selectClassName={clsx(
                    "peer h-(--input-height) pr-[calc(var(--spacing)*5.5+var(--input-padding-horizontal))] appearance-none",
                    selectClassName
                )} id={id} {...props} {...glissade} />
                {PrefixIcon && <PrefixIcon className="size-4 fill-neutral-700 absolute top-1/2 -translate-y-1/2 left-(--input-padding-horizontal)" />}
                {props.type === "select" && <Chevron className="size-4 absolute top-1/2 -translate-y-1/2 right-(--input-padding-horizontal) fill-neutral-700 transition-transform peer-open:rotate-180" />}
            </div>
        </InputFrame>
    )
}