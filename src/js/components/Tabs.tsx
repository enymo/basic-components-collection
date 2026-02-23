import clsx from "clsx"
import type { ReactNode } from "react"

export default function Tabs<T extends string>({
    value,
    onChange,
    tabs
}: {
    value: T,
    onChange: (value: T) => void,
    tabs: {
        label: ReactNode,
        value: T
    }[]
}) {
    return (
        <nav className="flex flex-row gap-1.5 border-b border-b-neutral-200">
            {tabs.map((tab) => (
                <button onClick={() => onChange(tab.value)} className={clsx("box-border border-b-2 border-transparent px-2 pt-2.5 pb-2 body-m-md translate-y-px",
                    {
                        "text-text-500 translate-y-px hover:text-text-700": tab.value !== value,
                        "border-b-2 border-b-primary-500 text-primary-500 translate-y-px": tab.value === value
                    }
                )}>{tab.label}</button>
            ))}
        </nav >
    )
}