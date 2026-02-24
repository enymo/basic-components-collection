import CheckIcon from "../svg/check-solid-full.svg?react";
import ChevronDown from "../svg/chevron-down-solid-full.svg?react";
import CircleExclamationIcon from "../svg/circle-exclamation-solid-full.svg?react";
import CircleNotchIcon from "../svg/circle-notch-solid-full.svg?react";
import CircleQuestionIcon from "../svg/circle-question-regular-full.svg?react";
import { configureIcons } from "./icons";

export default function configureDefaultIcons() {
    configureIcons({
        chevron: ChevronDown,
        tooltip: CircleQuestionIcon,
        error: CircleExclamationIcon,
        spinner: CircleNotchIcon,
        check: CheckIcon
    })
}