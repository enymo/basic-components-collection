import type { FC, SVGProps } from "react";

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let Chevron: Icon;
export let Tooltip: Icon;
export let Error: Icon;
export let Spinner: Icon;

export function configureIcons({
    chevron,
    tooltip,
    error,
    spinner
}: {
    chevron: Icon,
    tooltip: Icon,
    error: Icon,
    spinner: Icon
}) {
    Chevron = chevron;
    Tooltip = tooltip;
    Error = error;
    Spinner = spinner;
}