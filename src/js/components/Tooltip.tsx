import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";

const edgePadding = 8;

export function Tooltip({
    className,
    padding = 0,
    tooltip,
    children
}: {
    className?: string,
    padding?: number,
    tooltip: ReactNode,
    children: ReactNode
}) {
    const ref = useRef<HTMLDivElement>(null);
    const timeout = useRef<NodeJS.Timeout>(undefined);
    const [translateX, setTranslateX] = useState(0);
    const [bottom, setBottom] = useState(false);
    const style = `calc(100% + ${padding + 8}px)`;

    const handlePointerEnter = () => {
        clearTimeout(timeout.current);
        if (ref.current !== null && bottom === false && translateX === 0) {
            const {top: boxTop, left, right} = ref.current.getBoundingClientRect();
            if (left - edgePadding < 0) {
                setTranslateX(-left + edgePadding);
            }
            else if (window.innerWidth - right - edgePadding < 0) {
                setTranslateX(window.innerWidth - right - edgePadding);
            }
            else {
                setTranslateX(0);
            }

            setBottom(boxTop - edgePadding < 0);
        }
    }

    const handlePointerLeave = () => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setBottom(false);
            setTranslateX(0);
        }, 200);
    }

    useEffect(() => () => clearTimeout(timeout.current), [timeout]);

    return (
        <div className={clsx("relative group", className)} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
            <div className="w-40 flex justify-center absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{
                [bottom ? 'top' : 'bottom']: style
            }}>
                <div ref={ref} className="shrink rounded-sm body-xs text-text-900 text-center p-1.5 shadow-dropdown bg-bg-100" style={{
                    transform: `translateX(${translateX}px)`
                }}>
                    {tooltip}
                </div>
            </div>
            <div className={clsx(
                "absolute left-1/2 -translate-x-1/2 border-8 border-transparent size-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none",
                bottom ? "border-b-white -translate-y-2" : "border-t-white translate-y-2"
            )} style={{
                [bottom ? 'top' : 'bottom']: `calc(100% + ${padding}px)`
            }} />
            {children}
        </div>
    )
}