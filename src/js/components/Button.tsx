import { useGlissadeButton } from "@enymo/glissade";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { Spinner, type Icon } from "../icons";

export interface ClickableProps {
    className?: string,
    onClick?: () => void,
    disabled?: boolean,
    submit?: boolean,
    children: ReactNode
}

export interface ButtonProps {
    innerClassName?: string,
    variant: "primary" | "secondary" | "tertiary" | "ghost" | "danger",
    icon?: Icon,
    iconPosition?: "before" | "after",
    loading?: boolean
}

const createButton = <T extends ClickableProps>(Clickable: FC<T>) => (props: ButtonProps & T) => {
    const {
        className,
        innerClassName,
        variant,
        icon: Icon,
        iconPosition,
        disabled,
        onClick,
        submit,
        children
    } = props;

    const { loading, ...glissade } = useGlissadeButton({ disabled, loading: props.loading, onClick, submit });

    return (
        <Clickable
            {...props}
            {...glissade}
            className={clsx("relative cursor-pointer disabled:cursor-not-allowed body-m-md h-(--button-height) rounded-(--button-radius) px-(--button-padding-horizontal)", {
                "flex-row": iconPosition === "before",
                "flex-row-reverse": iconPosition === "after",
                "border-(length:--button-border-width) text-white fill-white bg-primary-500 border-primary-400 hover:bg-primary-600 hover:border-primary-500 disabled:bg-neutral-300 disabled:border-neutral-300": variant === "primary",
                "border-(length:--button-border-width) text-white fill-white bg-neutral-700 border-neutral-600 hover:bg-neutral-800 hover:border-neutral-700 disabled:bg-neutral-300 disabled:border-neutral-300": variant === "secondary",
                "text-text-700 fill-text-700 hover:text-text-900 hover:fill-text-900 disabled:text-text-100 disabled:fill-text-100": variant === "tertiary",
                "border-(length:--button-border-width) text-primary-500 border-primary-500 fill-primary-500 hover:text-primary-600 hover:border-primary-600 hover:bg-primary-100 hover:fill-primary-600 disabled:border-neutral-300 disabled:text-text-100 disabled:fill-text-100": variant === "ghost",
                "border-(length:--button-border-width) text-white fill-white bg-danger-500 border-danger-400 hover:bg-danger-600 hover:border-danger-500 disabled:bg-neutral-300 disabled:border-neutral-300": variant === "danger"
            }, className)}
        >
            <div className={clsx("size-full flex items-center justify-center", { "invisible": loading }, innerClassName)}>
                {Icon && <Icon className="size-3" />}
                {children}
            </div>
            {loading && (
                <div className="absolute inset-1.5">
                    <Spinner className="animate-spin size-full" />
                </div>
            )}
        </Clickable>
    )
}

export default createButton;