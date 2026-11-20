import { useAbortEffect } from "@enymo/react-abortable";
import clsx from "clsx";
import { useRef, useState, type ReactNode } from "react";

const edgePadding = 8;

export default function Tooltip({
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
    const [translateX, setTranslateX] = useState(0);

    useAbortEffect(signal => {
        const handleResize = () => {
            if (ref.current !== null) {
                const {left, right} = ref.current.getBoundingClientRect();
                console.log(left);
                if (left - edgePadding < 0) {
                    setTranslateX(-left + edgePadding);
                }
                else if (window.innerWidth - right - edgePadding < 0) {
                    setTranslateX(window.innerWidth - right - edgePadding);
                }
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize, {signal});
    }, [setTranslateX, ref]);

    return (
        <div className={clsx("relative", className)}>
            <div ref={ref} className="whitespace-nowrap absolute left-1/2 -translate-x-1/2 rounded-sm body-xs text-text-900 text-center p-1.5 shadow-dropdown bg-bg-100" style={{
                bottom: `calc(100% + ${padding + 8}px)`,
                transform: `translateX(${translateX}px)`
            }}>
                {tooltip}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white size-4 translate-y-2" style={{
                bottom: `calc(100% + ${padding}px)`
            }} />
            {children}
        </div>
    )
}