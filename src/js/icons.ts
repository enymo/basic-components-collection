import type { FC, SVGProps } from "react";

const missingIcons = () => {
    throw new Error(`The icons for the basic component collection have not been configured! Please configure the icons by calling 'configureIcons' when booting your application`);
}

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let Chevron: Icon = missingIcons;
export let Tooltip: Icon = missingIcons;
export let ErrorIcon: Icon = missingIcons;
export let Spinner: Icon = missingIcons;
export let Check: Icon = missingIcons;
export let MagnifyingGlass: Icon = missingIcons;

type IconName = "chevron" | "tooltip" | "error" | "spinner" | "check" | "magnifyingGlass";
export function configureIcons({
    chevron,
    tooltip,
    error,
    spinner,
    check,
    magnifyingGlass
}: Record<IconName, Icon>) {
    Chevron = chevron;
    Tooltip = tooltip;
    ErrorIcon = error;
    Spinner = spinner;
    Check = check;
    MagnifyingGlass = magnifyingGlass;
}