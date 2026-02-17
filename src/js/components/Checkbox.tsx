import clsx from "clsx"
import { Check } from "../icons"

export default function Checkbox({
    className,
    disabled,
    checked,
    error = false
}: {
    className?: string,
    disabled?: boolean,
    checked?: boolean,
    error?: boolean
}) {
    return (
        <div className={clsx("size-5.5 group border-(length:--input-border-width) rounded-sm flex justify-center items-center", {
            "bg-bg-100 fill-white": checked !== true,
            "border-neutral-300": (checked !== true || disabled === true) && !error,
            "peer-checked:bg-primary-500 peer-checked:peer-focus:bg-primary-600": checked === undefined,
            "peer-checked:border-primary-400": checked === undefined && !error,
            "bg-primary-500 peer-focus:bg-primary-600 fill-white": checked === true && disabled !== true,
            "border-primary-400": checked === true && disabled !== true && !error,
            "peer-focus:border-primary-300": checked !== true && disabled !== true && !error,
            "bg-bg-400 fill-neutral-400": disabled === true,
            "peer-disabled:bg-bg-400 peer-disabled:fill-neutral-400": disabled === undefined,
            "peer-disabled:border-neutral-300": disabled === undefined && !error,
            "border-danger-500": error
        }, className)}>
            <Check className={clsx("size-4", {
                "block": checked === true,
                "hidden": checked !== true,
                "group-peer-checked:block": checked === undefined
            })} />
        </div>
    )
}