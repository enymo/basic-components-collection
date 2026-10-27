import useOnClickOutside from "@enymo/react-click-outside-hook";
import { useDisabled } from "@enymo/react-form-component";
import useHybridInput from "@enymo/react-hybrid-input-hook";
import clsx from "clsx";
import { useCallback, useEffect, useId, useRef, useState, type ChangeEventHandler } from "react";
import { type RegisterOptions } from "react-hook-form";
import { useBc } from "../context/BasicComponentsContext";
import { Chevron, MagnifyingGlass } from "../icons";
import type { InputFrameProps } from "./InputFrame";
import { InputFrame } from "./InputFrame";

export interface Choice<T extends string | number> {
    value: T,
    label: string
}

export interface AutocompleteInputProps<T extends string | number> extends Omit<InputFrameProps, 'children' | 'id'> {
    name?: string,
    options?: RegisterOptions,
    value?: Choice<T> | null,
    debounceDelay?: number,
    onChange?: (value: Choice<T> | null) => void,
    onSearch: (value: string, signal: AbortSignal) => Promise<Choice<T>[]> | Choice<T>[],
    placeholder?: string,
    searchPlaceholder?: string,
    searchLabel?: string,
    searchingLabel?: string,
    noResultsLabel?: string
    disabled?: boolean
}

export function AutoCompleteInput<T extends string | number>({
    name,
    options,
    value: externalValue,
    onChange: externalOnChange,
    error: externalError,
    onSearch,
    placeholder,
    searchPlaceholder,
    searchLabel,
    searchingLabel,
    noResultsLabel,
    disabled: disabledProp,
    debounceDelay = 300,
    ...props
}: AutocompleteInputProps<T>) {
    const id = useId();
    const t = useBc();
    const {value, onChange, error} = useHybridInput({name, externalValue, externalOnChange, externalError, options, defaultValue: null});
    const disabledContext = useDisabled();
    const disabled = disabledProp ?? disabledContext ?? false;
    
    const [open, setOpen] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout>(undefined);
    const searchAbortController = useRef<AbortController>(undefined);
    const [searchValue, setSearchValue] = useState("");
    const [searching, setSearching] = useState(false);
    const [choices, setChoices] = useState<Choice<T>[]>([]);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClose = useCallback(() => {
        setOpen(false);
        searchAbortController.current?.abort();
        clearTimeout(searchTimeout.current);
        setSearching(false);
        setChoices([]);
        setSearchValue("");
    }, [setOpen, searchAbortController, searchTimeout, setSearching, setChoices, setSearchValue]);

    const ref = useOnClickOutside<HTMLDivElement>(handleClose, [handleClose]);

    const handleChangeSearchValue = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
        setSearchValue(e.target.value);
        
        searchAbortController.current?.abort();
        clearTimeout(searchTimeout.current);

        if (e.target.value === "") {
            setChoices([]);
            setSearching(false);
        }
        else {
            const abortController = new AbortController;
            searchAbortController.current = abortController;
            
            setSearching(true);
            searchTimeout.current = setTimeout(async () => {
                try {
                    const results = await onSearch(e.target.value, abortController.signal);
                    if (!abortController.signal.aborted) setChoices(results);
                }
                catch {
                    if (!abortController.signal.aborted) setChoices([]);
                }
                finally {
                    if (!abortController.signal.aborted) setSearching(false);
                }
            }, debounceDelay);
        }
    }, [searchAbortController, searchTimeout, setSearchValue, setSearching, debounceDelay]);

    const handleSelectChoice = (value: Choice<T>) => () => {
        onChange(value);
        handleClose();
    }

    useEffect(() => () => {
        searchAbortController.current?.abort();
        clearTimeout(searchTimeout.current);
    }, [searchAbortController, searchTimeout]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open, inputRef]);

    return (
        <InputFrame id={id} error={error} {...props}>
            <div ref={ref} className="flex relative">
                <input
                    ref={inputRef}
                    disabled={disabled}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    placeholder={searchPlaceholder ?? t('autoCompleteInput.searchPlaceholder')}
                    className={clsx(
                        open ? "flex" : "hidden",
                        "flex-1 h-(--input-height) px-(--input-padding-horizontal) rounded-(--input-radius) border-(length:--input-border-width) outline-none body-m",
                        "text-text-900 placeholder:text-text-100",
                        error === undefined ? "border-primary-400" : "border-danger-500"
                    )}
                />
                <div className={clsx(
                    open ? "flex" : "hidden",
                    "absolute inset-x-0 top-[calc(100%+var(--spacing)*1)] rounded-md shadow-dropdown flex-col bg-bg-100 z-10",
                    searching || choices.length === 0 ? "py-6 items-center gap-4" : "py-2.5"
                )}>
                    {searching || choices.length === 0 ? <>
                        <MagnifyingGlass className="fill-neutral-400 size-10" />
                        <p className="text-center body-s text-text-500">{
                            searching ? (
                                searchingLabel ?? t('autoCompleteInput.searching')
                            ) : searchValue === "" ? (
                                searchLabel ?? t('autoCompleteInput.search')
                            ) : (
                                noResultsLabel ?? t('autoCompleteInput.noResults')
                            )
                        }</p>
                    </> : choices.map(choice => (
                        <button key={choice.value} type="button" onClick={handleSelectChoice(choice)} className={clsx(
                            "h-11 px-3 flex items-center body-m",
                            choice.value === value?.value ? "bg-primary-100 text-primary-500" : "bg-bg-100 text-text-900 hover:bg-bg-500 focus:bg-bg-500 outline-none"
                        )}>{choice.label}</button>
                    ))}
                </div>
                <button type="button" disabled={disabled} onClick={() => setOpen(true)} className={clsx(
                    open ? "hidden" : "flex",
                    "flex-1 justify-between items-center h-(--input-height) px-(--input-padding-horizontal) rounded-(--input-radius) border-(length:--input-border-width) body-m outline-none",
                    "disabled:bg-bg-400",
                    value !== null ? "text-text-900 disabled:text-text-500" : "text-text-100",
                    error === undefined ? "hover:border-neutral-400 border-neutral-300 disabled:border-neutral-300 focus:border-primary-400" : "border-danger-500"
                )}>
                    {value?.label ?? placeholder ?? t('autoCompleteInput.placeholder')}
                    <Chevron className="size-4 fill-neutral-700" />
                </button>
            </div>
        </InputFrame>
    )
}