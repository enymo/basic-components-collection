import "../css/storybook.css";
import configureDefaultIcons from "./defaultIcons";

configureDefaultIcons();

export const sleep = (duration: number) => new Promise<void>(resolve => setTimeout(resolve, duration));