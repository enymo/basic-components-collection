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
    variant: "primary" | "secondary" | "tertiary" | "ghost",
    icon?: Icon,
    iconPosition?: "before" | "after",
    loading?: boolean
}

export const createButton = <T extends ClickableProps>(Clickable: FC<T>) => (props: ButtonProps & T) => {
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

    const {loading, ...glissade} = useGlissadeButton({disabled, loading: props.loading, onClick, submit});

    return (
        <Clickable 
            {...props}
            {...glissade}
            className={clsx("relative cursor-pointer disabled:cursor-not-allowed body-m-md h-(--button-height) border-(--button-border-width) rounded-(--button-radius) px-(--button-padding-horizontal)", {
                "flex-row": iconPosition === "before",
                "flex-row-reverse": iconPosition === "after",
                "text-white fill-white bg-primary-500 border-primary-400 hover:bg-primary-600 hover:border-primary-500 disabled:bg-neutral-300 disabled:border-neutral-300": variant === "primary"
            }, className)} 
        >
            <div className={clsx("size-full flex items-center justify-center", {"invisible": loading}, innerClassName)}>
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