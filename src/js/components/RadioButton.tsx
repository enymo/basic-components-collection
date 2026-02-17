import clsx from "clsx"

export default function RadioButton({
    className,
    disabled,
    selected,
    error
}: {
    className?: string,
    disabled?: boolean,
    selected?: boolean,
    error?: boolean
}) {
    return (
        <div className={clsx("size-5 group border-(length:--input-border-width) rounded-full flex justify-center items-center", {
            "bg-bg-100": selected !== true && disabled !== true,
            "border-neutral-300": (selected !== true || disabled !== true) && !error,
            "peer-checked:bg-primary-500 peer-checked:peer-focus:bg-primary-600" : selected === undefined,
            "peer-checked:border-primary-400": selected === undefined && !error,
            "peer-checked:disabled:bg-neutral-500": disabled === undefined,
            "peer-checked:disabled:border-neutral-500": disabled === undefined && !error,
            "bg-primary-500 peer-focus:pg-primary-600": selected === true && disabled !== true,
            "border-primary-400": selected === true && disabled !== true && !error,
            "peer-focus:border-primary-300": selected !== true && disabled !== true && !error,
            "bg-bg-400": disabled === true && selected !== true,
            "bg-neutral-500": disabled === true && selected === true,
            "border-neutral-500": disabled === true && selected === true && !error,
            "border-danger-500": error
        }, className)}>
            <div className={clsx("size-2.5 rounded-full", {
                "bg-bg-100": disabled !== true,
                "group-peer-disabled:bg-neutral-300": disabled === undefined,
                "bg-neutral-300": disabled === true
            })} />
        </div>
    )
}