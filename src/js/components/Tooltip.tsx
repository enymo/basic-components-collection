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
    const [bottom, setBottom] = useState(false);
    const style = `calc(100% + ${padding + 8}px)`;

    const handlePointerEnter = () => {
        if (ref.current !== null) {
            const {bottom, top} = ref.current.style;
            ref.current.style.top = "";
            ref.current.style.bottom = style;
            const {top: boxTop, left, right} = ref.current.getBoundingClientRect();
            console.log(left, right, window.innerWidth - right - edgePadding);
            ref.current.style.top = top;
            ref.current.style.bottom = bottom;
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

    return (
        <div className={clsx("relative", className)} onPointerEnter={handlePointerEnter}>
            <div className="w-40 flex justify-center absolute left-1/2 -translate-x-1/2" style={{
                [bottom ? 'top' : 'bottom']: style
            }}>
                <div ref={ref} className="rounded-sm body-xs text-text-900 text-center p-1.5 shadow-dropdown bg-bg-100" style={{
                    transform: `translateX(${translateX}px)`
                }}>
                    {tooltip}
                </div>
            </div>
            <div className={clsx(
                "absolute left-1/2 -translate-x-1/2 border-8 border-transparent size-4",
                bottom ? "border-b-white -translate-y-2" : "border-t-white translate-y-2"
            )} style={{
                [bottom ? 'top' : 'bottom']: `calc(100% + ${padding}px)`
            }} />
            {children}
        </div>
    )
}