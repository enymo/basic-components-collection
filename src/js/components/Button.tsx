import { useGlissadeButton } from "@enymo/glissade";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { Spinner, type Icon } from "../icons";

export interface ClickableProps {
    className?: string,
    onClick?: (...args: any[]) => void,
    disabled?: boolean,
    submit?: boolean,
    children?: ReactNode
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
                "border-(length:--button-border-width) shadow-button text-button-primary-text fill-button-primary-text bg-button-primary-bg border-button-primary-border shadow-button-primary-shadow hover:bg-button-primary-hover-bg hover:border-button-primary-hover-border hover:shadow-button-primary-hover-shadow hover:text-button-primary-hover-text hover:fill-button-primary-hover-text disabled:bg-button-primary-disabled-bg disabled:border-button-primary-disabled-border disabled:text-button-primary-disabled-text disabled:fill-button-primary-disabled-text": variant === "primary",
                "border-(length:--button-border-width) shadow-button text-button-secondary-text fill-button-secondary-text bg-button-secondary-bg border-button-secondary-border shadow-button-secondary-shadow hover:bg-button-secondary-hover-bg hover:border-button-secondary-hover-border hover:shadow-button-secondary-hover-shadow hover:text-button-secondary-hover-text hover:fill-button-secondary-hover-text disabled:bg-button-secondary-disabled-bg disabled:border-button-secondary-disabled-border disabled:text-button-secondary-disabled-text disabled:fill-button-secondary-disabled-text": variant === "secondary",
                "text-button-tertiary-text fill-button-tertiary-text hover:text-button-tertiary-hover-text hover:fill-button-tertiary-hover-text disabled:text-button-tertiary-disabled-text disabled:fill-button-tertiary-disabled-text": variant === "tertiary",
                "border-(length:--button-border-width) shadow-button text-button-ghost-text fill-button-ghost-text border-button-ghost-border hover:text-button-ghost-hover-text hover:fill-button-ghost-hover-text hover:border-button-ghost-hover-border hover:bg-button-ghost-hover-bg disabled:border-button-ghost-disabled-border disabled:text-button-ghost-disabled-text disabled:fill-button-ghost-disabled-text": variant === "ghost",
                "border-(length:--button-border-width) shadow-button text-button-danger-text fill-button-danger-text bg-button-danger-bg border-button-danger-border shadow-button-danger-shadow hover:bg-button-danger-hover-bg hover:border-button-danger-hover-border hover:text-button-danger-hover-text hover:fill-button-danger-hover-text hover:shadow-button-danger-hover-shadow disabled:bg-button-danger-disabled-bg disabled:border-button-danger-disabled-border disabled:text-button-danger-disabled-text disabled:fill-button-danger-disabled-text": variant === "danger"
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