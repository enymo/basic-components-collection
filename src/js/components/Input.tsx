import { GlissadeInput, useGlissadeInput, type GlissadeInputProps } from "@enymo/glissade";
import clsx from "clsx";
import { useId } from "react";
import { Chevron } from "../icons";
import { InputFrame, type InputFrameProps } from "./InputFrame";

export type InputProps = Omit<InputFrameProps, "children" | "id"> & Omit<GlissadeInputProps, "id">;

export default function Input({
    className,
    inputClassName,
    textareaClassName,
    selectClassName,
    error: errorProp,
    name,
    disabled,
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
                {props.type === "select" && <Chevron className="size-4 absolute top-1/2 -translate-y-1/2 right-(--input-padding-horizontal) fill-neutral-700 transition-transform peer-open:rotate-180" />}
            </div>
        </InputFrame>
    )
}