import type { FC, SVGProps } from "react";

const missingIcons = () => {
    throw new Error(`The icons for the basic component collection have not been configured! Please configure the icons by calling 'configureIcons' when booting your application`);
}

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let Chevron: Icon = missingIcons;
export let Tooltip: Icon = missingIcons;
let ErrorIcon: Icon = missingIcons;
export { ErrorIcon as Error };
export let Spinner: Icon = missingIcons;
export let Check: Icon = missingIcons;

type IconName = "chevron" | "tooltip" | "error" | "spinner" | "check";
export function configureIcons({
    chevron,
    tooltip,
    error,
    spinner,
    check
}: Record<IconName, Icon>) {
    Chevron = chevron;
    Tooltip = tooltip;
    ErrorIcon = error;
    Spinner = spinner;
    Check = check;
}