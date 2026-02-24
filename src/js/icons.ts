import type { FC, SVGProps } from "react";

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let Chevron: Icon;
export let Tooltip: Icon;
export let Error: Icon;
export let Spinner: Icon;
export let Check: Icon;

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
    Error = error;
    Spinner = spinner;
    Check = check;
}