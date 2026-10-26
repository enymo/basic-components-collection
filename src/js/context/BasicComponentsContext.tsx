import { createContext, useContext } from "react";

export type TFunction = (key: string, params?: {[key: string]: string}) => string;
const Context = createContext<TFunction>(key => key);

export const useBc = () => useContext(Context);
export const BasicComponentsProvider = Context.Provider;